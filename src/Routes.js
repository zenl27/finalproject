import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GoodsContextProvider from './components/Context/GoodsContext';
import AuthContextProvider from './components/Context/AuthContext';
import Nav from './components/Header/Nav';
import Body from './components/Body/Body';
import Adding from './components/CRUD/Adding'

import Editing from './components/CRUD/Editing';
import Persmiss from './components/CRUD/Permiss'
import Cart from './components/Card/Cart';
import Login from './components/Authorization/Login';
import Register from './components/Authorization/Register'
import AuthContext from './components/Context/AuthContext';
import CreditPay from './components/CreditPay/CreditPay'
import GoodsInfo from './components/Goods/GoodsInfo'
import SecondList from './components/SecondList/SecondList';


const Routes = () => {
    return (
        <AuthContextProvider>
            <GoodsContextProvider>
                <BrowserRouter>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Body} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/list" component={SecondList} />
                        <Route exact path="/admin" component={Persmiss} />
                        <Route exact path="/edit/:id" component={Editing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/registration" component={Register} />
                        <Route exact path='/credit' component={CreditPay} />
                        <Route exact path='/info/:id' component={GoodsInfo} />
                    </Switch>
                </BrowserRouter>
            </GoodsContextProvider>
        </AuthContextProvider>
    );
};

export default Routes;