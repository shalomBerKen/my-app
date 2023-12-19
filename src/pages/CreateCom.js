import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  FormHelperText,
  Input,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function CreateCom(props) {
    const [input, setInput] = useState({name: '', description: ''})

    const handleInputChange = (e) => setInput(e.target.value)
  return (
    <>
    <Heading textAlign={'center'}>Create a new community</Heading>
    <form>
    <FormControl w={'xl'} m={'auto'} p={24} isRequired>
      <FormLabel>Name</FormLabel>
      <Input type="text" value={input.name} onChange={handleInputChange} />
      <FormHelperText>
        It is recommended to choose a short and catchy name.
      </FormHelperText>
      <br/>
      <FormLabel>Description</FormLabel>
      <Input type="text"  value={input.description} onChange={handleInputChange} />
      <FormHelperText>
        Describe the nature of your community and the goals you promote.
      </FormHelperText>
    <Button colorScheme='blue' mt={12} type='submit' onSubmit={(e)=>{e.preventDefault() }}>create</Button>
    </FormControl>
    </form>
    </>
  );
}
