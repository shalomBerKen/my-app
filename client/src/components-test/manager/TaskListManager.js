// TaskListComponent.js
import React from 'react';
import { StackDivider, Stack, Text} from '@chakra-ui/react';
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
      {data?.names?.length === 0 && <Text color={'gray'}>There are currently no tasks in this community yet.</Text>}
    </Stack>
  );
};

export default TaskListManager;
