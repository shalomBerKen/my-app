import React from 'react';
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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" position={'sticky'} float={'right'}>
        <Grid p={3}>
          <Container maxW="container.xl"/>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
      </Box>
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/login" element={<LogIn/>} />
          <Route  element={<Home/>}>
            <Route path="home" element={<Overview/>} />
            <Route path="new" element={<CreateCom  />} />
            <Route path="connect" element={<ConnectCom />} />
            
            <Route path="comp/:id" element={<ComPartner />}>
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
    </ChakraProvider>
  );
}

export default App;
