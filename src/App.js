import './App.css';
import Dashboard from './pages/Dashboard';

import server from './server'

server()

function App() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
