import {
  Accordion,
  AccordionPanel,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  Box,
  Wrap,
} from '@chakra-ui/react';
import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { fetchUserMnagCom, fetchUserPartCom } from '../api';


export default function SideMenu(props) {
  // const { partner, manag } = props.userData.communities;

  const [userMnagCom, setUserMnagCom] = useState();
  const [userPartCom, setUserPartCom] = useState();
  // const { userId, setUserId } = useUser();
  const userId = 1; // Replace with the actual user ID you want to fetch

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserMnagCom(userId);
        setUserMnagCom(userData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserPartCom(userId);
        setUserPartCom(userData);
      } catch (error) {
        // Handle the error, if needed
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Communities I created
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack direction="row" spacing={4} align="left">
              <Wrap>
                {userMnagCom?.map((com, index) => {
                  return (
                    <Link to={`coma/${com.community_id}`} key={index}>
                      <Button colorScheme="teal" variant="ghost">
                        {com.community_name}
                      </Button>
                    </Link>
                  );
                })}
                <br />

              </Wrap>
            </Stack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Communities I volunteer
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack direction="row" spacing={4} align="left">
              <Wrap>
                {userPartCom?.map((com, index) => {
                  return (
                    <Link to={`comp/${com.community_id}`} key={index}>
                      <Button colorScheme="teal" variant="ghost">
                        {com.community_name}
                      </Button>
                    </Link>
                  );
                })}
              </Wrap>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
