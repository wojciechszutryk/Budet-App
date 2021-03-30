import {Grid} from './TransactionsPageStyles.js'
import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories, addTransition} from "data/actions/budgetActions";
import {activeBudgetSet, fetchAllBudgets, fetchAllCategories} from "data/actions/commonActions";
import {Button, Loading, Modal,} from "components";
import {BudgetCategories} from ".././components/BudgetCategories";
import {BudgetTransactions} from "./components/BudgetTransactions";
import {Link, Route, Switch} from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import SetBudget from "../components/SetBudget";
import {removeBudget} from "data/fetch/commonFetch";
import {toast} from "react-toastify";
import i18next from "i18next";
import ExportTransactions from "./components/ExportTransactions";
import ImportTransactions from "./components/ImportTransactions";
import {useTranslation} from "react-i18next";

const TransactionsPage = ({budgetState, commonState,
                          allCategories, allBudgets,
                          fetchBudget, fetchBudgetCategories, fetchAllBudgets, fetchAllCategories,
                          budget, addTransition, removeBudget, activeBudget, activeBudgetSet}) => {

    const {t} = useTranslation();

    useEffect(()=>{
        fetchBudget(activeBudget);
        fetchBudgetCategories(activeBudget);
        fetchAllCategories();
        fetchAllBudgets();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, activeBudget, fetchAllBudgets]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleSubmitAddTransactionForm = (values) => {
        console.log(values)
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
                            <ExportTransactions
                                transactions={budget.transactions}
                                name={budget.name}
                            />
                            <Link  to='transactions/import'>
                                <Button buttonType='addBudget'>{t('Import transactions from file')}</Button>
                            </Link>
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
                        <TransactionForm categories={allCategories} onSubmit={handleSubmitAddTransactionForm}/>
                    </Modal>
                </Route>
                <Route path='/transactions/import' exact>
                    <Modal>
                        <ImportTransactions/>
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
