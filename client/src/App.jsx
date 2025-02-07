import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import InterviewDetails from "./pages/InterviewDetails";
import Interview from "./pages/Interview";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/interview/:mockId" element={<InterviewDetails/>}/>
        <Route path="/interview/:mockId/live" element={<Interview/>}/>
      </Routes>
    </BrowserRouter>
  );
}
