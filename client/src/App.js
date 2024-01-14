import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  // Text,
  // Link,
  // VStack,
  // Code,
  Grid,
  theme,
  Container,
} from '@chakra-ui/react';
// import { Tablet } from './components/Tablet';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import { Routes, Route } from 'react-router-dom';
// import { TaskList } from './components/TaskList';
// import { Communities } from './pages/communities';
import { Home } from './pages/home';
import LogIn from './pages/login';
import ComPartner from './pages/ComPartner.test';
import ComManage from './pages/ComManage';
// import ComManage from './ComManage.test';
import Overview from './pages/Overview';
import CreateCom from './pages/CreateCom';
import ConnectCom from './pages/ConnectCom';
import CreateTaskFormComponent from './components-test/manager/CreateTaskFormComponent';
import { TasksManager } from './components-test/manager/TasksManager';
import { TasksPartner } from './components-test/partner/TasksPartner';
import TaskPartnerDetails from './components-test/partner/TaskPartnerDetails';
import TaskManageDetails from './components-test/manager/TaskManageDetails';
import SignUp from './pages/SignUp';
// import  {UserProvider}  from '';

let userData1 = {
  userId: 2,
  userName: 'Moshe',
  password: '1234',
  communities: {
    manag: [
      {
        comId: 1,
        comName: 'Friends in the neighborhood',
        description: 'View a summary of all your customers over the last month.',
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
        description: 'View a summary of all your customers over the last month.',
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
  // const [user, setUser] = useState("Jesse Hall");
  const [userData, setUserData] = useState({ ...userData1 });
  return (
    <ChakraProvider theme={theme}>
      {/* <UserProvider> */}
      <Box fontSize="xl" position={'sticky'} float={'right'}>
        <Grid p={3}>
          <Container maxW="container.xl">{/* <Tablet /> */}</Container>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
      </Box>
        <Routes>
          <Route path="/" element={<LogIn userData={userData} />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/login" element={<LogIn userData={userData} />} />
          <Route  element={<Home userData={userData} />}>
            {/* <Route path="/"  element={<Overview userData={userData.communities}/>}/> */}
            <Route path="home" element={<Overview userData={userData} />} />
            <Route path="new" element={<CreateCom  />} />
            <Route path="connect" element={<ConnectCom />} />
            
            <Route path="comp/:id" element={<ComPartner />}>
                {/* here I wont to routes, one for all tasks and one for specific task*/}
              <Route path='/comp/:id/' element={<TasksPartner />} />
              <Route path='/comp/:id/:taskId' element={<TaskPartnerDetails />} />
            </Route>
            
            <Route path="coma/:id" element={<ComManage />} >
              <Route path='/coma/:id/' element={<TasksManager />} />
              <Route path='/coma/:id/:taskId' element={<TaskManageDetails />} />
              <Route path='new-task' element={<CreateTaskFormComponent />} />
            </Route>
          
          </Route>
        </Routes>
      {/* </UserProvider> */}
    </ChakraProvider>
  );
}

export default App;
