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
    Button
  } from '@chakra-ui/react';
  import {useState, useEffect} from 'react'
  import {useParams} from 'react-router'
import ErrorPage from './404';
import {fetchParticipantTasks} from "../api"
  
  export default function ComPartner(props) {
    
    const { id } = useParams();
    // const comName = props?.userData[id]?.comName;
    // const tasks = props?.userData[id]?.tasks;
    
    // const [data, setData] = useState(tasks);
    const userId = 1; // for just testing

    const communityId = id;
    const [data, setData] = useState([]);
    // const [error, setError] = useState(false);
    const handleTaskToggle = (index) => {
      const updatedTasks = [...data];
      updatedTasks.tasks[index].has_connection = !updatedTasks.tasks[index].has_connection;
      setData(updatedTasks);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const tasksData = await fetchParticipantTasks(userId, communityId);
          setData(tasksData);
          // setError()
          console.log(tasksData);
        } catch (error) {
          // setError(error.message)
          console.error('Error fetching admin tasks:', error.message);
        }
      };
  
      fetchData();
    }, [userId, communityId]);


    // if (error){
    //   return <ErrorPage/>
    // }
    return (
      <>
        <Container maxW="container.md">

          <Card>
            <CardHeader>
            <Heading size="md" textAlign={'center'} pb={12}>
          {data?.community?.community_name}
        </Heading>

        <Heading size="s" textAlign={'center'} pb={12}>
          {data?.community?.community_details}
        </Heading>
            </CardHeader>
  
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {data?.tasks?.[0] ? data.tasks.map((task, index) => {
                  return (
                    <Box
                      p={'auto'}
                      // display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      textAlign={'center'}
                    >
                      <Heading size="xs" textTransform="uppercase">
                        {task.task_name}
                      </Heading>
                      <Text fontSize="sm">{task.task_details}</Text>
                      <Checkbox
                        onChange={() => {
                            data.tasks[index].has_connection = !data.tasks[index].has_connection
                            // setData(data.tasks.map((task)=>({...task})))
                          }}
                        colorScheme="green"
                        defaultChecked={task.is_done  === 1 ? (task.has_connection  === 1 && task.has_approval  === 1) : task.has_connection  === 1}
                        isDisabled={task.is_done === 1}
                      >
                        I want it
                      </Checkbox>
                    </Box>
                  );
                }) : <><Heading size={'s'}color={'gray'}>There are still no tasks in this community</Heading></>}
                {/* <ButtonGroup variant="outline" spacing="6"ml={6}>
                  <Button colorScheme="blue">Save</Button>
                  <Button>Cancel</Button>
                </ButtonGroup> */}
              </Stack>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
  

  