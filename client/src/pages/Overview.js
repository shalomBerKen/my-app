import {SimpleGrid,Card,CardHeader,Heading, CardBody, Text, CardFooter, Button, Box} from '@chakra-ui/react';
import { Link,Outlet } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { fetchUserMnagCom, fetchUserPartCom } from '../api';
import {UserContext} from '../App'

export default function Overview(props){

  const [userMnagCom, setUserMnagCom] = useState();
  const [userPartCom, setUserPartCom] = useState();
  const userId = 1; // Replace with the actual user ID you want to fetch

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserMnagCom(userId);
        setUserMnagCom(userData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserPartCom(userId);
        setUserPartCom(userData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchUserData();
  }, [userId]);

  const userName = props.userData.userName
  const {partner} = props.userData.communities;
  const { manag} = props.userData.communities;

  const user = useContext(UserContext);

    return(
        <>
        <Outlet />
        <Heading textAlign={'center'}>
            {userName}
            {/* {user} */}
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
          <Link to={`/coma/${com.community_id}`}>
            <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>})

      ) : (
        <p>Loading user data...</p>
      )}

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
          <Link to={`/comp/${com.community_id}`}>
            <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>})

      ) : (
        <p>Loading user data...</p>
      )}

      </SimpleGrid>
      <Box alignItems={'center'}w={'xl'} m={'auto'} mt={13} >
        <Link to={'/connect'}>
      <Button colorScheme='blue' variant='outline' m={'auto'} ml={0}>connect</Button>
      </Link>
      </Box>
        </>
    )
}