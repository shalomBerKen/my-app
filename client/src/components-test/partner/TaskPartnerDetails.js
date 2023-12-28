// TaskDetailsComponent.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const TaskPartnerDetails = ({ task }) => {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        {task.task_name}
      </Heading>
      <Text fontSize="sm">{task.task_details}</Text>
      {/* Add any additional details you want to display for a specific task */}
    </Box>
  );
};

export default TaskPartnerDetails;
