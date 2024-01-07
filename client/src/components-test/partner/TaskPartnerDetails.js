import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Container,Card , Checkbox} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import TaskCheckbox from './TaskCheckbox';
import axios from 'axios';
// import ErrorPage from "../pages/404"

const TaskPartnerDetails = (props) => {
  const userId = localStorage.getItem('user_id');
  

  const { id, taskId } = useParams();
  const communityId = id
  const [taskData, setTaskData] = useState(null);
  const [error, setError] = useState(false);


  
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/participant-one-task/${userId}/${communityId}/${taskId}`);
      const data = await response.json();
      setTaskData(data);
      setError(false)
    } catch (error) {
      setError(true)
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    // Fetch data from the server and update the state

    fetchData(); 
  }, [userId, communityId, taskId ]);

  const isUserMember = (usersArray, userId) => {
    const userFound = usersArray.find(user => user.user_id == userId);
    return userFound ;
  };


  const handleCheckboxChange = async () => {
    try {
      let response;

      if (isUserMember(taskData, userId)) {
        // If the checkbox is checked, delete the relationship
        response = await axios.delete(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
      } else {
        // If the checkbox is unchecked, create the relationship
        response = await axios.post(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
      }

      if (response.status === 200) {
        // Check the status code to ensure a successful response
        // Refetch data after updating
        fetchData();
      } else {
        console.error('Error updating task user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task user:', error.message);
    }
  };

  if (!taskData) {
    return <div>Loading...</div>;
  }
  const approvedVolunteers = taskData[0] ? taskData.filter((user) => user.received_approv === 1) : [];
  const waitingListVolunteers = taskData[0] ? taskData.filter((user) => user?.received_approv === 0) : [];

  return (
    <Container maxW="container.md">
    <Box
      p={'auto'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Card display={'flex'}>
      <Heading size="lg" m={6}>{taskData[0].task_name}</Heading>
      <Text m={6}>{taskData[0].task_details}</Text>
      {/* Add other details as needed */}
      <Accordion defaultIndex={[1]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
              Approved volunteers
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          {approvedVolunteers.length > 0 ? (
              approvedVolunteers.map((user, userIndex) => (<>
                
                  <Heading size={'m'} key={userIndex} display={'flex'} justifyContent={'space-between'} defaultValue={user.user_name} type='checkbox'>
                    {user.user_name}
                  </Heading>
                  </>
                ))
            ) : (
              <Heading size={'s'}color={'gray'}>There are still no Approved volunteers</Heading>
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
              Waiting List
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          {waitingListVolunteers.length > 0 ? (
              waitingListVolunteers.map((user, userIndex) => (<>
                
                  <Heading size={'m'} key={userIndex} display={'flex'} justifyContent={'space-between'} defaultValue={user.user_name} type='checkbox'>
                    {user.user_name}
                  </Heading>
                  </>
                ))
            ) : (
              <Heading size={'s'} color={'gray'}>There is no waiting list yet</Heading>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      </Card>
      <Checkbox
          margin={12}
          onChange={handleCheckboxChange}
          colorScheme="green"
          defaultChecked={isUserMember(taskData, userId)}
          isDisabled={isUserMember(taskData, userId)?.is_done}
        >
          <b>I want it</b>
        </Checkbox>
    </Box>
  {console.log()}
    </Container>
  );
};

export default TaskPartnerDetails;
