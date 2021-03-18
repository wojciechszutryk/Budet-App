import {Grid} from './TransactionsPageStyles.js'
import React, {useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories, addTransition} from "data/actions/budgetActions";
import {fetchAllCategories} from "data/actions/commonActions";
import {Loading, Modal,} from "components";
import {BudgetCategories} from ".././components/BudgetCategories";
import {BudgetTransactions} from "./components/BudgetTransactions";
import {Route, Switch} from "react-router-dom";
import TransactionForm from "./components/TransactionForm";

const TransactionsPage = ({budgetState, commonState, allCategories, fetchBudget, fetchBudgetCategories, fetchAllCategories, addTransition}) => {
    const [budgetId, setBudgetId] = useState(14);
    useEffect(()=>{
        fetchBudget(budgetId);
        fetchBudgetCategories(budgetId);
        fetchAllCategories();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, budgetId]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleSubmitForm = (values) => {
        addTransition({
            budgetId,
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
