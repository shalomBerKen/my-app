import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Container,
} from '@chakra-ui/react';
// import { Tablet } from './components/Tablet';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import { Routes, Route } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { Communities } from './pages/communities';
import { Home } from './pages/home';
import LogIn from './pages/login';
import ComPartner from './pages/ComPartner';
import ComManage from './pages/ComManage';
import Overview from './pages/Overview';
import CreateCom from './pages/CreateCom';
import ConnectCom from './pages/ConnectCom';


let userData1 = {
  userId: 2,
  userName: 'Moshe',
  password: '1234',
  communities: {
    manag: [
      {
        comId: 1,
        comName: 'Friends in the neighborhood',
        description : 'View a summary of all your customers over the last month.',
        tasks: [
          {
            heder: 'Summary',
            text: 'View a summary of all your clients over the last month.',
            done: true,
            disabled: false,
            waiting: [
              { name: 'Moshe', confirmed: true },
              { name: 'David', confirmed: true },
              { name: 'Baruch', confirmed: true },
              { name: 'Shlomo', confirmed: true },
            ],
          },
          {
            heder: 'Overview',
            text: 'Check out the overview of your clients.',
            done: true,
            disabled: true,
            waiting: [
              { name: 'Moshe', confirmed: true },
              { name: 'David', confirmed: true },
              { name: 'Baruch', confirmed: true },
              { name: 'Shlomo', confirmed: true },
            ],
          },
          {
            heder: 'Analysis',
            text: 'See a detailed analysis of all your business clients.',
            done: false,
            disabled: false,
            waiting: [],
          },
        ],
      },
    ],
    partner: [
      {
        comId: 2,
        comName: 'The workers from our building',
        description : 'View a summary of all your customers over the last month.',
        tasks: [
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
        ],
      },
    ],
  },
};

function App() {
  const [userData , setUserData] = useState({...userData1});
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LogIn userData={userData} />} />
        <Route element={<Home userData={userData} />}>
          {/* <Route path="/"  element={<Overview userData={userData.communities}/>}/> */}
          <Route path="home" element={<Overview userData={userData}/>} />
          <Route path="new" element={<CreateCom userData={userData} setUserData={setUserData}/>} />
          <Route path="connect" element={<ConnectCom userData={userData} setUserData={setUserData}/>} />
          {/* <Route path="join" element={<Communities />} /> */}
          <Route path="comp/:id" element={<ComPartner userData={userData.communities.partner}/>} />
          <Route path="coma/:id" element={<ComManage userData={userData.communities.manag}/>} />
          {/* <Route path="manage" element={<TaskList />} /> */}
        </Route>
      </Routes>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Container maxW="container.xl">{/* <Tablet /> */}</Container>
          {/* <Home/> */}
          {/* <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack> */}
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
