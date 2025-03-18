// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// // import App from './App.tsx'
// import HomePage from './app/page.tsx'
// import Layout from './app/layout.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     {/* <App /> */}
//     <Layout>

//     <HomePage />
//     </Layout>
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage.tsx";
import NewPriceForm from "@/pages/NewPriceForm";
import "./index.css";
import SpecialPricesPage from "./pages/SpecialPricesPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="/new-special-price"
                        element={<NewPriceForm />}
                    />
                    <Route
                        path="/special-prices"
                        element={<SpecialPricesPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
