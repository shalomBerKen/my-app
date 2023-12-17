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
  Checkbox,
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
import { ChevronDownIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useParams } from 'react-router';
import ErrorPage from './404';
export default function ComManage(props) {
  const { id } = useParams();

  const comName = props?.userData[id]?.comName;
  const tasks = props?.userData[id]?.tasks;

  const [data, setData] = useState(tasks);
  if (!props.userData[id]) {
    return <ErrorPage />;
  }
  return (
    <>
      <Container maxW="container.md">
        <Heading size="md" textAlign={'center'} pb={12}>
          {comName}
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
                            {task.waiting[0] ? (
                              task.waiting.map(user => {
                                return (
                                  <MenuItemOption
                                    placement="left"
                                    value={user.name}
                                    isDisabled={task.disabled}
                                  >
                                    {user.name}
                                  </MenuItemOption>
                                );
                              })
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
                          {task.heder}
                        </Heading>
                        <Text fontSize="sm">{task.text}</Text>
                      </Box>
                      <Button
                        colorScheme={task.disabled ? 'red' : 'teal'}
                        variant="outline"
                        w={6}
                        // colorScheme='red'
                        onClick={() => {
                          tasks[index].disabled = !tasks[index].disabled;
                          setData(tasks.map(task => ({ ...task })));
                        }}
                      >
                        {task.disabled ? <LockIcon /> : <UnlockIcon />}
                      </Button>
                    </Box>
                  </>
                );
              })}
              <ButtonGroup variant="outline" spacing="6" ml={6}>
                <Button colorScheme="blue">Save</Button>
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
