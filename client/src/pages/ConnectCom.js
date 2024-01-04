import { FormControl, FormLabel, Input, FormHelperText, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate  } from 'react-router-dom';


export default function ConnectCom() {
    const navigate  = useNavigate ();

  const [input, setInput] = useState('');

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have user_id available (you may get it from your authentication system)

    const user_id = localStorage.getItem('user_id');

    // Validate if the input is not empty
    if (!input.trim()) {
      // Handle error, display a message, etc.
      return;
    }

    const community_id = input.trim();

    try {
      const response = await fetch('http://localhost:5000/usersCommunities/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, community_id }),
      });

      if (response.ok) {
        // Handle success, maybe show a success message to the user
        console.log('Successfully connected to the community');
        navigate(`/Comp/${community_id}`);

      } else {
        // Handle error, maybe show an error message to the user
        console.error('Failed to connect to the community');
      }
    } catch (error) {
      console.error('Error connecting to the server:', error);
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <FormControl w={'xl'} m={'auto'} p={24} isRequired>
      <form onSubmit={handleSubmit}>
        <FormLabel>Community Code</FormLabel>
        <Input type="text" value={input} onChange={handleInputChange} />
        <FormHelperText>Copy the community code you received here.</FormHelperText>
        <Button colorScheme='blue' mt={12} type='submit'>Connect</Button>
      </form>
    </FormControl>
  );
}
