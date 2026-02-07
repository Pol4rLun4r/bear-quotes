// redux
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

// tabs
import CreateQuote from '../createQuote/CreateQuote';
import { Title } from '@mantine/core';

// styles
import classes from './MainContainer.module.css';

const MainContainer = () => {
    const tabState = useSelector((state: RootState) => state.tab.activeTab);

    return (
        <main className={classes.main}>
            <Title>
                MainContainer
            </Title>
            {tabState === 0 && <CreateQuote />}
        </main>
    )
}

export default MainContainer