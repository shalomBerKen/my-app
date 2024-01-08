// ParticipateCommunities.jsx
import React, { useState, useEffect } from 'react';
import { SimpleGrid, Card, CardHeader, Heading, CardBody, Text, CardFooter, Button, Link } from '@chakra-ui/react';
import {fetchUserPartCom} from "../../api"
import axios from 'axios';

const ParticipateCommunities = ({ userId }) => {
  const [userPartCom, setUserPartCom] = useState([]);

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        const userPartData = await fetchUserPartCom(userId);
        setUserPartCom(userPartData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchPartData();
  }, [userId]);

  return (
    <>
      <Heading textAlign={'center'} size='md' m={12}>
        The communities I participate in
      </Heading>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))" w={'xl'} m={'auto'}>
        {userPartCom.map((com, index) => (
          <Card key={index}>
            {/* ... (same card structure as before) */}
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ParticipateCommunities;
