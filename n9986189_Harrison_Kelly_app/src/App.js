import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Header from './components/Header';
import Home from './pages/Home';
import VolcanoList from './pages/VolcanoList';
import Login from './pages/Login';
import Register from './pages/Register';
import VolcDataDisplay from './pages/VolcanoData';




export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volcanolist" element={<VolcanoList/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/volcanodata" element={<VolcDataDisplay/>}/>
        </Routes>
      </div>
    </BrowserRouter>  
  );
}

