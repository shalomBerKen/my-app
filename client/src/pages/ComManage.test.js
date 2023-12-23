import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import TaskListComponent from '../components-test/TaskListComponent';
import CreateTaskFormComponent from '../components-test/CreateTaskFormComponent';
import ErrorPage from './404';
import { fetchAdminTasks } from '../api';
import { useParams } from 'react-router';

const ComManage = (props) => {
    const userId = 1; // for just testing
  const { id } = useParams();
  const communityId = id;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const handleTaskToggle = (index) => {
    const updatedTasks = [...data];
    updatedTasks[index].is_done = !updatedTasks[index].is_done;
    setData(updatedTasks);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await fetchAdminTasks(userId, communityId);
        setData(tasksData);
        console.log(tasksData);
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
  // if (!data || data.length === 0) {
  //   // Loading state or display a message when there is no data
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Container maxW="container.md">
        <Heading size="md" textAlign={'center'} pb={12}>
          {/* {comName} */}
        </Heading>

        {/* Task List */}
        <Card>
          <CardHeader>
            <Heading size="md" textAlign={'center'} pb={12}>
              Tasks status
            </Heading>
          </CardHeader>

          <CardBody>
            <TaskListComponent data={data} handleTaskToggle={handleTaskToggle} />
          </CardBody>
        </Card>

        {/* Create Task Form */}
        <Card mt={3}>
          <CardHeader>
            <Heading size="md" textAlign={'center'} pb={12}>
              Create new task
            </Heading>
          </CardHeader>
          <CardBody>
            <CreateTaskFormComponent />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ComManage;
