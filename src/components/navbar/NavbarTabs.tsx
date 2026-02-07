// mantine
import { Tooltip, UnstyledButton } from '@mantine/core';

// styles
import classes from './Navbar.module.css';

// icons
import {
    IconHeart,
    IconBook,
    IconPencilPlus,
    IconFiles
} from '@tabler/icons-react';

interface TabsProps {
    icon: typeof IconPencilPlus;
    label: string;
    active?: boolean;
    onClick?: () => void;
    ref?: any
}

export const NavbarTab = ({ icon: Icon, label, active, onClick, ref }: TabsProps) => {
    return (
        <Tooltip label={label} position='right' transitionProps={{ duration: 0 }}>
            <UnstyledButton
                className={classes.tab}
                onClick={onClick}
                ref={ref}
                data-active={active || undefined}
                aria-label={label}
            >
                <Icon size={22} stroke={1.5} className={classes.icon} />
            </UnstyledButton>
        </Tooltip>
    )
};

export const tabsData = [
    { icon: IconPencilPlus, label: 'Create quote' },
    { icon: IconFiles, label: 'Budgets' },
    { icon: IconBook, label: 'Scripts' },
    { icon: IconHeart, label: 'Sponsors' },
]