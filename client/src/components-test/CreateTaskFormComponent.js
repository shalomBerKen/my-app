// CreateTaskFormComponent.js
import React from 'react';
import { FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';

const CreateTaskFormComponent = () => {
  return (
    <form>
      <FormControl w={'xl'} m={'auto'} p={24} isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" />
        <FormHelperText>
          It is recommended to choose a short and catchy name.
        </FormHelperText>
        <br />
        <FormLabel>Description</FormLabel>
        <Input type="text" />
        <FormHelperText>
          Describe the nature of your task and the goals you promote.
        </FormHelperText>
        <Button
          colorScheme="blue"
          mt={12}
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          create
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateTaskFormComponent;
