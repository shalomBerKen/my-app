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
} from '@chakra-ui/react';
import { ChevronDownIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { useState } from 'react';
const tasks = [
  {
    heder: 'Summary',
    text: 'View a summary of all your clients over the last month.',
    done: true,
    disabled: false,
    waiting: [
      { name: 'Moshe', confirmed: true },
      { name: 'David', confirmed: true },
      { name: 'Baruch', confirmed: true },
      { name: 'Shlomo', confirmed: true },
    ],
  },
  {
    heder: 'Overview',
    text: 'Check out the overview of your clients.',
    done: true,
    disabled: true,
    waiting: [
      { name: 'Moshe', confirmed: true },
      { name: 'David', confirmed: true },
      { name: 'Baruch', confirmed: true },
      { name: 'Shlomo', confirmed: true },
    ],
  },
  {
    heder: 'Analysis',
    text: 'See a detailed analysis of all your business clients.',
    done: false,
    disabled: false,
    waiting: [],
  },
];

export default function ComManage(props) {
  const [data, setData] = useState(tasks.map(task => ({ ...task })));
  return (
    <>
      <Container maxW="container.md">
        <Card>
          <CardHeader>
            <Heading size="md">Client Report</Heading>
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
                          <MenuOptionGroup title="volunteers" type="checkbox"  >
                          {task.waiting[0] ? (
                            task.waiting.map(user => {
                              return (
                                <MenuItemOption placement='left' value={user.name} isDisabled={task.disabled}>
                                  {user.name}
                                </MenuItemOption>
                              );
                            })
                          ) : (
                            <MenuItem>There are still no one waiting</MenuItem>
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
                      colorScheme={task.disabled ? 'red': "teal"}
                      variant="outline"
                      w={6}
                      // colorScheme='red'
                      onClick={() => {
                        tasks[index].disabled = !tasks[index].disabled;
                        setData(tasks.map(task => ({ ...task })));
                      }}
                    >
                      {task.disabled ? <LockIcon /> : <UnlockIcon/>}
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
      </Container>
    </>
  );
}
