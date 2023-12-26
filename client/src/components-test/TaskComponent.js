// TaskComponent.js
import React from 'react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  Button,
  Heading,
  Text,
  Checkbox
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import {Link, useNavigate} from "react-router-dom"

const TaskComponent = ({ task, index, handleTaskToggle }) => {
  const navigat = useNavigate();
  return (
    <Box
      key={index}
      p={'auto'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      {/* <Menu closeOnSelect={false}> */}
        <Button colorScheme="blue" onClick={()=>navigat(`${task.task_id}`)}>
          details
        </Button>
        {/* <MenuList minWidth="240px">
          <MenuOptionGroup title="volunteers" type="checkbox">
            {task.related_users.length > 0 ? (
              task.related_users
                .split(',')
                .map((user, userIndex) => (
                  <MenuOptionGroup display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {/* {user}
                    <Checkbox ml={3}
                    key={userIndex}
                    placement="left"
                    value={user}
                    defaultChecked={task.received_approv.split(',')[userIndex] !== '1'}
                    isDisabled={task.is_done}
                    >{user}</Checkbox> */}
                    {/* </MenuItemOption> */}
                  {/* </MenuOptionGroup>
                ))
            ) : (
              <MenuItem>There are still no one waiting</MenuItem>
            )}
          </MenuOptionGroup> */}
        {/* </MenuList> */}
      {/* </Menu> */}
      <Box textAlign={'center'}>
        <Heading size="xs" textTransform="uppercase">
          {task.task_name}
        </Heading>
        <Text fontSize="sm">{task.task_details}</Text>

        <Text fontSize="sm">{task.task_date.substring(0, 10)}</Text>

      
      </Box>
      <Button
        colorScheme={task.is_done ? 'red' : 'teal'}
        variant="outline"
        w={6}
        onClick={() => handleTaskToggle(index)}
      >
        {task.is_done ? <LockIcon /> : <UnlockIcon />}
      </Button>
    </Box>
  );
};

export default TaskComponent;
