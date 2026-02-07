// styles
import classes from './Navbar.module.css';

// mantine
import { Avatar, Center } from '@mantine/core';

// components
import NavbarMain from './NavbarMain';
import NavbarOptions from './NavbarOptions';

// icons
import { IconCurrencyDollar } from '@tabler/icons-react';

const Navbar = () => {


    return (
        <nav className={classes.navbar}>
            <Center>
                <Avatar size='md'>
                    <IconCurrencyDollar />
                </Avatar>
            </Center>

            <NavbarMain />
            <NavbarOptions />
        </nav>
    )
}

export default Navbar