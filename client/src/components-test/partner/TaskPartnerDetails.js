import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Container,
  Card,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Icon,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import axiosInstance from '../../axiosInstance';
import MapContainer from '../map/GoogleMap';

const TaskPartnerDetails = () => {
  const userId = localStorage.getItem('user_id');
  const { id, taskId } = useParams();
  const communityId = id;
  const [taskData, setTaskData] = useState(null);
  const [error, setError] = useState(false);
  const [taskAddress, setTaskAddress] = useState(null);

  // Define all color values at the start of the component
  const heroBg = useColorModeValue('blue.500', 'blue.600');
  const accordionBg = useColorModeValue('gray.100', 'gray.700');
  const accordionHoverBg = useColorModeValue('gray.200', 'gray.600');
  const volunteerBoxBg = useColorModeValue('gray.50', 'gray.700');
  const approvedAlertBg = useColorModeValue('green.50', 'green.900');
  const waitingAlertBg = useColorModeValue('yellow.50', 'yellow.900');
  const approvedTitleColor = useColorModeValue('green.800', 'green.100');
  const approvedDescColor = useColorModeValue('green.700', 'green.200');
  const waitingTitleColor = useColorModeValue('yellow.800', 'yellow.100');
  const waitingDescColor = useColorModeValue('yellow.700', 'yellow.200');
  
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
      setError(true);
      console.error('Error fetching data:', error || e);
    }
  }, [userId, communityId, taskId]);

  useEffect(() => {
    fetchData();
  }, [userId, communityId, taskId]);

  const isUserMember = (usersArray, userId) => {
    const userFound = usersArray.find(user => user.user_id == userId);
    return userFound;
  };

  const handleVolunteerClick = async () => {
    try {
      let response;
      if (isUserMember(taskData, userId)) {
        response = await axiosInstance.delete(`/taskUsers/${taskId}/${userId}`);
      } else {
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

  const renderVolunteerStatus = () => {
    if (!isUserMember(taskData, userId)) return null;
    
    const currentUser = taskData.find(user => user.user_id == userId);
    
    if (currentUser?.received_approv === 1) {
      return (
        <Alert
          status="success"
          variant="subtle"
          bg={approvedAlertBg}
          borderRadius="md"
          mb={4}
        >
          <AlertIcon as={CheckCircleIcon} boxSize="6" />
          <Box>
            <AlertTitle fontSize="lg" mb={1} color={approvedTitleColor}>You're Approved!</AlertTitle>
            <AlertDescription color={approvedDescColor}>
              Your volunteer request has been approved by the community manager. You're all set to participate in this task!
            </AlertDescription>
          </Box>
        </Alert>
      );
    }
    
    if (currentUser?.received_approv === 0) {
      return (
        <Alert
          status="warning"
          variant="subtle"
          bg={waitingAlertBg}
          borderRadius="md"
          mb={4}
        >
          <AlertIcon as={TimeIcon} boxSize="6" />
          <Box>
            <AlertTitle fontSize="lg" mb={1} color={waitingTitleColor}>Request Pending</AlertTitle>
            <AlertDescription color={waitingDescColor}>
              Your volunteer request has been sent and is awaiting approval. The community manager will review it soon.
            </AlertDescription>
          </Box>
        </Alert>
      );
    }
    
    return null;
  };

  if (!taskData) {
    return <div>Loading...</div>;
  }

  const approvedVolunteers = taskData[0] ? taskData.filter((user) => user.received_approv === 1) : [];
  const waitingListVolunteers = taskData[0] ? taskData.filter((user) => user?.received_approv === 0) : [];
  const isVolunteered = isUserMember(taskData, userId);

  return (
    <Container maxW="container.xl" py={6}>
      <Grid templateColumns={{ base: '1fr', md: '3fr 2fr' }} gap={6}>
        {/* Left Column - Task Details and Volunteers */}
        <GridItem>
          {/* Hero Section with Task Details */}
          <Box
            bg={heroBg}
            color="white"
            borderRadius="xl"
            p={8}
            mb={6}
            position="relative"
            overflow="hidden"
          >
            {/* Decorative Circle */}
            <Box
              position="absolute"
              top="-20%"
              right="-10%"
              width="300px"
              height="300px"
              bg="whiteAlpha.100"
              borderRadius="full"
            />
            
            <Stack spacing={4}>
              <Heading size="xl">{taskData[0].task_name}</Heading>
              <Text fontSize="lg">
                {new Date(taskData[0].task_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              
              {/* Volunteer Button */}
              <Button
                size="lg"
                bg={isVolunteered ? "green.500" : "white"}
                color={isVolunteered ? "white" : "blue.500"}
                onClick={handleVolunteerClick}
                isDisabled={taskData[0]?.is_done}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  bg: isVolunteered ? "green.600" : "gray.100"
                }}
                transition="all 0.2s"
                mb={4}
              >
                {isVolunteered ? '✓ Volunteered' : 'I Want to Volunteer!'}
              </Button>

              {/* Status Alert */}
              {renderVolunteerStatus()}
            </Stack>
          </Box>

          {/* Task Details Card */}
          <Card mb={6} p={6}>
            <Stack spacing={4}>
              <Text fontSize="lg">{taskData[0].task_details}</Text>
              {taskAddress && (
                <Flex align="center" color="gray.600">
                  <Icon as={LocationIcon} mr={2} />
                  <Text>{taskAddress}</Text>
                </Flex>
              )}
            </Stack>
          </Card>

          {/* Volunteers Accordion */}
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={accordionBg}
                  _hover={{ bg: accordionHoverBg }}
                >
                  <Box flex='1' textAlign='left'>
                    Approved Volunteers
                    <Badge ml={2} colorScheme="green">
                      {approvedVolunteers.length}
                    </Badge>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {approvedVolunteers.length > 0 ? (
                  approvedVolunteers.map((user) => (
                    <Box
                      key={user.user_name}
                      p={3}
                      mb={2}
                      bg={volunteerBoxBg}
                      borderRadius="md"
                    >
                      <Text fontWeight="medium">{user.user_name}</Text>
                    </Box>
                  ))
                ) : (
                  <Text color="gray.500">No approved volunteers yet</Text>
                )}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={accordionBg}
                  _hover={{ bg: accordionHoverBg }}
                >
                  <Box flex='1' textAlign='left'>
                    Waiting List
                    <Badge ml={2} colorScheme="purple">
                      {waitingListVolunteers.length}
                    </Badge>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {waitingListVolunteers.length > 0 ? (
                  waitingListVolunteers.map((user) => (
                    <Box
                      key={user.user_name}
                      p={3}
                      mb={2}
                      bg={volunteerBoxBg}
                      borderRadius="md"
                    >
                      <Text fontWeight="medium">{user.user_name}</Text>
                    </Box>
                  ))
                ) : (
                  <Text color="gray.500">No volunteers in waiting list</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>

        {/* Right Column - Map */}
        <GridItem position="sticky" top={6}>
          {taskAddress && (
            <Box
              // height="calc(100vh - 2rem)"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="base"
            >
              <MapContainer address={taskAddress} />
            </Box>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
};

// Simple Location Icon component
const LocationIcon = (props) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default TaskPartnerDetails;