import axiosInstance from './axiosInstance';

export const fetchUserMnagCom = async (userId) => {
    try {
      const response = await axiosInstance.get(`/usersCommunities/${userId}/manager-communities`);
  
      const userData = response.data;
      return userData;
    } catch (error) {
      console.error('Error fetching manager communities data:', error.message);
      throw error;
    }
  };
  
  export const fetchUserPartCom = async (userId) => {
    try {
      const response = await axiosInstance.get(`/usersCommunities/${userId}/participant-communities`);
  
  
      const userData = response.data;
      return userData;
    } catch (error) {
      console.error('Error fetching participant communities data:', error.message);
      throw error;
    }
  };
  

  export const fetchAdminTasks = async (userId, communityId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/admin/${userId}/${communityId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const tasksData = await response.json();
      return tasksData;
    } catch (error) {
      console.error('Error fetching admin tasks data:', error.message);
      throw error;
    }
  };
  
  export const fetchParticipantTasks = async (userId, communityId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/participant/${userId}/${communityId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const tasksData = await response.json();
      return tasksData;
    } catch (error) {
      console.error('Error fetching participant tasks data:', error.message);
      throw error;
    }
  };