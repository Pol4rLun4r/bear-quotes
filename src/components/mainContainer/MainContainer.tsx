// redux
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

// tabs
import CreateQuote from '../createQuote/CreateBudget';

// styles
import classes from './MainContainer.module.css';

// mantine
import { Title } from '@mantine/core';

const MainContainer = () => {
    const tabState = useSelector((state: RootState) => state.tab.activeTab);

    return (
        <main className={classes.main}>
            {tabState === 0 && <CreateQuote />}
            {tabState !== 0 && <Title >Hello world {tabState}</Title>}
        </main>
    )
}

export default MainContainer