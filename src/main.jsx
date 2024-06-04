import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './auth/pages/Login.jsx'

import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}>
                    <Route index element={<Login />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);


