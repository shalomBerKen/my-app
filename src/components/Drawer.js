import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Container,
} from '@chakra-ui/react';

import React from 'react';
//   import useDisclosure from '@chakra-ui/react'
import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import SideMenu from './SideMenu';
import { Home } from '../pages/home';
import { Link, Outlet } from 'react-router-dom';

export default function DrawerBar() {
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
            {/* <Input placeholder='Type here...' /> */}
            <SideMenu />
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
