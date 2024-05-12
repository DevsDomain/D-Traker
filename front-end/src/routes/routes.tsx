import { BrowserRouter } from 'react-router-dom'
import MenuLateral from '../components/menu-lateral/MenuLateral'
import { AppRoutes } from './app.routes'


export function Routes() {
    return (

        <BrowserRouter>
            <AppRoutes />
            <MenuLateral />
        </BrowserRouter>
    )
}