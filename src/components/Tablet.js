import { Tab, Tabs, TabPanel, TabPanels, TabList } from '@chakra-ui/react';
// import { Routes, Route, Link } from "react-router-dom";
import {Link } from "react-router-dom";
// import {TaskList} from "./TaskList"
// import { CommunitiesList } from '../sections/CommunitiesList';
export function Tablet(props) {
  return (
    <>
      <Tabs variant="enclosed">
        <TabList>
        <Link to={"/communities"}>
          <Tab>My Communities</Tab>
          </Link>
          <Link to={"/tasks"}>
          <Tab>Search For Tasks</Tab>
            </Link>
          <Tab>My Tasks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>my communities!</p>
            {/* <CommunitiesList/> */}
          </TabPanel>
          <TabPanel>
            <p>Search for tasks!</p>
          </TabPanel>
          <TabPanel>
            <a href='/tasks'>
            <p>my tasks!</p>
            </a>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
