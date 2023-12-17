import { Container } from '@chakra-ui/react';
import { Tablet } from '../components/Tablet';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Communities } from './communities';
import { TaskList } from '../components/TaskList';
import DrawerBar from '../components/Drawer';
export function Home(props) {
  return (
    <>
    <DrawerBar userData={props.userData}/>
    <Outlet/>
      {/* <Container maxW="container.xl">
        <Communities/> */}
        {/* <Tablet />
        <Routes>
          <Route path="/communities" element={<Communities />} />
          <Route path="/join" element={<Communities />} />
          <Route path="/manage" element={<TaskList />} />
          <Route />
        </Routes> */}
      {/* </Container> */}
    </>
  );
}
