import { Route, Routes } from 'react-router-dom';
import { protectedRoutes } from './route';

const ProtectedRoutes = () => {
  const ejectRoutes = () => {
    return protectedRoutes.map((route, index) => {
      return <Route key={index} path = {route.route} element = {route.component}/>
    }) 
  }
  
  return (
    <Routes>
      {ejectRoutes()}
    </Routes>
  )
}
export default ProtectedRoutes;