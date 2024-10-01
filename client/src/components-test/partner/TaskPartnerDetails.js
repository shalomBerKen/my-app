import React, { useState, useEffect ,useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Container,Card , Checkbox} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import axiosInstance from '../../axiosInstance';
import MapContainer from '../map/GoogleMap';

const TaskPartnerDetails = () => {
  const userId = localStorage.getItem('user_id');
  const { id, taskId } = useParams();
  const communityId = id
  const [taskData, setTaskData] = useState(null);
  const [error, setError] = useState(false);
  const [taskAddress, setTaskAddress] = useState(null);

  
  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/tasks/participant-one-task/${userId}/${communityId}/${taskId}`);
      const data = response.data;
      setTaskData(data);
      console.log(data);
      setError(false);

      const address = data[0]?.location;
      if (address != null) {
        setTaskAddress(address); 
      }
    } catch (e) {
      setError(true)
      console.error('Error fetching data:', error || e);
    }
  }, [userId, communityId, taskId]);
  
  useEffect(() => {
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
        response = await axiosInstance.delete(`/taskUsers/${taskId}/${userId}`);
      } else {
        // If the checkbox is unchecked, create the relationship
        response = await axiosInstance.post(`/taskUsers/${taskId}/${userId}`);
      }

      if (response.status === 200) {
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
          <Text ml={6} fontSize="sm">{taskData[0].task_date.substring(0, 10)}</Text>
          <Text m={6}>{taskData[0].task_details}</Text>
      
      {/* העברת הכתובת לקומפוננטת המפה */}
      {taskAddress && <MapContainer address={taskAddress} />}
      {taskAddress && <Text m={'auto'} mb={6}>{taskAddress}</Text>}
      <br/>
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
              approvedVolunteers.map((user, userIndex) => (<div key={user.user_name}>
                
                  <Heading size={'m'} key={userIndex} display={'flex'} justifyContent={'space-between'} defaultValue={user.user_name} type='checkbox'>
                    {user.user_name}
                  </Heading>
                  </div>
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
              waitingListVolunteers.map((user, userIndex) => (<div key={user.user_name}>
                
                  <Heading size={'m'} key={userIndex} display={'flex'} justifyContent={'space-between'} defaultValue={user.user_name} type='checkbox'>
                    {user.user_name}
                  </Heading>
                  </div>
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
          isDisabled={taskData?.[0]?.is_done}
        >
          <b>I want it</b>
        </Checkbox>
    </Box>
  {console.log()}
    </Container>
  );
};

export default TaskPartnerDetails;
