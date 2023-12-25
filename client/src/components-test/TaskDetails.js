import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Container,Card ,Menu, MenuButton, Button ,MenuList,MenuOptionGroup,MenuItem, Checkbox} from '@chakra-ui/react';
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
          {taskData.length > 0 ? (
              taskData.map((user, userIndex) => (<>
                
                  <Heading display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user.user_name} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {user.user_name}
                    <Checkbox ml={3}
                    key={userIndex}
                    placement="left"
                    value={user.user_name}
                    defaultChecked={user.received_approv === '1'}
                    isDisabled={user.is_done}
                    ></Checkbox>
                    {/* </MenuItemOption> */}
                  </Heading>
                  </>
                ))
            ) : (
              <Heading>There are still no Approved volunteers</Heading>
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
          {taskData.length > 0 ? (
              taskData.map((user, userIndex) => (<>
                
                  <Heading display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user.user_name} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {user.user_name}
                    <Checkbox ml={3}
                    key={userIndex}
                    placement="left"
                    value={user.user_name}
                    defaultChecked={user.received_approv === '1'}
                    isDisabled={user.is_done}
                    ></Checkbox>
                    {/* </MenuItemOption> */}
                  </Heading>
                  </>
                ))
            ) : (
              <Heading>There are still no Approved volunteers</Heading>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} colorScheme="blue" width={40} m={6}>
        Waiting List
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup title="volunteers" type="checkbox">
            {taskData.length > 0 ? (
              taskData.map((user, userIndex) => (
                  <MenuOptionGroup display={'flex'} justifyContent={'space-between'} key={userIndex} defaultValue={user.user_name} type='checkbox'>
                    {/* <MenuItemOption> */}
                    {user.user_name}
                    <Checkbox ml={3}
                    key={userIndex}
                    placement="left"
                    value={user.user_name}
                    defaultChecked={user.received_approv !== '1'}
                    isDisabled={user.is_done}
                    >{user.user_name}</Checkbox>
                    {/* </MenuItemOption> */}
                  </MenuOptionGroup>
                ))
            ) : (
              <MenuItem>There are still no one waiting</MenuItem>
            )}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      </Card>
    </Box>
    
    </Container>
  );
};

export default TaskDetails;
