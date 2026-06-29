import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './App.css';

import Header from "./components/Header.jsx";

import TousCombos from "./pages/TousCombos/index.jsx";
import Lobby from "./pages/Lobby/index.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
              <Router basename="/probas-the-gang">
                      <Header />

	<Routes>


	<Route path="/tousCombos" element={<TousCombos />}/>
                        <Route path="/" element={<Lobby />} />

	</Routes>
            </Router>

  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
