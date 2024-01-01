// TaskListComponent.js
import React from 'react';
import { StackDivider, Stack,} from '@chakra-ui/react';
import TaskInListPartner from './TaskInListPartner';

const TaskListPartner = ({ data, handleTaskToggle }) => {
  return (
    <Stack divider={<StackDivider />} spacing="4">
      {data?.names?.map((task, index) => (
        <TaskInListPartner
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

export default TaskListPartner;
