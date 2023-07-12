import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

/*
Routes:
  - "" redirects to Home
  - "/" redirects to Home
  - "/login" redirects to Home if logged in, otherwise Login displayed
  - "/home" redirects to Login if logged out, otherwise Home displayed
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React App Main Header!</h1>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
