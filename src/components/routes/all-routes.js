import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { unprotectedRoutes } from './route'



const getSubRoutes = (subRoutes) => {
  return subRoutes.map((route, index) => {
    return <Route path = {route.route} element = {route.component}/>
  })
}

const ejectRoutes = () => {
  return unprotectedRoutes.map((route, index) => {
    return <Route path = {route.route} element = {route.component}>
            {route.subRoutes !==undefined ? getSubRoutes(route.subRoutes) : null}
          </Route>
  })
}

export default function ROUTES() {
  return (
    <Routes>
        {ejectRoutes()}
    </Routes>
  )
}
