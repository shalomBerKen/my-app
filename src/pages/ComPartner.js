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
    ButtonGroup, 
    Button
  } from '@chakra-ui/react';
  
  export default function ComPartner(props) {
    return (
      <>
        <Container maxW="container.md">
          <Card>
            <CardHeader>
              <Heading size="md">Client Report</Heading>
            </CardHeader>
  
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {data.map((task, index) => {
                  return (
                    <Box
                      p={'auto'}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Heading size="xs" textTransform="uppercase">
                        {task.heder}
                      </Heading>
                      <Text fontSize="sm">{task.text}</Text>
                      <Checkbox
                        colorScheme="green"
                        defaultChecked={task.done}
                        isDisabled={task.disabled}
                      >
                        I want it
                      </Checkbox>
                    </Box>
                  );
                })}
                <ButtonGroup variant="outline" spacing="6"ml={6}>
                  <Button colorScheme="blue">Save</Button>
                  <Button>Cancel</Button>
                </ButtonGroup>
              </Stack>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
  
  const data = [
    {
      heder: 'Summary',
      text: 'View a summary of all your clients over the last month.',
      done: true,
      disabled: false,
    },
    {
      heder: 'Overview',
      text: 'Check out the overview of your clients.',
      done: true,
      disabled: true,
    },
    {
      heder: 'Analysis',
      text: 'See a detailed analysis of all your business clients.',
      done: false,
      disabled: false,
    },
  ];
  