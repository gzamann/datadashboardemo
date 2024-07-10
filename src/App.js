import './App.css';
import Dashboard from './pages/Dashboard';
import server from './config/server';

server();

function App() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
