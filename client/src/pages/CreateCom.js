import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useNavigate  } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
export default function CreateCom(props) {
  const userId = localStorage.getItem('user_id');

  const navigate  = useNavigate ();

  const [input, setInput] = useState({ name: '', description: '' });

  const handleInputChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axiosInstance.post('/communities', {
        community_name: input.name,
        community_details: input.description,
        user_id: userId,
        is_manager: 1
        // Add other required fields if any
      });
  
      if (response.status >= 200 && response.status < 300) {
        const result = await response.data;
        const communityId = result.community.id;
        
        // Navigate to the new community page
        navigate(`/Coma/${communityId}`);
        // Handle success, e.g., redirect or show a success message
        console.log('Community created successfully!');
      } else {
        // Handle errors
        console.error('Failed to create community');
      }
    } catch (error) {
      console.error('Error creating community:', error);
    }
  };

  return (
    <>
      <Heading textAlign={'center'}>Create a new community</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl w={'xl'} m={'auto'} p={24} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
          <FormHelperText>
            It is recommended to choose a short and catchy name.
          </FormHelperText>
          <br />
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={input.description}
            onChange={handleInputChange}
          />
          <FormHelperText>
            Describe the nature of your community and the goals you promote.
          </FormHelperText>
          <Button colorScheme="blue" mt={12} type="submit">
            create
          </Button>
        </FormControl>
      </form>
    </>
  );
}
