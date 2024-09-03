import {
    Card,
    CardHeader,
    Heading,
    Container,
  } from '@chakra-ui/react';
  import {useState, useEffect} from 'react'
  import {useParams,Outlet} from 'react-router'
// import ErrorPage from './404';
import {fetchParticipantTasks} from "../api"

  export default function ComPartner(props) {
    
    const { id } = useParams();

    const userId = localStorage.getItem('user_id');

    const communityId = id;
    const [data, setData] = useState([]);
    
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
  

  