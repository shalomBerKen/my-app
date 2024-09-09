import React,{useEffect} from 'react';
import { useClipboard , Box, Input,Button, Text} from '@chakra-ui/react'

export default function CopyId({id}) {
    const placeholder = "text to be copied...";
    const { onCopy, value, setValue, hasCopied } = useClipboard("");
    useEffect(()=>{
        setValue(id)
    },[id, setValue])
  
    return (
      <>
        <Box ml={6} mb={12}>
          <Input
            display={'none'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
          />
          <br/>
          <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy community code"}</Button>
            <Text color={'gray'}>Copy the community code and share it with community members.</Text>
        </Box>
      </>
    )
  }