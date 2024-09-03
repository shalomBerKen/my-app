import {
    Container,
    Card,
    CardHeader,
    CardBody,
  } from '@chakra-ui/react';
  import TaskListPartner from './TaskListPartner';
  import React, { useState, useEffect } from 'react';
  import ErrorPage from '../../pages/404';
  import { fetchParticipantTasks } from '../../api';
  import { useParams } from 'react-router';
  
  export function TasksPartner(params) {
  
      const userId = localStorage.getItem('user_id');
    const { id } = useParams();
    const communityId = id;
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const tasksData = await fetchParticipantTasks(userId, communityId);
          setData(tasksData);
          setError();
          // console.log(tasksData);
        } catch (error) {
          setError(error.message);
  
          // Handle error, e.g., show an error message to the user
          console.error('Error fetching participant tasks:', error.message);
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
          <Card mb={24}>
            <CardHeader></CardHeader>
            <CardBody>
              <TaskListPartner
                data={data}
              />
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
  