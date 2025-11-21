import { RoutesMain } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <RoutesMain />
    </div>
  );
}

export default App;
