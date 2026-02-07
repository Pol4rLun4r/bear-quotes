// mantine
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core"

// components
import Navbar from './components/navbar/Navbar';
import MainContainer from './components/mainContainer/MainContainer';

const App = () => {
  return (
    <MantineProvider
      defaultColorScheme='dark'
    >
      <div style={{ display: 'flex' }}>
        <Navbar />
        <MainContainer />
      </div>
    </MantineProvider>
  )
}

export default App;