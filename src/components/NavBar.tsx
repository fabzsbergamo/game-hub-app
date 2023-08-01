import { HStack, Image, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Link to="/">
        <Image src={logo} boxSize="60px" objectFit='cover' />
      </Link>
      <SearchInput />
      <Link to='AddGamePage'>
        <Button colorScheme='green'>Add Game</Button>
      </Link>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
