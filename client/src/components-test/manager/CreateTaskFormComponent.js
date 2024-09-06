import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axiosInstance from '../../axiosInstance';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

import MapContainer from './map/GoogleMap';

const CreateTaskFormComponent = () => {


  const navigat = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    community_id: id,
    task_name: '',
    task_details: '',
    task_date: '',
    is_done: false,
    address: null,
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
      // Step 1: Get the Current Date and Time
      const currentDate = new Date();

      // Step 2: Format the Date
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = currentDate.getDate().toString().padStart(2, '0');
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');

      // Step 3: Combine Components
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      // Step 4: Set the State
      console.log(formattedDateTime);
      setFormData({
        ...formData,
        task_date: formattedDateTime,
      });
      // console.log(formData);
      const response = await axiosInstance.post('/tasks/', {
        ...formData,
        task_date: formattedDateTime,
      });
      console.log('Task created successfully:', response.data);
      navigat(`..`);
      // Optionally, reset the form or navigate to another page
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error, e.g., display an error message to the user
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
          />
          <FormHelperText>
            Describe the nature of your task and the goals you promote.
          </FormHelperText>
          <Button colorScheme="blue" mt={12} type="submit">
            create
          </Button>
        </FormControl>
      </form>
      <div style={{ width: '600px', margin: 'auto', marginBottom: '16px' }}>
        <Accordion allowToggle>
          <AccordionItem>
            {/* <h2> */}
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Add a location to your task
                </Box>
                <AccordionIcon />
              </AccordionButton>
            <AccordionPanel pb={4} >
              <MapContainer formData={formData} handleChange={handleChange} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default CreateTaskFormComponent;
