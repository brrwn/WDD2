import Login from "./pages/Login.jsx";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Login></Login>
    </AuthProvider>
  );
}

export default App;
