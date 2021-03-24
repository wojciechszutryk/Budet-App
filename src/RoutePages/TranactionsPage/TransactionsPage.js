import {Grid} from './TransactionsPageStyles.js'
import React, {useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories, addTransition} from "data/actions/budgetActions";
import {activeBudgetSet, fetchAllBudgets, fetchAllCategories} from "data/actions/commonActions";
import {Loading, Modal,} from "components";
import {BudgetCategories} from ".././components/BudgetCategories";
import {BudgetTransactions} from "./components/BudgetTransactions";
import {Route, Switch} from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import SetBudget from "../components/SetBudget";
import {removeBudget} from "data/fetch/commonFetch";
import {toast} from "react-toastify";
import i18next from "i18next";

const TransactionsPage = ({budgetState, commonState,
                          allCategories, allBudgets,
                          fetchBudget, fetchBudgetCategories, fetchAllBudgets, fetchAllCategories,
                          addTransition, removeBudget, activeBudget, activeBudgetSet}) => {
    useEffect(()=>{
        fetchBudget(activeBudget);
        fetchBudgetCategories(activeBudget);
        fetchAllCategories();
        fetchAllBudgets();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, activeBudget, fetchAllBudgets]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleSubmitForm = (values) => {
        addTransition({
            budgetId: activeBudget.toString(),
            data: values
        });
    };

    const setCurrentBudget = id => {
        activeBudgetSet(id);
    };

    const handleRemoveBudget = (id) => {
        if (id === activeBudget.toString()) {
            removeBudget(id);
            activeBudgetSet(allBudgets[1].id);
            window.location.reload(true);
        }
        else {
            toast.info(i18next.t("Set Budget Active before deleting"), {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                button: false,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <Grid>
                <section>
                    {finishedLoading ?
                        <>
                            <SetBudget
                                allBudgets={allBudgets}
                                setCurrentBudget={setCurrentBudget}
                                handleRemoveBudget={handleRemoveBudget}
                            />
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
    activeBudget: state.common.activeBudget
}),
    {
        fetchBudget,
        fetchBudgetCategories,
        fetchAllCategories,
        fetchAllBudgets,
        addTransition,
        activeBudgetSet,
        removeBudget
    }
)(TransactionsPage);

export default ConnectedTransactionsPage;
