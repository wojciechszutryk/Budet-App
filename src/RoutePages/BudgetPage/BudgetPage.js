import {Grid} from './BudgetPageStyles'
import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories} from "data/actions/budgetActions";
import {fetchAllCategories} from "data/actions/commonActions";
import {Loading, Modal, Button} from "components";
import {BudgetCategories} from "./components/BudgetCategories";
import {BudgetTransactions} from "./components/BudgetTransactions";
import {Link, Route, Switch} from "react-router-dom";

const BudgetPage = ({budgetState, commonState, fetchBudget, fetchBudgetCategories, fetchAllCategories}) => {
    useEffect(()=>{
        fetchBudget(1);
        fetchBudgetCategories(1);
        fetchAllCategories();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    return (
        <>
            <Grid>
                <section>
                    {finishedLoading ? <BudgetCategories/> : <Loading/>}
                </section>
                <section>
                    {finishedLoading ?
                        <>
                            <Link  to='budget/transactions/new'>
                                <Button buttonType='transaction'>Add new transaction</Button>
                            </Link>
                            <BudgetTransactions/>
                        </>
                        : <Loading/>}
                </section>
            </Grid>

            <Switch>
                <Route path='/budget/transactions/new' exact>
                    <Modal>Content</Modal>
                </Route>
            </Switch>
        </>

    );
};

const ConnectedBudgetPage = connect(state => ({
    budget: state.budget.budget,
    budgetState: state.budget.loading,
    commonState: state.common.loading,
}),
    {fetchBudget, fetchBudgetCategories, fetchAllCategories}
)(BudgetPage);

export default ConnectedBudgetPage;
