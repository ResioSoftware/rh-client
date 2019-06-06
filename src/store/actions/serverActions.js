import api from '../../config/api'
import {
    DELETE_FALIED,
    DELETE_SUCESS,
    LOADING,
    LOADING_FALIED,
    LOADING_SUCESS,
    SAVE_FALIED,
    SAVE_SUCESS,
    SEARCH_FALIED,
    SEARCH_SUCESS,
    UPDATE_FALIED, UPDATE_LIST_SUCESS,
    UPDATE_SUCESS
} from "./actionsTypes";
import {changeModalVisible} from "./modalActions";
import {change} from "redux-form";
import {changeRoute} from "./routerActions";


export const loadList = entity => async dispatch => [
    dispatch({type: LOADING, payload: {target: entity}}),
    await api.get(`/${entity}`).then(result => dispatch({type: LOADING_SUCESS, payload: {target: entity, value: result.data}}))
        .catch(e => dispatch({type: LOADING_FALIED, payload: {target: entity}}))
]

export const search = (entity, value, field) => async dispatch => [
    await api.get(`/${entity}/${value}`).then(result => dispatch({type: SEARCH_SUCESS, payload: {target: field, value: result.data}}))
        .catch(e => dispatch({type: SEARCH_FALIED}))
]

export const save = (entity, value, options) => async dispatch => [
    await api.post(`/${entity}`, value).then(result => {
        dispatch({type: SAVE_SUCESS, payload: {target: entity, value: result.data}})

        if (options && options.modal) {
            dispatch(changeModalVisible(options.modal, false))
            if (options.updateDropdown) {
                dispatch(change(options.updateDropdown.form, options.updateDropdown.field, result.data.id))
            }
        }

        if (options && options.redirect) {
            const route = options.redirect.value ? options.redirect.route + result.data.id : options.redirect.route
            dispatch(changeRoute(route))
        }
    })
        .catch(e => {
            console.log(e)
            dispatch({type: SAVE_FALIED})
        })
]

export const update = (entity, value, options) => async dispatch => [
    await api.put(`/${entity}`, value).then(result => {

        if(options && options.list) {
            dispatch({type: UPDATE_LIST_SUCESS, payload: {target: entity, value: result.data}})
        } else {
            dispatch({type: UPDATE_SUCESS, payload: {target: options.field, value: result.data}})
        }

        if (options && options.modal) dispatch(changeModalVisible(options.modal, false))

        if (options && options.redirect) {
            const route = options.redirect.id ? options.redirect.route + result.data.id : options.redirect.route
            dispatch(changeRoute(route))
        }
    })
        .catch(e => dispatch({type: UPDATE_FALIED}))
]

export const remove = (entity, value) => async dispatch => [
    await api.delete(`/${entity}/${value}`).then(() => dispatch({type: DELETE_SUCESS, payload: {target: entity, value}}))
        .catch(e => dispatch({type: DELETE_FALIED}))
]
