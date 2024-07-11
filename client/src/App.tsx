
import { AuthProvider } from "./provider/AuthProvider.tsx";
import Routes from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;