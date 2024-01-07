// TaskCheckbox.js
import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import axios from 'axios';

const TaskCheckbox = ({ taskId, userId, hasConnection , isDone}) => {
    const handleCheckboxChange = async (taskId) => {
        try {
          let response;
      
          if (hasConnection === 1) {
            // If the checkbox is checked, delete the relationship
            response = await axios.delete(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
          } else {
            // If the checkbox is unchecked, create the relationship
            response = await axios.post(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
          }
      
          if (response.status === 200) {
            // Check the status code to ensure a successful response
          } else {
            console.error('Error updating task user:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating task user:', error.message);
        }
      };
  const handleChange = async () => {
    try {
      let response;

      if (hasConnection) {
        response = await axios.delete(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
      } else {
        response = await axios.post(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
      }

      if (response.status === 200) {
        handleCheckboxChange(taskId);
      } else {
        console.error('Error updating task user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task user:', error.message);
    }
  };

  return (
    <Checkbox
      onChange={handleChange}
      colorScheme="green"
      defaultChecked={hasConnection}
      isDisabled={isDone}
    >
      I want it
    </Checkbox>
  );
};

export default TaskCheckbox;
