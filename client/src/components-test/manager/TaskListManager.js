// TaskListComponent.js
import React from 'react';
import { StackDivider, Stack,} from '@chakra-ui/react';
import TaskInListManage from './TaskInListManage';

const TaskListManager = ({ data, handleTaskToggle }) => {
  return (
    <Stack divider={<StackDivider />} spacing="4">
      {data?.names?.map((task, index) => (
        <TaskInListManage
          key={index}
          task={task}
          index={index}
          handleTaskToggle={handleTaskToggle}
        />
      ))}
      {/* <ButtonGroup variant="outline" spacing="6" ml={6}>
        <Button colorScheme="blue">Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup> */}
    </Stack>
  );
};

export default TaskListManager;
