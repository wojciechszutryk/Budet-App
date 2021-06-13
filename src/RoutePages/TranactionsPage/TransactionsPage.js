import {Grid} from './TransactionsPageStyles.js'
import React from 'react';
import {connect} from 'react-redux';
import {activeBudgetSet,} from "data/actions/commonActions";
import {Button, Modal, SuspenseErrorBoundary,} from "components";
import {BudgetCategories} from ".././components/BudgetCategories";
import {BudgetTransactions} from "./components/BudgetTransactions";
import {Link, Route, Switch} from "react-router-dom";
import SetBudget from "../components/SetBudget";
import {useTranslation} from "react-i18next";
import {useMutation, useQuery, useQueryClient} from "react-query";
import API from "data/fetch";
import {informationNotification} from "utilities/functions";
const TransactionForm = React.lazy(() => import('./components/TransactionForm'));
const ExportTransactions = React.lazy(() => import('./components/ExportTransactions'));
const ImportTransactions = React.lazy(() => import('./components/ImportTransactions'));

const TransactionsPage = ({activeBudget, activeBudgetSet}) => {

    const queryClient = useQueryClient();
    const {t} = useTranslation();
    const {data:allBudgets} = useQuery('allBudgets', API.common.fetchAllBudgetsFromAPI);
    const {data:allCategories} = useQuery('allCategories', API.common.fetchAllCategoriesFromAPI);
    const {data:budgetCategories} = useQuery(['budgetCategories',{id: activeBudget}], () => API.budget.fetchBudgetCategoriesFromAPI({id: activeBudget}));
    const {data:parentCategories} = useQuery('parentCategories', API.common.fetchParentCategoriesFromAPI);
    const {data:budget} = useQuery(['budgetTransactions',{id: activeBudget}], () => API.budget.fetchBudgetTransactionsFromAPI({id: activeBudget}));

    const addTransitionMutation = useMutation(API.budget.addTransition, {
        onSuccess: () => {
            queryClient.invalidateQueries('budget').then(r => JSON.stringify(r));
            queryClient.invalidateQueries('budgetCategories').then(r => JSON.stringify(r));
        },
    })

    const removeBudgetMutation = useMutation(API.common.removeBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('allBudgets');
        },
    })

    const handleSubmitAddTransactionForm = (values) => {
        addTransitionMutation.mutate({
            budgetId: activeBudget.toString(),
            data: values
        });
        informationNotification("Succeeded in adding Transaction");

    };

    const handleRemoveBudget = (id) => {
        if (allBudgets.length<2) informationNotification("You must have at least one budget.");
        else if (id === activeBudget.toString() && allBudgets.length > 0) {
            removeBudgetMutation.mutate(id);
            activeBudgetSet(allBudgets[0].id);
            informationNotification("Succeeded in removing Budget");
        }
        else informationNotification("Set Budget Active before deleting");
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
                            parentCategories={parentCategories}
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
                        <BudgetTransactions allCategories={allCategories} budget={budget} parentCategories={parentCategories}/>
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
                        <ImportTransactions budgetCategories={budgetCategories} allCategories={allCategories}/>
                    </Modal>
                </Route>
            </Switch>
        </>
    );
};

const ConnectedTransactionsPage = connect(
state => ({
    activeBudget: state.common.activeBudget
}),
    {
        activeBudgetSet,
    }
)(TransactionsPage);

export default ConnectedTransactionsPage;
