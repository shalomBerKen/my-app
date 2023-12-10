import { Tab, Tabs, TabPanel, TabPanels, TabList } from '@chakra-ui/react';
// import { Routes, Route, Link } from "react-router-dom";
import { Link } from 'react-router-dom';
// import {TaskList} from "./TaskList"
// import { CommunitiesList } from '../sections/CommunitiesList';
export function Tablet(props) {
  return (
    <>
      <Tabs variant="enclosed">
        <TabList>
          <Link to={'/communities'}>
            <Tab>All Communities</Tab>
          </Link>
          <Link to={'/join'}>
            <Tab>Join Community</Tab>
          </Link>
          <Link to={'/manage'}>
            <Tab>Manage Community</Tab>
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>all communities!</p>
            {/* <CommunitiesList/> */}
          </TabPanel>
          <TabPanel>
            <p>join community!</p>
          </TabPanel>
          <TabPanel>
            <p>manage community!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
