import {Grid} from './TransactionsPageStyles.js'
import React, {useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories, addTransition} from "data/actions/budgetActions";
import {fetchAllBudgets, fetchAllCategories} from "data/actions/commonActions";
import {Loading, Modal,} from "components";
import {BudgetCategories} from ".././components/BudgetCategories";
import {BudgetTransactions} from "./components/BudgetTransactions";
import {Route, Switch} from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import SetBudget from "../components/SetBudget";

const TransactionsPage = ({budgetState, commonState, allCategories, allBudgets, fetchBudget, fetchBudgetCategories, fetchAllBudgets, fetchAllCategories, addTransition}) => {
    const [budgetId, setBudgetId] = useState(3);
    useEffect(()=>{
        fetchBudget(budgetId);
        fetchBudgetCategories(budgetId);
        fetchAllCategories();
        fetchAllBudgets();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, budgetId, fetchAllBudgets]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleSubmitForm = (values) => {
        addTransition({
            budgetId: budgetId.toString(),
            data: values
        });
    };

    const setCurrentBudget = id => {
        setBudgetId(id);
    };

    return (
        <>
            <Grid>
                <section>
                    {finishedLoading ?
                        <>
                            <SetBudget allBudgets={allBudgets} onClick={setCurrentBudget} id={budgetId}/>
                            <BudgetCategories/>
                        </>
                        :
                        <Loading/>}
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
    allBudgets: state.common.budgets,
}),
    {
        fetchBudget,
        fetchBudgetCategories,
        fetchAllCategories,
        fetchAllBudgets,
        addTransition
    }
)(TransactionsPage);

export default ConnectedTransactionsPage;
