import { AppRouter } from "./router/AppRouter"
import './assets/styles/index.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    return (
        <>
            <AppRouter />
            <ToastContainer
                position="top-center"
            />
        </>
    );
}