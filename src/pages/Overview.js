import {SimpleGrid,Card,CardHeader,Heading, CardBody, Text, CardFooter, Button, Container, Box} from '@chakra-ui/react';
import { Link,Outlet } from 'react-router-dom';

export default function Overview(props){
  const userName = props.userData.userName
  const {partner, manag} = props.userData.communities;
    return(
        <>
        <Outlet />
        <Heading textAlign={'center'}>
            {userName}
        </Heading>
      <Heading textAlign={'center'}size='md' m={12}>
            The communities I manage
        </Heading>

          <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        w={'xl'}
        m={'auto'}
      >
        {manag.map((com, index)=>{return <Card>
          <CardHeader>
            <Heading size="md">{com.comName}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              {com.description}
            </Text>
          </CardBody>
          <CardFooter>
          <Link to={`/coma/${index}`}>
            <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>})}
      </SimpleGrid>
      <Box alignItems={'center'}w={'xl'} m={'auto'} mt={13} >
        <Link to={'/new'}>
      <Button colorScheme='blue' variant='outline' m={'auto'} ml={0}>create</Button>
      </Link>
      </Box>
        <Heading textAlign={'center'}size='md' m={12}>
            The communities I participate in
        </Heading>
          <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        w={'xl'}
        m={'auto'}
      >
        {partner.map((com, index)=>{return <Card>
          <CardHeader>
            <Heading size="md">{com.comName}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
            {com.description}
            </Text>
          </CardBody>
          <CardFooter>
            <Link to={`/comp/${index}`}>
            <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>})}
      </SimpleGrid>
      <Box alignItems={'center'}w={'xl'} m={'auto'} mt={13} >
        <Link to={'/connect'}>
      <Button colorScheme='blue' variant='outline' m={'auto'} ml={0}>connect</Button>
      </Link>
      </Box>
        </>
    )
}