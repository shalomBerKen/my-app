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
  Flex,
  Heading
} from '@chakra-ui/react';

import MapContainer from '../map/GoogleMap';

const CreateTaskFormComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    community_id: id,
    task_name: '',
    task_details: '',
    task_date: '',
    is_done: false,
    address: '',
  });
  const [searchAddress, setSearchAddress] = useState('');

  const handleChange = (e) => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleAddressChange = (newAddress) => {
    setFormData({
      ...formData,
      address: newAddress,
    });
  };

  const handleSearchAddress = () => {
    setSearchAddress(formData.address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentDate = new Date();
      const formattedDateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate()
        .toString()
        .padStart(2, '0')} ${currentDate.getHours()
        .toString()
        .padStart(2, '0')}:${currentDate.getMinutes()
        .toString()
        .padStart(2, '0')}:${currentDate.getSeconds()
        .toString()
        .padStart(2, '0')}`;

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
    <Flex direction={{ base: 'column', md: 'row' }} w="full" p={6} alignItems="flex-start">
    <Box flex="1" p={4}>
      <Heading>Create New Task</Heading>
        <br />
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Task Name</FormLabel>
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
                <br />

            <Button colorScheme='teal' onClick={handleSearchAddress} mb={4}>
              See location on the map
            </Button>
            <br />
            <Button type="submit"  mt={12} colorScheme="blue">
              Create
            </Button>
            </FormControl>
          </form>
        </Box>
        <Box flex="1" p={4} maxWidth="600px">
          <MapContainer address={searchAddress} onAddressChange={handleAddressChange} />
        </Box>
      </Flex>
  );
};

export default CreateTaskFormComponent;