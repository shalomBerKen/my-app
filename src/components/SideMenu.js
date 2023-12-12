import {
  Accordion,
  AccordionPanel,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  Box,
  Wrap,
} from '@chakra-ui/react';
import { Button, ButtonGroup, Stack } from '@chakra-ui/react';
import {EditIcon, CheckIcon} from'@chakra-ui/icons'
import { Link } from 'react-router-dom';

export default function SideMenu() {
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

                <Button colorScheme="teal" variant="ghost">
                  Friends in the neighborhood
                </Button>
                <br />
                <Button colorScheme="teal" variant="ghost">
                {'Checking tasks'}
                <EditIcon m={2}/>
                </Button>
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
                <Link to={'comid'}>
                <Button colorScheme="teal" variant="ghost">
                The workers from our building
                </Button>
                </Link>
                <br />
                <Button colorScheme="teal" variant="ghost">
                {'My tasks'}
                <CheckIcon m={2}/>
                </Button>
              </Wrap>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
