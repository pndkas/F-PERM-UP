import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastClassName="bg-[#1A1A1A] border border-gray-800 text-white"
      />
      <AppRouter />
    </>
  );
}

export default App;