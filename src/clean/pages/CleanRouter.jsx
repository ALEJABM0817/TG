import { Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui/Components/Navbar";
import { Planes } from "./Planes";
import { Ofertantes } from "./Ofertantes";
import { Home } from "./Home";

export const CleanRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={ <Home /> } exac />
      <Route path="/Planes" element={ <Planes /> } />
      <Route path="/Ofertantes" element={ <Ofertantes /> } />
          
      </Routes>
    </>
  );
};
