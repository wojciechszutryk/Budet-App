import {Grid} from './TransactionsPageStyles.js'
import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories, addTransition} from "data/actions/budgetActions";
import {fetchAllCategories} from "data/actions/commonActions";
import {Loading, Modal,} from "components";
import {BudgetCategories} from ".././components/BudgetCategories";
import {BudgetTransactions} from "./components/BudgetTransactions";
import {Route, Switch} from "react-router-dom";
import TransactionForm from "./components/TransactionForm";

const TransactionsPage = ({budgetState, budget, commonState, allCategories, fetchBudget, fetchBudgetCategories, fetchAllCategories, addTransition}) => {
    useEffect(()=>{
        fetchBudget(1);
        fetchBudgetCategories(1);
        fetchAllCategories();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleSubmitForm = (values) => {
        addTransition({
            budgetId: budget.id,
            data: values
        });
    };

    return (
        <>
            <Grid>
                <section>
                    {finishedLoading ? <BudgetCategories/> : <Loading/>}
                </section>
                <section>
                    {finishedLoading ? <BudgetTransactions/> : <Loading/>}
                </section>
            </Grid>

            <Switch>
                <Route path='/transactions/new' exact>
                    <Modal>
                        <TransactionForm categories={allCategories} onSubmit={handleSubmitForm}/>
                    </Modal>
                </Route>
            </Switch>
        </>

    );
};

const ConnectedTransactionsPage = connect(
state => ({
    budget: state.budget.budget,
    budgetState: state.budget.loading,
    commonState: state.common.loading,
    allCategories: state.common.categories,
}),
    {
        fetchBudget,
        fetchBudgetCategories,
        fetchAllCategories,
        addTransition
    }
)(TransactionsPage);

export default ConnectedTransactionsPage;
