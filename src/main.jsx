import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { App } from "./App.jsx";
import './assets/styles/index.scss'
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleMapsProvider } from "./google-maps/GoogleMapsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleMapsProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </GoogleMapsProvider>
        </Provider>
    </React.StrictMode>
);
