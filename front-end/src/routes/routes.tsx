import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app.routes'
import MenuLateral from '../pages/menu-lateral/MenuLateral'


export function Routes() {
    return (

        <BrowserRouter> 
        <MenuLateral/>
            <AppRoutes />
        </BrowserRouter>
    )
}