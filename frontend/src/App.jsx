import { useState } from "react";
import { Header } from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
