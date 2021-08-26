import React from 'react';
import { useReducer } from 'react';
import { API } from '../Helpers/Constans';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { calcSubPrice, calcTotalPrice } from '../Helpers/CartCalc';

export const GoodsContext = React.createContext()

const INIT_STATE = {
    Goods: [],
    edit: null,
    paginatedPages: 1,
    cart: {},
    cardLenght: 0,
    detail: {}
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_GOODS":
            return {
                ...state, Goods: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 6)
            }
        case "GET_EDIT_GOODS":
            return {
                ...state, edit: action.payload
            }
        case "GET_DETAIL_GOODS":
            return { ...state, detail: action.payload }
        case "CHANGE_CART_COUNT":
            return { ...state, cartLenght: action.payload }
        case "GET_CART":
            return { ...state, cart: action.payload }


        default: return state
    }
}

const GoodsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)


    const getGoods = async (history) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', 6)
        history.push(`${history.location.pathname}?${search.toString()}`)

        let data = await axios(`${API}/goods${window.location.search}`)
        dispatch({
            type: "GET_GOODS",
            payload: data
        })

    }
    console.log(state.Goods);

    const addGoods = async (newGoods) => {
        try {
            let res = await axios.post(`${API}/Goods`, newGoods)
            return res
        }
        catch (err) {
            console.log(err);
            return err
        }
    }

    const editGoods = async (id) => {
        const { data } = await axios.get(`${API}/Goods/${id}`)
        dispatch({
            type: "GET_EDIT_GOODS",
            payload: data
        })
    }

    const saveEditGoods = async (editedGoods) => {
        try {
            let res = await axios.patch(`${API}/Goods/${editedGoods.id}`, editedGoods)
            return res
        } catch (err) {
            console.log(err);
        }
    }

    const deleteGoods = async (id, history) => {
        await axios.delete(`${API}/Goods/${id}`)
        getGoods(history)
    }

    const deleteCart = async (id, history) => {
        await axios.delete(`${API}/cart/${id}`)
        getGoods(history)
    }

    const addGoodsInCart = (Goods) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                Goods: [],
                totalPrice: 0

            }
        }

        let newGoods = {
            item: Goods,
            count: 1,
            subPrice: 0
        }
        let filteredCard = cart?.Goods.filter(elem => elem.item.id === Goods.id)
        if (filteredCard?.length > 0) {
            cart.Goods = cart.Goods.filter(elem => elem.item.id !== Goods.id)
        } else {
            cart.Goods.push(newGoods)
        }
        newGoods.subPrice = calcSubPrice(newGoods)
        cart.totalPrice = calcTotalPrice(cart.Goods)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.Goods.length

        })
    }
    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                Goods: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.Goods.length
        })

    }
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                Goods: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    const changeGoodsCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (count < 1) count = 1
        cart.Goods = cart.Goods.map(elem => {
            if (elem.item.id === id) {
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.Goods)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }
    const checkGoodsInCard = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                Goodss: [],
                totalPrice: 0
            }
        }
        let newCard = cart.Goods.filter(elem => elem.item.id === id)
        return newCard.length > 0 ? true : false
    }

    const getDetail = async (id) => {
        const { data } = await axios.get(`${API}/GOODS/${id}`)
        dispatch({
            type: "GET_DETAIL_GOODS",
            payload: data
        })
    }





    return (
        <GoodsContext.Provider value={{
            Goods: state.Goods,
            edit: state.edit,
            paginatedPages: state.paginatedPages,
            cart: state.cart,
            cartLenght: state.cartLenght,
            detail: state.detail,
            getGoods,
            addGoods,
            editGoods,
            saveEditGoods,
            deleteGoods,
            getCart,
            addGoodsInCart,
            changeGoodsCount,
            // checkGoodsInCart,
            getCartLength,
            deleteCart,
            getDetail,


        }}>
            {children}
        </GoodsContext.Provider>
    )

}

export default GoodsContextProvider