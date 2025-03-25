import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import {useEffect} from "react";
import dayjs from "dayjs";
import locale_es from "dayjs/locale/es";

function App() {

    useEffect(() => {
        dayjs.locale(locale_es);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
