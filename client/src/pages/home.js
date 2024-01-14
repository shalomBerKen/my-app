// import { Container } from '@chakra-ui/react';
// import { Tablet } from '../components/Tablet';
import { Outlet } from 'react-router-dom';
// import { Communities } from './communities';
// import { TaskList } from '../components/TaskList';
import DrawerBar from '../components/Drawer';
export function Home(props) {
  return (
    <>
    <DrawerBar userData={props.userData}/>
    <Outlet/>
    </>
  );
}
