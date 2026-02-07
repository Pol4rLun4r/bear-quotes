// styles
import classes from './Navbar.module.css'

// mantine
import { Stack, useMantineColorScheme, useComputedColorScheme } from '@mantine/core'

// icons
import { IconSettings2, IconSun, IconMoon } from '@tabler/icons-react'

// components
import { NavbarTab } from './NavbarTabs';

const NavbarOptions = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('dark');

    const colorSchemeHandle = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <Stack gap={0} className={classes.second}>
            <NavbarTab
                icon={computedColorScheme === 'light' ? IconMoon : IconSun}
                label={computedColorScheme === 'light' ? 'Dark mode' : 'Light mode'}
                onClick={colorSchemeHandle}
            />
            <NavbarTab
                icon={IconSettings2}
                label='Settings'
            />
        </Stack>
    )
};

export default NavbarOptions