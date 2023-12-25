import { FormControl , FormLabel, Input, FormHelperText, Button} from "@chakra-ui/react";
import { useState } from "react";

export default function ConnectCom(){
    const [input, setInput] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)
    return(
        <FormControl w={'xl'} m={'auto'} p={24} isRequired>
        <FormLabel>Community Code</FormLabel>
        <Input type="text" value={input} onChange={handleInputChange} />
        <FormHelperText>
        Copy the community code you received here.
        </FormHelperText>
        <Button colorScheme='blue' mt={12} type='submit' onSubmit={(e)=>{e.preventDefault() }}>connect</Button>
        </FormControl>
    )
}