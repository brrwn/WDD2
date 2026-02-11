import Login from "./pages/Login.jsx";
import Inventory from "./pages/Inventory.jsx";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Inventory></Inventory>
    </AuthProvider>
  );
}

export default App;
