import { Route, Routes } from "react-router-dom"
import { CleanRouter } from "../clean/pages/CleanRouter"
import { LoginPage } from "../auth/pages/LoginPage"
import { PersonaNatural } from "../auth/pages/PersonaNatural"
import { Empresa } from "../auth/pages/Empresa"



export const AppRouter = () => {
  return (
    <>
     
      <Routes>
      
          <Route path="login" element={ <LoginPage /> } />
          <Route path="PersonaNatural" element={ <PersonaNatural /> } />
          <Route path="Empresa" element={ <Empresa /> } />
          <Route path="/*" element={ <CleanRouter /> } />
      </Routes>
    </>
  )
}
