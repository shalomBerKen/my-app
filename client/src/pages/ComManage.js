import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Heading,
//   Card,
//   CardHeader,
//   CardBody,
// } from '@chakra-ui/react';
// import TaskListComponent from '../components-test/TaskListComponent';
// import CreateTaskFormComponent from '../components-test/CreateTaskFormComponent';
import ErrorPage from './404';
import { fetchAdminTasks } from '../api';
import { useParams ,Outlet } from 'react-router';

const ComManage = (props) => {
  const userId = localStorage.getItem('user_id');
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
        setError()
        // console.log(tasksData);
      } catch (error) {
        setError(error.message)

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
    <Outlet/>
{/*     
      <Container maxW="container.md">
        <Heading size="md" textAlign={'center'} pb={12}>
          {data?.community?.community_name}
        </Heading>

            <Heading size="md" textAlign={'center'} pb={12}>
            {data?.community?.community_details}
            </Heading>
        {/* Task List */}
        {/* <Card>
          <CardHeader>
          </CardHeader>

          <CardBody>
            <TaskListComponent data={data} handleTaskToggle={handleTaskToggle} />
          </CardBody>
        </Card> */}

        {/* Create Task Form */}
        {/* <Card mt={3}>
          <CardHeader>
            <Heading size="md" textAlign={'center'} pb={12}>
              Create new task
            </Heading>
          </CardHeader>
          <CardBody>
            <CreateTaskFormComponent />
          </CardBody>
        </Card> */}
      {/* </Container> */} 
    </>
  );
};

export default ComManage;
