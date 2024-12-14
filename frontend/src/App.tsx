import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}
// cmnt
export default App;
