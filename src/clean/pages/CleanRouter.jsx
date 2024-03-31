import { Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui/Components/Navbar";
import { Planes } from "./Planes";
import { Ofertantes } from "./Ofertantes";
import { Slider } from "../../ui/Components/Slider";




export const CleanRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
    
      <Route path="/Planes" element={ <Planes /> } />
      <Route path="/Ofertantes" element={ <Ofertantes /> } />

          
      </Routes>
      <Slider />
    </>

  );
};
