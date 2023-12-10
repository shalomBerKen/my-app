import {Menu, MenuButton, MenuList, Button, MenuItem} from '@chakra-ui/react';
import{ChevronDownIcon} from "@chakra-ui/icons"
export function NewCom(props) {
  return (
    <><Menu >
    {({ isOpen }) => (
      <>
        <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}display="flex" alignItems="left" justifyContent="center" pu={"auto"} m={[2,4]} p={'2'}>
          {isOpen ? 'Close' : 'New communities'}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => alert('Join an existing community')}>Join an existing community</MenuItem>
          <MenuItem onClick={() => alert('Create a new community')}>Create a new community</MenuItem>
        </MenuList>
      </>
    )}
  </Menu></>
  )
}