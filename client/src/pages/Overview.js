import {SimpleGrid,Card,CardHeader,Heading, CardBody, Text, CardFooter, Button, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Container} from '@chakra-ui/react';
import { Link,Outlet } from 'react-router-dom';
import React, { useState, useEffect, } from 'react';
import { fetchUserMnagCom, fetchUserPartCom } from '../api';
// import ManagedCommunities from "../components-test/home-page/ManagedCommunities"
// import ParticipatedCommunities from "../components-test/home-page/ManagedCommunities"
import axios from 'axios';
// import {UserContext} from '../App'
// import  {useUser}  from '..context/UserContext';


export default function Overview(props){
  const [userData, setUserData] = useState();
  const [userMnagCom, setUserMnagCom] = useState();
  const [userPartCom, setUserPartCom] = useState();
  const userId = localStorage.getItem('user_id');
  // const { userId, setUserId } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchMnagData = async () => {
      try {
        const userMnagData = await fetchUserMnagCom(userId);
        setUserMnagCom(userMnagData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchMnagData();
  }, [userId]);

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        const userPartData = await fetchUserPartCom(userId);
        setUserPartCom(userPartData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchPartData();
  }, [userId]);

  const userName = userData?.user_name

    return(
        <>
        <Outlet />
        <Heading size={'md'} textAlign={'center'}>
            {userName}
            {/* {user} */}
        </Heading>

        <Container maxW={'xl'} mt={8}>
        {/* <Heading size={'s'} m={8}>
            My communities
        </Heading> */}
        <Tabs variant='soft-rounded' colorScheme="teal"isFitted>
          <TabList>
            <Tab>manage communities</Tab>
            <Tab>participate communities</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            <Heading textAlign={'center'}size='md' m={12}>
              The communities I manage
            </Heading>
              <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            maxW={'xl'}
            m={'auto'}
            >
              {userMnagCom?.length === 0 && <Text color={'gray'}>You don't have any communities you manage yet.</Text>}
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
          <Box alignItems={'center'}maxW={'xl'} m={'auto'} mt={13} >
            <Link to={'/new'}>
          <Button colorScheme='blue' variant='outline' m={'auto'} ml={0}>create</Button>
          </Link>
          </Box>
            </TabPanel>
            <TabPanel>
              <Heading textAlign={'center'}size='md' m={12}>
                  The communities I participate in
              </Heading>
                    <SimpleGrid
                  spacing={4}
                  templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                  maxW={'xl'}
                  m={'auto'}
                >
                  {userPartCom?.length === 0 && <Text color={'gray'}>You don't have any communities you're participating in yet.</Text>}
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
                <Box alignItems={'center'}maxW={'xl'} m={'auto'} mt={13} >
                  <Link to={'/connect'}>
                <Button colorScheme='blue' variant='outline' m={'auto'} ml={0}>connect</Button>
                </Link>
                </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Container>
        </>
    )
}