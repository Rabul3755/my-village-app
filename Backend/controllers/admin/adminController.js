import Issue  from'../../models/Issue.js';
import Leader from '../../models/Leader.js';
import PoliticalRepresentative from '../../models/PoliticalRepresentative.js';
import Admin  from '../../models/Admin.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalIssues,
      pendingIssues,
      inProgressIssues,
      resolvedIssues,
      totalLeaders,
      totalRepresentatives,
      activeAdmins
    ] = await Promise.all([
      Issue.countDocuments(),
      Issue.countDocuments({ status: 'pending' }),
      Issue.countDocuments({ status: 'in-progress' }),
      Issue.countDocuments({ status: 'resolved' }),
      Leader.countDocuments({ isActive: true }),
      PoliticalRepresentative.countDocuments({ isActive: true }),
      Admin.countDocuments({ isActive: true })
    ]);

    // Recent issues (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentIssues = await Issue.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Issues by category
    const issuesByCategory = await Issue.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Recent leaders added
    const recentLeaders = await Leader.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        // Overview
        totalIssues,
        pendingIssues,
        inProgressIssues,
        resolvedIssues,
        totalLeaders,
        totalRepresentatives,
        activeAdmins,
        
        // Analytics
        recentIssues,
        recentLeaders,
        issuesByCategory,
        resolutionRate: totalIssues > 0 ? (resolvedIssues / totalIssues * 100).toFixed(1) : 0,
        
        // Quick stats for cards
        stats: {
          issues: {
            total: totalIssues,
            pending: pendingIssues,
            inProgress: inProgressIssues,
            resolved: resolvedIssues
          },
          content: {
            leaders: totalLeaders,
            representatives: totalRepresentatives,
            total: totalLeaders + totalRepresentatives
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get recent admin activity
// @route   GET /api/admin/dashboard/recent-activity
// @access  Private (Admin)
const getRecentActivity = async (req, res) => {
  try {
    // Get recent issues
    const recentIssues = await Issue.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status category createdAt reporter');

    // Get recent leaders
    const recentLeaders = await Leader.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name position area createdAt');

    // Get recent representatives
    const recentRepresentatives = await PoliticalRepresentative.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name position constituency createdAt');

    // Combine and sort all activity
    const allActivity = [
      ...recentIssues.map(issue => ({
        type: 'issue',
        action: 'created',
        title: issue.title,
        description: `New ${issue.category} issue reported`,
        timestamp: issue.createdAt,
        data: issue
      })),
      ...recentLeaders.map(leader => ({
        type: 'leader',
        action: 'added',
        title: leader.name,
        description: `New ${leader.position} added`,
        timestamp: leader.createdAt,
        data: leader
      })),
      ...recentRepresentatives.map(rep => ({
        type: 'representative',
        action: 'added',
        title: rep.name,
        description: `New ${rep.position} added`,
        timestamp: rep.createdAt,
        data: rep
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
     .slice(0, 10); // Get top 10 most recent

    res.status(200).json({
      success: true,
      data: allActivity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get system health status
// @route   GET /api/admin/dashboard/system-health
// @access  Private (Admin)
const getSystemHealth = async (req, res) => {
  try {
    const databaseStatus = 'connected'; // You can check actual DB connection status
    const serverUptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const currentTime = new Date();

    // Check if there are any critical issues (pending for more than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const criticalIssues = await Issue.countDocuments({
      status: 'pending',
      createdAt: { $lte: thirtyDaysAgo }
    });

    // Check for inactive leaders/representatives
    const inactiveLeaders = await Leader.countDocuments({ isActive: false });
    const inactiveRepresentatives = await PoliticalRepresentative.countDocuments({ isActive: false });

    res.status(200).json({
      success: true,
      data: {
        database: databaseStatus,
        server: {
          uptime: Math.floor(serverUptime),
          memory: {
            used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
            total: Math.round(memoryUsage.heapTotal / 1024 / 1024)
          },
          timestamp: currentTime.toISOString()
        },
        alerts: {
          criticalIssues,
          inactiveLeaders,
          inactiveRepresentatives,
          hasCriticalAlerts: criticalIssues > 0
        },
        status: criticalIssues > 0 ? 'warning' : 'healthy'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export { getDashboardStats,getRecentActivity,getSystemHealth}