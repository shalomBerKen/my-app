import React from 'react';
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
// import { CommunitiesList } from './sections/CommunitiesList';
import { TaskList } from './components/TaskList';
import { Communities } from './pages/communities';
import { Home } from './pages/home';
import LogIn from './pages/login';
// import ComPage from './pages/ComManage';
import ComPartner from './pages/ComPartner';
import ComManage from './pages/ComManage';
import Overview from './pages/Overview';

let allData = {
  userId: 2,
  userName: 'Moshe Zuchmir',
  password: '1234',
  communities: {
    manag: [
      {
        comName: 'Friends in the neighborhood',
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
        comName: 'Friends in the neighborhood',
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
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="home" element={<Overview />} />
          <Route path="join" element={<Communities />} />
          <Route path="comp" element={<ComPartner missions={allData.communities.partner[0]}/>} />
          <Route path="coma" element={<ComManage missions={allData.communities.manag[0]}/>} />
          <Route path="manage" element={<TaskList />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route />
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
