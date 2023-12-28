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
// import ErrorPage from "../pages/404"

const TaskManageDetails = (props) => {
  const userId = 1; // for just testing
  

  const { id, taskId } = useParams();
  const communityId = id
  const [taskData, setTaskData] = useState(null);
  const [error, setError] = useState(false);


  
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/admin-one-task/${userId}/${communityId}/${taskId}`);
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

  const handleCheckboxChange = async (taskId, userId, receivedApprov) => {
    try {
      const response = await fetch(`http://localhost:5000/taskusers/${taskId}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ received_approv: receivedApprov ? 1 : 0 }),
      });

      if (!response.ok) {
        console.error('Failed to update data on the server');
      }

      // Refetch data after updating
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (!taskData) {
    return <div>Loading...</div>;
  }
  const approvedVolunteers = taskData[0] ? taskData.filter((user) => user.received_approv === 1) : [];
  const waitingListVolunteers = taskData[0] ? taskData.filter((user) => user?.received_approv === 0) : [];


  // Rest of the component rendering logic using taskData
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
      <Accordion allowMultiple>
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
                
                  <Heading size={'m'} display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user.user_name} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {user.user_name}
                    <Checkbox ml={3}
                    key={user.user_id}
                    placement="left"
                    value={true}
                    defaultChecked={true}
                    isDisabled={user.is_done}
                    onChange={() => handleCheckboxChange(user.task_id, user.user_id, !user.received_approv)}
                    ></Checkbox>
                    {/* </MenuItemOption> */}
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
                
                  <Heading size={'m'} display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user.user_name} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {user.user_name}
                    <Checkbox ml={3}
                    key={user.user_id}
                    placement="left"
                    value={false}
                    defaultChecked={false}
                    isDisabled={user.is_done}
                    onChange={() => handleCheckboxChange(user.task_id, user.user_id, !user.received_approv)}
                    ></Checkbox>
                    {/* </MenuItemOption> */}
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
    </Box>
    
    </Container>
  );
};

export default TaskManageDetails;
