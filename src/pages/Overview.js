import {SimpleGrid,Card,CardHeader,Heading, CardBody, Text, CardFooter, Button, Box} from '@chakra-ui/react';
import { Link,Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


export default function Overview(props){

  //// from here

  const [userMnagCom, setUserMnagCom] = useState();
  const [userPartCom, setUserPartCom] = useState();
  const userId = 1; // Replace with the actual user ID you want to fetch

  useEffect(() => {
    const fetchUserMnagCom = async () => {
      try {
        const response = await fetch(`http://localhost:5000/usersCommunities/${userId}/manager-communities`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const userData = await response.json();
        setUserMnagCom(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    

    fetchUserMnagCom();
  }, [userId]);

  useEffect(() => {
    const fetchUserPartCom = async () => {
      try {
        const response = await fetch(`http://localhost:5000/usersCommunities/${userId}/participant-communities`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const userData = await response.json();
        setUserPartCom(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    

    fetchUserPartCom();
  }, [userId]);

  //// to here
  const userName = props.userData.userName
  const {partner} = props.userData.communities;
  const { manag} = props.userData.communities;

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
            
      {userMnagCom ? (
        userMnagCom.map((com, index)=>{return <Card key={index}>
          <CardHeader>
            <Heading size="md">{com.community_name}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              {com.community_details}
            </Text>
          </CardBody>
          <CardFooter>
          <Link to={`/coma/${com.id_community}`}>
            <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>})

      ) : (
        <p>Loading user data...</p>
      )}
    
        {manag.map((com, index)=>{return (
        <Card key={index}>
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
        </Card>)})}
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
              {userPartCom ? (
        userPartCom.map((com, index)=>{return <Card key={index}>
          <CardHeader>
            <Heading size="md">{com.community_name}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              {com.community_details}
            </Text>
          </CardBody>
          <CardFooter>
          <Link to={`/coma/${index}`}>
            <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>})

      ) : (
        <p>Loading user data...</p>
      )}
        {partner.map((com, index)=>{return <Card key={index}>
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