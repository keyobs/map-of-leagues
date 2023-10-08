import './app.css';
import {Route, Routes} from 'react-router-dom';

import './languages/i18nConfig';

import NavBar from '@components/NavBar';
import TheMapPage from '@pages/theMap/TheMap';
import AboutPage from '@pages/about/About';
import LoginPage from '@pages/Login';
import {QueryClientProvider, QueryClient} from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='app'>
                <NavBar />
                <Router />
            </div>
        </QueryClientProvider>
    );
}

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<TheMapPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='login' element={<LoginPage />} />
        </Routes>
    );
};

export default App;
