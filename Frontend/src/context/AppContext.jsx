import React, { createContext, useContext, useState, useEffect } from 'react';
import { issueAPI, leaderAPI, politicalRepAPI } from '../services/api';
import { villageInfo as initialVillageInfo } from '../data/mockdata.js';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [politicalRepresentatives, setPoliticalRepresentatives] = useState([]);
  const [village] = useState(initialVillageInfo);
  const [loading, setLoading] = useState({
    issues: false,
    leaders: false,
    politicalReps: false
  });
  const [error, setError] = useState(null);

  const loadIssues = async (filters = {}) => {
    setLoading(prev => ({ ...prev, issues: true }));
    try {
      const response = await issueAPI.getAll(filters);
      setIssues(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to load issues:', error);
      setError('Failed to load issues. Using demo data.');
      setIssues([]);
    } finally {
      setLoading(prev => ({ ...prev, issues: false }));
    }
  };

  // Load leaders from API
  const loadLeaders = async (filters = {}) => {
    setLoading(prev => ({ ...prev, leaders: true }));
    try {
      const response = await leaderAPI.getAll(filters);
      setLeaders(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to load leaders:', error);
      setError('Failed to load leaders. Using demo data.');
      setLeaders([]);
    } finally {
      setLoading(prev => ({ ...prev, leaders: false }));
    }
  };

  // Load political representatives from API
  const loadPoliticalRepresentatives = async (filters = {}) => {
    setLoading(prev => ({ ...prev, politicalReps: true }));
    try {
      const response = await politicalRepAPI.getAll(filters);
      setPoliticalRepresentatives(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to load political representatives:', error);
      setError('Failed to load political representatives. Using demo data.');
      setPoliticalRepresentatives([]);
    } finally {
      setLoading(prev => ({ ...prev, politicalReps: false }));
    }
  };

  // Load all data on initial render
  useEffect(() => {
    loadIssues();
    loadLeaders();
    loadPoliticalRepresentatives();
  }, []);

  // Add new issue
  const addIssue = async (issueData) => {
    console.log(issueData)
    try {
      const response = await issueAPI.create(issueData);
      const newIssue = response.data;
      setIssues(prev => [newIssue, ...prev]);
      return { success: true, data: newIssue };
    } catch (error) {
      console.error('Failed to create issue:', error);
      return { success: false, error: error.message };
    }
  };

  // Update issue status
  const updateIssueStatus = async (issueId, newStatus) => {
    try {
      const response = await issueAPI.updateStatus(issueId, newStatus);
  
      const updatedIssue = response.data;
      setIssues(prev => 
        prev.map(issue => 
          issue._id === issueId ? updatedIssue : issue
        )
      );
      return { success: true, data: updatedIssue };
    } catch (error) {
      console.error('Failed to update issue status:', error);
      return { success: false, error: error.message };
    }
  };

  // Refresh data functions
  const refreshIssues = (filters = {}) => loadIssues(filters);
  const refreshLeaders = (filters = {}) => loadLeaders(filters);
  const refreshPoliticalRepresentatives = (filters = {}) => loadPoliticalRepresentatives(filters);

  const value = {
    // State
    issues,
    leaders,
    politicalRepresentatives,
    village,
    loading,
    error,
    
    // Actions
    addIssue,
    updateIssueStatus,
    refreshIssues,
    refreshLeaders,
    refreshPoliticalRepresentatives
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};