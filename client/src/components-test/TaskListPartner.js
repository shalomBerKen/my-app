// TaskListPartner.js
import React from 'react';
import { Box, Heading, Text, Checkbox } from '@chakra-ui/react';

const TaskListPartner = ({ tasks, handleCheckboxChange }) => {
  return (
    <Box>
      {tasks.map((task, index) => (
        <Box key={index} p={'auto'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
          <Heading size="xs" textTransform="uppercase">
            {task.task_name}
          </Heading>
          <Text fontSize="sm">{task.task_details}</Text>
          <Checkbox
            onChange={() => handleCheckboxChange(task.task_id)}
            colorScheme="green"
            defaultChecked={task.is_done === 1 ? (task.has_connection === 1 && task.has_approval === 1) : task.has_connection === 1}
            isDisabled={task.is_done === 1}
          >
            I want it
          </Checkbox>
        </Box>
      ))}
    </Box>
  );
};

export default TaskListPartner;
