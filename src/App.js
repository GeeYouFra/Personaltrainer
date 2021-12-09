import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Customerlist />
      <Traininglist />
    </div>
  );
}

export default App;
