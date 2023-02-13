import './App.css';
import { Route, Routes } from 'react-router-dom';

import NavBar from '@components/NavBar';
import TheMapPage from '@pages/TheMap';
import AboutPage from '@pages/About';
import LoginPage from '@pages/Login';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Router />
        </div>
    );
}

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<TheMapPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
        </Routes>
    );
};

export default App;
