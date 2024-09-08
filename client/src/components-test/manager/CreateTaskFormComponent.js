import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axiosInstance from '../../axiosInstance';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
} from '@chakra-ui/react';

import MapContainer from './map/GoogleMap';

const CreateTaskFormComponent = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    community_id: id,
    task_name: '',
    task_details: '',
    task_date: '',
    is_done: false,
    address: '',  // הפיכת כתובת לחובה
  });

  const handleChange = e => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const currentDate = new Date();
      const formattedDateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

      const response = await axiosInstance.post('/tasks/', {
        ...formData,
        task_date: formattedDateTime,
      });
      console.log('Task created successfully:', response.data);
      navigate('..');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl w={'xl'} m={'auto'} p={24} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            required
          />
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
            required
          />
          <FormHelperText>
            Describe the nature of your task and the goals you promote.
          </FormHelperText>
          <br />
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <FormHelperText>
            Please provide the task location.
          </FormHelperText>
          <Button colorScheme="blue" mt={12} type="submit">
            Create
          </Button>
        </FormControl>
      </form>

      <Box width="600px" margin="auto" marginBottom="16px">
        <MapContainer formData={formData} />
      </Box>
    </>
  );
};

export default CreateTaskFormComponent;
