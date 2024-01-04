import {
  Container,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Button,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import TaskListManager from './TaskListManager';
import React, { useState, useEffect } from 'react';
import ErrorPage from '../../pages/404';
import { fetchAdminTasks } from '../../api';
import { useParams, useNavigate } from 'react-router';

export function TasksManager(params) {

    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
  const { id } = useParams();
  const communityId = id;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const handleTaskToggle = index => {
    const updatedTasks = [...data];
    updatedTasks[index].is_done = !updatedTasks[index].is_done;
    setData(updatedTasks);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await fetchAdminTasks(userId, communityId);
        setData(tasksData);
        setError();
        // console.log(tasksData);
      } catch (error) {
        setError(error.message);

        // Handle error, e.g., show an error message to the user
        console.error('Error fetching admin tasks:', error.message);
      }
    };

    fetchData();
  }, [userId, communityId]);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Container maxW="container.md">
        <Heading size="md" textAlign={'center'} pb={12}>
          {data?.community?.community_name}
        </Heading>

        <Heading size="md" textAlign={'center'} pb={12}>
          {data?.community?.community_details}
        </Heading>
        {/* Task List */}
        <Card mb={24}>
          <CardHeader></CardHeader>

          <CardBody>
            <TaskListManager
              data={data}
              handleTaskToggle={handleTaskToggle}
            />
          </CardBody>
          <Button
            w={40}
            m={6}
            rightIcon={<AddIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={()=>navigate("new-task")}
          >
            Add New Task
          </Button>
        </Card>

        {/* Create Task Form */}
        {/* <Card mt={3}>
          <CardHeader>
            <Heading size="md" textAlign={'center'} pb={12}>
              Create new task
            </Heading>
          </CardHeader>
        </Card> */}
      </Container>
    </>
  );
}
