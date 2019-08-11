import React from 'react';
import PageEmpty from "../../layout/PageEmpty";
import Stepper from "../../components/Stepper";
import StepperItem from "../../components/StepperItem";
import StepperContent from "../../components/StepperContent";
import {Redirect, Route, Switch} from "react-router";
import FolhaLancamentoStep1 from "./FolhaLancamentoStep1";
import FolhaLancamentoStep2 from "./FolhaLancamentoStep2";
import FolhaLancamentoStep3 from "./FolhaLancamentoStep3";
import {connect} from "react-redux";
import {changeRoute} from "../../store/actions/routerActions";

const FolhaLancamento = ({changeRoute, router, ...props}) => {

    const path = '/folha/lancamento/';
    const currentPath = router.location.pathname;

    return (
        <PageEmpty>
            <Stepper>
                <StepperItem number={1} onClick={() => changeRoute(`${path}tipo-lancamento`)}
                             selected={currentPath.includes('tipo-lancamento')} label={'Lancamento'}/>
                <StepperItem number={2} onClick={() => changeRoute(`${path}conferencia`)}
                             selected={currentPath.includes('conferencia')} label={'Conferencia'}/>
                <StepperItem number={3} onClick={() => changeRoute(`${path}guia`)}
                             selected={currentPath.includes('guia')} label={'Guias'}/>
            </Stepper>

            <StepperContent>
                <Switch>
                    <Route path={path + 'tipo-lancamento'} component={FolhaLancamentoStep1}/>
                    <Route path={path + 'conferencia'} component={FolhaLancamentoStep2}/>} />
                    <Route path={path + 'guia'} component={FolhaLancamentoStep3}/>} />
                    <Redirect from={path} to={path + 'tipo-lancamento'} exact={true}/>
                </Switch>
            </StepperContent>
        </PageEmpty>
    );
};

export default connect(
    state => ({router: state.router}),
    dispatch => ({changeRoute: route => dispatch(changeRoute(route))})
)(FolhaLancamento);
