import {Grid} from './TransactionsPageStyles.js'
import React from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories, addTransition} from "data/actions/budgetActions";
import {activeBudgetSet, fetchAllBudgets, fetchAllCategories} from "data/actions/commonActions";
import {Button, Modal, SuspenseErrorBoundary,} from "components";
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
import {useMutation, useQuery, useQueryClient} from "react-query";
import API from "data/fetch";

const TransactionsPage = ({addTransition, removeBudget, activeBudget, activeBudgetSet}) => {

    const queryClient = useQueryClient();
    const {t} = useTranslation();
    const {data:allBudgets} = useQuery('allBudgets', API.common.fetchAllBudgetsFromAPI);
    const {data:allCategories} = useQuery('allCategories', API.common.fetchAllCategoriesFromAPI);
    const {data:budgetCategories} = useQuery(['budgetCategories',{id: activeBudget}], () => API.budget.fetchBudgetCategoriesFromAPI({id: activeBudget}));
    const {data:budget} = useQuery(['budget',{id: activeBudget}], () => API.budget.fetchBudgetFromAPI({id: activeBudget}));

    const addTransitionMutation = useMutation(addTransition, {
        onSuccess: () => {
            queryClient.invalidateQueries('budget')
        },
    })

    const removeBudgetMutation = useMutation(removeBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('allBudgets');
        },
    })

    const handleSubmitAddTransactionForm = (values) => {
        addTransitionMutation.mutate({
            budgetId: activeBudget.toString(),
            data: values
        });
    };

    const handleRemoveBudget = (id) => {
        if (id === activeBudget.toString()) {
            removeBudgetMutation.mutate(id);
            activeBudgetSet(allBudgets[0].id);
            window.location.reload();
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
                    <SuspenseErrorBoundary>
                        <SetBudget
                            allBudgets={allBudgets}
                            setCurrentBudget={activeBudgetSet}
                            handleRemoveBudget={handleRemoveBudget}
                            activeBudget={activeBudget}
                        />
                        <BudgetCategories
                            allCategories={allCategories}
                            budgetCategories={budgetCategories}
                        />
                        <ExportTransactions
                            transactions={budget.transactions}
                            name={budget.name}
                        />
                        <Link  to='transactions/import'>
                            <Button buttonType='addBudget'>{t('Import transactions from file')}</Button>
                        </Link>
                    </SuspenseErrorBoundary>
                </section>
                <section>
                    <SuspenseErrorBoundary>
                        <BudgetTransactions allCategories={allCategories} budget={budget}/>
                    </SuspenseErrorBoundary>
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
