// TaskDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

const TaskDetails = () => {
  const location = useLocation();
  const { task } = location.state || {}; // Provide a default value for task

  if (!task) {
    return <div>Error: Task not found</div>;
  }

  return (
    <Box>
      <Heading size="lg">{task.task_name}</Heading>
      <Text>{task.task_details}</Text>
      {/* Add other details as needed */}
    </Box>
  );
};

export default TaskDetails;
