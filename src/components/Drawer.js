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

export default function DrawerBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
    <Container alignSelf={'end'}>
      <Button boxSize={12} ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <HamburgerIcon boxSize={6} />
      </Button>
      </Container>
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
            <Button colorScheme="teal" variant="ghost" >
              Home
            </Button>
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
