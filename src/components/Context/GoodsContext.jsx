import React from 'react';
import { useReducer } from 'react';
import { API } from '../helpers/constants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { calcSubPrice, calcTotalPrice } from '../helpers/CartFuction';


export const GoodsContext = React.createContext()

const INIT_STATE = {
    Goods: [],
    edit: null,
    paginatedPages: 1,
    card: {},
    cardLenght: 0,
    detail: {}
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_GOODS":
            return {
                ...state, Goodss: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 6)
            }
        case "GET_EDIT_GOODS":
            return {
                ...state, edit: action.payload
            }
        case "GET_DETAIL_GOODS":
            return { ...state, detail: action.payload }
        case "CHANGE_CART_COUNT":
            return { ...state, cardLenght: action.payload }
        case "GET_CARD":
            return { ...state, card: action.payload }


        default: return state
    }
}

const GoodsContextProvider = ({ children }) => {
    const history = useHistory()
    const [state, dispatch] = useReducer(reducer, INIT_STATE)



    const getGoods = async (history) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', 6)
        history.push(`${history.location.pathname}?${search.toString()}`)

        let data = await axios(`${API}/Goods${window.location.search}`)
        dispatch({
            type: "GET_GOODS",
            payload: data
        })
    }

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

    const deleteCard = async (id, history) => {
        await axios.delete(`${API}/card/${id}`)
        getGoods(history)
    }

    const addGoodsInCard = (Goods) => {
        let card = JSON.parse(localStorage.getItem('card'))
        if (!card) {
            card = {
                Goods: [],
                totalPrice: 0

            }
        }

        let newGoods = {
            item: Goods,
            count: 1,
            subPrice: 0
        }
        let filteredCard = card.Goods.filter(elem => elem.item.id === Goods.id)
        if (filteredCard.length > 0) {
            card.Goods = card.Goods.filter(elem => elem.item.id !== Goods.id)
        } else {
            card.Goods.push(newGoods)
        }
        newGoods.subPrice = calcSubPrice(newGoods)
        card.totalPrice = calcTotalPrice(card.Goods)
        localStorage.setItem('card', JSON.stringify(card))
        dispatch({
            type: "CHANGE_CARD_COUNT",
            payload: card.Goods.length

        })
    }
    const getCardLength = () => {
        let card = JSON.parse(localStorage.getItem('card'))
        if (!card) {
            card = {
                Goods: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_CARD_COUNT",
            payload: card.Goods.length
        })

    }
    const getCard = () => {
        let card = JSON.parse(localStorage.getItem('card'))
        if (!card) {
            card = {
                Goods: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CARD",
            payload: card
        })
    }

    const changeGoodsCount = (count, id) => {
        let card = JSON.parse(localStorage.getItem('card'))
        card.Goods = card.Goods.map(elem => {
            if (elem.item.id === id) {
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        card.totalPrice = calcTotalPrice(card.Goods)
        localStorage.setItem('card', JSON.stringify(card))
        getCard()
    }
    const checkGoodsInCard = (id) => {
        let card = JSON.parse(localStorage.getItem('card'))
        if (!card) {
            card = {
                Goodss: [],
                totalPrice: 0
            }
        }
        let newCard = card.Goods.filter(elem => elem.item.id === id)
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
            Goodss: state.Goodss,
            edit: state.edit,
            paginatedPages: state.paginatedPages,
            card: state.card,
            cardLenght: state.cardLenght,
            detail: state.detail,
            getGoods,
            addGoods,
            editGoods,
            saveEditGoods,
            deleteGoods,
            getCard,
            addGoodsInCard,
            changeGoodsCount,
            checkGoodsInCard,
            getCardLength,
            deleteCard,
            getDetail,


        }}>
            {children}
        </GoodsContext.Provider>
    )

}

export default GoodsContextProvider