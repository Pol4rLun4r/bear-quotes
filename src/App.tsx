// mantine
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core"

// components
import Sidebar from './components/sidebar/Sidebar';
import MainContainer from './components/mainContainer/MainContainer';

const App = () => {
  return (
    <MantineProvider
      defaultColorScheme='dark'
    >
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <MainContainer />
      </div>
    </MantineProvider>
  )
}

export default App;