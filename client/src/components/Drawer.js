import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerCloseButton,
} from '@chakra-ui/react';

import React from 'react';
//   import useDisclosure from '@chakra-ui/react'
import { 
  Button,
  // Input, 
  useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import SideMenu from './SideMenu';
// import { Home } from '../pages/home';
import { Link, } from 'react-router-dom';

export default function DrawerBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button boxSize={12} ref={btnRef} colorScheme="teal" onClick={onOpen} m={6}>
        <HamburgerIcon boxSize={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Link to={"/home"}>
            <Button colorScheme="teal" variant="ghost" onClick={onClose}>
              Home
            </Button>
            </Link>
          </DrawerHeader>
          <DrawerBody>

            <SideMenu/>

          </DrawerBody>
          <DrawerFooter>
          <Link to={"/"}>
            <Button colorScheme="teal" variant="ghost" onClick={()=>{onClose() ; localStorage.setItem('user_id', "");}}>
              Log Out
            </Button>
            </Link>
            </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
