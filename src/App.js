import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React App Main Header!</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
