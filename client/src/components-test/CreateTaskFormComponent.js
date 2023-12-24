import React, { useState , } from 'react';
import { useParams } from 'react-router';

import axios from 'axios';
import { FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';

const CreateTaskFormComponent = () => {
  const userId = 1; // for just testing
  const { id } = useParams();
  const [formData, setFormData] = useState({
    community_id: id,
    task_name: '',
    task_details: '',
    task_date: '2023-01-10 00:00:00',
    is_done: false,
  });

  const handleChange = (e) => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/tasks/', formData);
      console.log('Task created successfully:', response.data);
      // Optionally, reset the form or navigate to another page
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl w={'xl'} m={'auto'} p={24} isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="task_name" value={formData.task_name} onChange={handleChange} />
        <FormHelperText>
          It is recommended to choose a short and catchy name.
        </FormHelperText>
        <br />
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="task_details"
          value={formData.task_details}
          onChange={handleChange}
        />
        <FormHelperText>
          Describe the nature of your task and the goals you promote.
        </FormHelperText>
        <Button colorScheme="blue" mt={12} type="submit">
          create
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateTaskFormComponent;
