// TaskComponent.js
import React from 'react';
import {
  Box,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // MenuOptionGroup,
  Button,
  Heading,
  Text,
  // Checkbox
} from '@chakra-ui/react';
// import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { useNavigate} from "react-router-dom"

const TaskComponent = ({ task, index, handleTaskToggle }) => {
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
      <Box 
      // textAlign={'center'}
      >
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

export default TaskComponent;
