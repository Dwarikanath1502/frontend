import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategory from './admin/ManageCategory'
import AddProduct from './admin/AddProduct'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/signin' exact component={Signin} />
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/admin/create/categories' exact component={AddCategory} />
                <AdminRoute path='/admin/categories' exact component={ManageCategory} />
                <AdminRoute path='/admin/create/products' exact component={AddProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
