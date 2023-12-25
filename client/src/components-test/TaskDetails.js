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

const TaskDetails = (props) => {
  const userId = 1; // for just testing

  const { id, taskId } = useParams();
  const communityId = id
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    // Fetch data from the server and update the state
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/admin-one-task/${userId}/${communityId}/${taskId}`);
        const data = await response.json();
        setTaskData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, communityId, taskId]);
  const approvedVolunteers = taskData ? taskData.filter((user) => user.received_approv === 1) : [];
  const waitingListVolunteers = taskData ? taskData.filter((user) => user.received_approv === 0) : [];

  if (!taskData) {
    return <div>Loading...</div>;
  }

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
                
                  <Heading display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user.user_name} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {user.user_name}
                    <Checkbox ml={3}
                    key={userIndex}
                    placement="left"
                    value={user.user_name}
                    defaultChecked={true}
                    isDisabled={user.is_done}
                    ></Checkbox>
                    {/* </MenuItemOption> */}
                  </Heading>
                  </>
                ))
            ) : (
              <Heading size={'s'}>There are still no Approved volunteers</Heading>
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
                
                  <Heading display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user.user_name} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {user.user_name}
                    <Checkbox ml={3}
                    key={userIndex}
                    placement="left"
                    value={user.user_name}
                    defaultChecked={false}
                    isDisabled={user.is_done}
                    ></Checkbox>
                    {/* </MenuItemOption> */}
                  </Heading>
                  </>
                ))
            ) : (
              <Heading size={'s'}>There is no waiting list yet</Heading>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      </Card>
    </Box>
    
    </Container>
  );
};

export default TaskDetails;
