import Issue from "../../models/Issue.js"
import Leader from "../../models/Leader.js"
import PoliticalRepresentative from "../../models/PoliticalRepresentative.js"

// @desc    Get comprehensive platform analytics
// @route   GET /api/admin/analytics/overview
// @access  Private (Admin)
const getPlatformAnalytics = async (req, res) => {
  try {
    // Basic counts
    const totalIssues = await Issue.countDocuments();
    const totalLeaders = await Leader.countDocuments();
    const totalRepresentatives = await PoliticalRepresentative.countDocuments();

    // Issue statistics
    const issueStats = await Issue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Issues by category
    const issuesByCategory = await Issue.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgVotes: { $avg: '$votes' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Monthly issue trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrends = await Issue.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          resolved: {
            $sum: {
              $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $limit: 6
      }
    ]);

    // Leader statistics
    const leaderStats = await Leader.aggregate([
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ['$isActive', true] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Representative statistics
    const representativeStats = await PoliticalRepresentative.aggregate([
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ['$isActive', true] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Popular locations for issues
    const popularLocations = await Issue.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    // Resolution time analysis (for resolved issues)
    const resolutionStats = await Issue.aggregate([
      {
        $match: {
          status: 'resolved',
          createdAt: { $exists: true },
          updatedAt: { $exists: true }
        }
      },
      {
        $project: {
          resolutionTime: {
            $divide: [
              { $subtract: ['$updatedAt', '$createdAt'] },
              1000 * 60 * 60 * 24 // Convert to days
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgResolutionTime: { $avg: '$resolutionTime' },
          minResolutionTime: { $min: '$resolutionTime' },
          maxResolutionTime: { $max: '$resolutionTime' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalIssues,
          totalLeaders,
          totalRepresentatives,
          totalContent: totalIssues + totalLeaders + totalRepresentatives
        },
        issues: {
          byStatus: issueStats,
          byCategory: issuesByCategory,
          monthlyTrends,
          popularLocations,
          resolutionStats: resolutionStats[0] || {
            avgResolutionTime: 0,
            minResolutionTime: 0,
            maxResolutionTime: 0
          }
        },
        leaders: {
          byPosition: leaderStats
        },
        representatives: {
          byPosition: representativeStats
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

// @desc    Get user engagement analytics
// @route   GET /api/admin/analytics/engagement
// @access  Private (Admin)
const getEngagementAnalytics = async (req, res) => {
  try {
    // Issue voting statistics
    const votingStats = await Issue.aggregate([
      {
        $group: {
          _id: null,
          totalVotes: { $sum: '$votes' },
          avgVotesPerIssue: { $avg: '$votes' },
          maxVotes: { $max: '$votes' },
          issuesWithVotes: {
            $sum: {
              $cond: [{ $gt: ['$votes', 0] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Most popular issues (by votes)
    const popularIssues = await Issue.find()
      .sort({ votes: -1 })
      .limit(10)
      .select('title votes status category createdAt');

    // Issue creation trends by time of day
    const creationByHour = await Issue.aggregate([
      {
        $project: {
          hour: { $hour: '$createdAt' }
        }
      },
      {
        $group: {
          _id: '$hour',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Weekly activity trends
    const weeklyActivity = await Issue.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
        }
      },
      {
        $group: {
          _id: {
            $week: '$createdAt'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Category engagement (votes per category)
    const categoryEngagement = await Issue.aggregate([
      {
        $group: {
          _id: '$category',
          totalVotes: { $sum: '$votes' },
          issueCount: { $sum: 1 },
          avgVotes: { $avg: '$votes' }
        }
      },
      {
        $sort: { totalVotes: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        voting: votingStats[0] || {
          totalVotes: 0,
          avgVotesPerIssue: 0,
          maxVotes: 0,
          issuesWithVotes: 0
        },
        popularIssues,
        creationPatterns: {
          byHour: creationByHour,
          weekly: weeklyActivity
        },
        categoryEngagement
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

// @desc    Export analytics data
// @route   GET /api/admin/analytics/export
// @access  Private (Admin)
const exportAnalyticsData = async (req, res) => {
  try {
    const { type, format = 'json' } = req.query;

    let data;
    let filename;

    switch (type) {
      case 'issues':
        data = await Issue.find().lean();
        filename = `issues-export-${new Date().toISOString().split('T')[0]}`;
        break;
      
      case 'leaders':
        data = await Leader.find().lean();
        filename = `leaders-export-${new Date().toISOString().split('T')[0]}`;
        break;
      
      case 'representatives':
        data = await PoliticalRepresentative.find().lean();
        filename = `representatives-export-${new Date().toISOString().split('T')[0]}`;
        break;
      
      case 'analytics':
        // Get comprehensive analytics data
        const analyticsData = await this.getPlatformAnalyticsData();
        data = analyticsData;
        filename = `analytics-export-${new Date().toISOString().split('T')[0]}`;
        break;
      
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type'
        });
    }

    if (format === 'csv') {
      // For CSV format, you would convert data to CSV
      // This is a simplified version - in production, use a library like json2csv
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}.csv`);
      // Implement CSV conversion here
      return res.send('CSV export would be implemented here');
    } else {
      // JSON format
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}.json`);
      return res.send(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Helper function for analytics data
const getPlatformAnalyticsData = async () => {
  const [
    totalIssues,
    pendingIssues,
    inProgressIssues,
    resolvedIssues,
    totalLeaders,
    totalRepresentatives
  ] = await Promise.all([
    Issue.countDocuments(),
    Issue.countDocuments({ status: 'pending' }),
    Issue.countDocuments({ status: 'in-progress' }),
    Issue.countDocuments({ status: 'resolved' }),
    Leader.countDocuments(),
    PoliticalRepresentative.countDocuments()
  ]);

  return {
    summary: {
      totalIssues,
      pendingIssues,
      inProgressIssues,
      resolvedIssues,
      totalLeaders,
      totalRepresentatives,
      resolutionRate: totalIssues > 0 ? (resolvedIssues / totalIssues * 100).toFixed(1) : 0
    },
    timestamp: new Date().toISOString()
  };
};

export {getEngagementAnalytics,getPlatformAnalytics,getPlatformAnalyticsData,exportAnalyticsData}