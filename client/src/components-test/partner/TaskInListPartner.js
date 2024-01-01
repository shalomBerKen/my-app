// TaskComponent.js
import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,

} from '@chakra-ui/react';

import { useNavigate} from "react-router-dom"

export const TaskInListPartner = ({ task, index, handleTaskToggle }) => {
  const navigat = useNavigate();
  return (
    <Box
      key={index}
      p={'auto'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      size={'xs'}
    >
      <Box>
        <Heading size="xs" textTransform="uppercase">
          {task.task_name}
        </Heading>
        <Text fontSize="sm">{task.task_details}</Text>

        <Text fontSize="sm">{task.task_date.substring(0, 10)}</Text>

      
      </Box>
      <Button colorScheme="blue" onClick={()=>navigat(`${task.task_id}`)}>
        details
      </Button>
    </Box>
  );
};

export default TaskInListPartner;
