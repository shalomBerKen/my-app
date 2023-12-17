import {SimpleGrid,Card,CardHeader,Heading, CardBody, Text, CardFooter, Button} from '@chakra-ui/react';

export default function Overview(props){
  const userName = props.userData.userName
  const {partner, manag} = props.userData.communities;
    return(
        <>
        <Heading textAlign={'center'}>
            {userName}
        </Heading>
        <Heading textAlign={'center'}size='md' m={12}>
            The communities I participate in
        </Heading>
          <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        w={'xl'}
        m={'auto'}
      >
        {partner.map((com)=>{return <Card>
          <CardHeader>
            <Heading size="md">{com.comName}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
            {com.description}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>})}
      </SimpleGrid>
      <Heading textAlign={'center'}size='md' m={12}>
            The communities I manage
        </Heading>
          <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        w={'xl'}
        m={'auto'}
      >
        {manag.map((com)=>{return <Card>
          <CardHeader>
            <Heading size="md">{com.comName}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              {com.description}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>})}
      </SimpleGrid>
        </>
    )
}