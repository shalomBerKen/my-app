// ManageCommunities.jsx
import React, { useState, useEffect } from 'react';
import { SimpleGrid, Card, CardHeader, Heading, CardBody, Text, CardFooter, Button, Link } from '@chakra-ui/react';
import {fetchUserMnagCom} from "../../api"
import axios from 'axios';

const ManageCommunities = ({ userId }) => {
  const [userMnagCom, setUserMnagCom] = useState([]);

  useEffect(() => {
    const fetchMnagData = async () => {
      try {
        const userMnagData = await fetchUserMnagCom(userId);
        setUserMnagCom(userMnagData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchMnagData();
  }, [userId]);

  return (
    <>
      <Heading textAlign={'center'} size='md' m={12}>
        The communities I manage
      </Heading>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))" w={'xl'} m={'auto'}>
        {userMnagCom.map((com, index) => (
          <Card key={index}>
            {/* ... (same card structure as before) */}
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ManageCommunities;
