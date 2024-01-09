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
  } from '@chakra-ui/react';
  import {useState, useEffect} from 'react'
  import {useParams,Outlet} from 'react-router'
// import ErrorPage from './404';
import {fetchParticipantTasks} from "../api"
import axios from 'axios';

  export default function ComPartner(props) {
    
    const { id } = useParams();

    const userId = localStorage.getItem('user_id');

    const communityId = id;
    const [data, setData] = useState([]);

    const handleCheckboxChange = async (taskId) => {
      try {
        let response;
    
        if (data.tasks.find((task) => task.task_id === taskId)?.has_connection === 1) {
          // If the checkbox is checked, delete the relationship
          response = await axios.delete(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
        } else {
          // If the checkbox is unchecked, create the relationship
          response = await axios.post(`http://localhost:5000/taskUsers/${taskId}/${userId}`);
        }
    
        if (response.status === 200) {
          // Check the status code to ensure a successful response
          const updatedTasks = data.tasks.map((task) => {
            if (task.task_id === taskId) {
              task.has_connection = !task.has_connection;
            }
            return task;
          });
    
          setData({ ...data, tasks: updatedTasks });
        } else {
          console.error('Error updating task user:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating task user:', error.message);
      }
    };
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const tasksData = await fetchParticipantTasks(userId, communityId);
          setData(tasksData);
          // setError()
          // console.log(tasksData);
        } catch (error) {
          // setError(error.message)
          console.error('Error fetching admin tasks:', error.message);
        }
      };
  
      fetchData();
    }, [userId, communityId]);


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
          <Outlet/>
          </Card>

        </Container>
      </>
    );
  }
  

  