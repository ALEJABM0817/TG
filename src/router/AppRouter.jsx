import { Route, Routes } from "react-router-dom"
import { CleanRouter } from "../clean/pages/CleanRouter"
import { LoginPage } from "../auth/pages/LoginPage"
import { PersonaNatural } from "../auth/pages/PersonaNatural"
import { Empresa } from "../auth/pages/Empresa"
import { CV} from "../clean/pages/CV"
import { useSelector } from "react-redux"
import { CheckingAuth } from "../ui/"
import { useEffect } from "react"


export const AppRouter = () => {
  
  const { status } = useSelector(state => state.auth)
  
  useEffect(() => {
    
  
    
  }, [])
  

  // if ( status === 'checking') {
  //   return <CheckingAuth />
  // }
  return (
    <>
      <Routes>
          <Route path="login" element={ <LoginPage /> } />
          <Route path="PersonaNatural" element={ <PersonaNatural /> } />
          <Route path="Empresa" element={ <Empresa /> } />
          <Route path="/*" element={ <CleanRouter /> } />
          <Route path="CV" element={ <CV /> } />
          
      </Routes>
    </>
  )
}
