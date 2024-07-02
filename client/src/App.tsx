import "./App.css";
import Login from "./components/login.tsx";
import Register from './components/register.tsx';
function App() {
  const appScreen = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F7F3',
    height: '100vh',
    width: '100vw'
  }
  return (
    <>
      <div style={appScreen}>
        <Login></Login>
      </div>
    </>
  );
}

export default App;
