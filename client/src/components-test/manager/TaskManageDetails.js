import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { Box, Heading, Text, Container, Card, Checkbox, Switch, Stack } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import MapContainer from '../map/GoogleMap';

const TaskManageDetails = (props) => {
  const userId = localStorage.getItem('user_id');
  const { id, taskId } = useParams();
  const communityId = id;
  const [error, setError] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const [isTaskDone, setIsTaskDone] = useState();
  const [taskAddress, setTaskAddress] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/tasks/admin-one-task/${userId}/${communityId}/${taskId}`);
      const data = response.data;
      setTaskData(data);
      setIsTaskDone(data[0]?.is_done === 0);
      setError(false);
      console.log(data[0]);

      const address = data[0]?.location;
      if (address != null) {
        setTaskAddress(address); 
      }
    } catch (e) {
      setError(true);
      console.error('Error fetching data:', error || e);
    }
  }, [userId, communityId, taskId]);

  useEffect(() => {
    fetchData();
  }, [userId, communityId, taskId]);

  const handleCheckboxChange = async (taskId, userId, receivedApprov) => {
    try {
      const response = await axiosInstance.put(`/taskusers/${taskId}/${userId}`, {
        received_approv: receivedApprov ? 1 : 0,
      });

      if (response.status !== 200) {
        console.error('Failed to update data on the server');
      }

      // Refetch data after updating
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleSwitchChange = async (taskName, taskDetails, taskId, isDone) => {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, {
        task_name: taskName,
        task_details: taskDetails,
        is_done: isDone ? 0 : 1,
      });

      if (response.status !== 200) {
        console.error('Failed to update task status on the server');
      } else {
        setIsTaskDone(isDone);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (!taskData) {
    return <div>Loading...</div>;
  }

  const approvedVolunteers = taskData[0] ? taskData.filter((user) => user.received_approv === 1) : [];
  const waitingListVolunteers = taskData[0] ? taskData.filter((user) => user?.received_approv === 0) : [];

  return (
    <Container maxW="container.md">
      <Box p={'auto'} justifyContent={'center'} alignItems={'center'}>
        <Card display={'flex'}>
          <Heading size="lg" m={6}>{taskData[0].task_name}</Heading>
          <Text ml={6} fontSize="sm">{taskData[0].task_date.substring(0, 10)}</Text>
          <Text m={6}>{taskData[0].task_details}</Text>

          {/* העברת הכתובת לקומפוננטת המפה */}
          {taskAddress && <MapContainer address={taskAddress} />}

          <Accordion allowMultiple>
          <AccordionItem >
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
              approvedVolunteers.map((user, userIndex) => (<div key={user.user_id}>
                
                  <Heading size={'m'} display={'flex'} justifyContent={'space-between'} key={user.user_id} defaultValue={user.user_name} type='checkbox'>
                    {user.user_name}
                    <Checkbox ml={3}
                    key={user.user_id}
                    placement="left"
                    value={true}
                    defaultChecked={true}
                    isDisabled={isTaskDone === false}
                    onChange={() => handleCheckboxChange(user.task_id, user.user_id, !user.received_approv)}
                    ></Checkbox>
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
              waitingListVolunteers.map((user, userIndex) => (< div key={user.user_id}>
                
                  <Heading size={'m'} display={'flex'} justifyContent={'space-between'} key={user.user_id} defaultValue={user.user_name} type='checkbox'>
                    {user.user_name}
                    <Checkbox ml={3}
                    key={user.user_id}
                    placement="left"
                    value={false}
                    defaultChecked={false}
                    isDisabled={isTaskDone === 0}
                    onChange={() => handleCheckboxChange(user.task_id, user.user_id, !user.received_approv)}
                    ></Checkbox>
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
      <Stack margin={6}>
      <Text color={'gray'}>When the task is done, please lock it by turning the switch gray.</Text>
      <Switch
          defaultChecked={isTaskDone}
          size='lg'
          onChange={() => handleSwitchChange(taskData[0].task_name,taskData[0].task_details,taskId, !isTaskDone)}
        />

      </Stack>
    </Box>
    
    </Container>
  );
};

export default TaskManageDetails;
