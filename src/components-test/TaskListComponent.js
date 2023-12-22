// TaskListComponent.js
import React from 'react';
import { StackDivider, Stack, ButtonGroup, Button } from '@chakra-ui/react';
import TaskComponent from './TaskComponent';

const TaskListComponent = ({ data, handleTaskToggle }) => {
  return (
    <Stack divider={<StackDivider />} spacing="4">
      {data?.map((task, index) => (
        <TaskComponent
          key={index}
          task={task}
          index={index}
          handleTaskToggle={handleTaskToggle}
        />
      ))}
      <ButtonGroup variant="outline" spacing="6" ml={6}>
        <Button colorScheme="blue">Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default TaskListComponent;
