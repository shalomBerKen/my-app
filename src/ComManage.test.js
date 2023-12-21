import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  StackDivider,
  Stack,
  Box,
  Text,
  Container,
  // Checkbox,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ErrorPage from './pages/404';
// import axios from 'axios';
import {fetchAdminTasks} from "./api"
export default function ComManage(props) {
  const userId = 1; // for just testing
  const { id } = useParams();
  const communityId = id;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await fetchAdminTasks(userId, communityId);
        setData(tasksData);
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error('Error fetching admin tasks:', error.message);
      }
    };

    fetchData();
  }, [userId, communityId]);

  if (error) {
    return <ErrorPage />;
  }
  if (!data || data.length === 0) {
    // Loading state or display a message when there is no data
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container maxW="container.md">
        <Heading size="md" textAlign={'center'} pb={12}>
          {/* {comName} */}
        </Heading>
        <Card>
          <CardHeader>
            <Heading size="md" textAlign={'center'} pb={12}>
              Tasks status
            </Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {data.map((task, index) => {
                return (
                  <>
                    <Box
                      key={index}
                      p={'auto'}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Menu closeOnSelect={false}>
                        <MenuButton as={Button} colorScheme="blue">
                          waiting
                        </MenuButton>
                        <MenuList minWidth="240px">
                          <MenuOptionGroup title="volunteers" type="checkbox">
                            {task.related_users.length > 0 ? (
                              task.related_users
                                .split(',')
                                .map((user, userIndex) => (
                                  <MenuItemOption
                                    key={userIndex}
                                    placement="left"
                                    value={user}
                                    isDisabled={
                                      task.received_approv.split(',')[
                                        userIndex
                                      ] !== '1'
                                    }
                                  >
                                    {user}
                                  </MenuItemOption>
                                ))
                            ) : (
                              <MenuItem>
                                There are still no one waiting
                              </MenuItem>
                            )}
                          </MenuOptionGroup>
                        </MenuList>
                      </Menu>
                      <Box textAlign={'center'}>
                        <Heading size="xs" textTransform="uppercase">
                          {task.task_name}
                        </Heading>
                        <Text fontSize="sm">{task.task_details}</Text>
                      </Box>
                      <Button
                        colorScheme={task.is_done ? 'red' : 'teal'}
                        variant="outline"
                        w={6}
                        // colorScheme='red'
                        onClick={() => {
                          const updatedTasks = [...data];
                          updatedTasks[index].is_done =
                            !updatedTasks[index].is_done;
                          setData(updatedTasks);
                        }}
                      >
                        {task.is_done ? <LockIcon /> : <UnlockIcon />}
                      </Button>
                    </Box>
                  </>
                );
              })}
              <ButtonGroup variant="outline" spacing="6" ml={6}>
                <Button colorScheme="blue"
                //  onClick={() => handleSaveChanges(data)}
                 >
                  Save</Button>
                <Button>Cancel</Button>
              </ButtonGroup>
            </Stack>
          </CardBody>
        </Card>
        <Card mt={3}>
          <CardHeader>
            <Heading size="md" textAlign={'center'} pb={12}>
              Create new task
            </Heading>
          </CardHeader>
          <CardBody>
            <form>
              <FormControl w={'xl'} m={'auto'} p={24} isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" />
                <FormHelperText>
                  It is recommended to choose a short and catchy name.
                </FormHelperText>
                <br />
                <FormLabel>Description</FormLabel>
                <Input type="text" />
                <FormHelperText>
                  Describe the nature of your task and the goals you promote.
                </FormHelperText>
                <Button
                  colorScheme="blue"
                  mt={12}
                  type="submit"
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  create
                </Button>
              </FormControl>
            </form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
