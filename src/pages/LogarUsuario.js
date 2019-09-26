import React, {useEffect} from 'react';
import {changeRoute} from "../store/actions/routerActions";
import {connect} from "react-redux";
import {login} from "../config/auth";
import {carregarInformacoesUsuario} from "../store/actions/usuarioActions";

const LogarUsuario = ({match, changeRoute, loadUser}) => {

    useEffect(() => {
        if (match.params.token) {
            console.log('entrei')
            login(match.params.token);
            loadUser();
            changeRoute('/')
            console.log('passei')
        }
    }, []);

    return (
        <div/>
    );
};

const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(carregarInformacoesUsuario()),
    changeRoute: route => dispatch(changeRoute(route))
});

export default connect(null, mapDispatchToProps)(LogarUsuario);
