// TaskListComponent.js
import React from 'react';
import { StackDivider, Stack, Text} from '@chakra-ui/react';
import TaskInListPartner from './TaskInListPartner';

const TaskListPartner = ({ data, handleTaskToggle }) => {
  return (
    <Stack divider={<StackDivider />} spacing="4">
      {data?.tasks?.map((task, index) => (
        <TaskInListPartner
          key={index}
          task={task}
          index={index}
          handleTaskToggle={handleTaskToggle}
        />
      ))}
      {data?.tasks?.length === 0 && <Text color={'gray'}>There are currently no tasks in this community yet.</Text>}
    </Stack>
  );
};

export default TaskListPartner;
