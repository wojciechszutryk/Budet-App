import {Grid} from './BudgetPageStyles.js'
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {activeBudgetSet} from "data/actions/commonActions";
import {Button, Modal, SuspenseErrorBoundary,} from "components";
import {BudgetCategories} from "../components/BudgetCategories";
import {Charts} from "./components/Charts";
import {Link, Route, Switch} from "react-router-dom";
import AddBudgetForm from "../components/addBudgetForm";
import AddBudgetCategoriesForm from "../components/addBudgetCategoriesForm";
import SetBudget from "../components/SetBudget";
import {toast} from "react-toastify";
import i18next from "i18next";
import {useMutation, useQuery, useQueryClient} from "react-query";
import API from "data/fetch";
import {informationNotification} from "utilities/functions";

const BudgetPage = ({activeBudget, activeBudgetSet}) => {
    const queryClient = useQueryClient();
    const [newBudgetData, setNewBudgetData] = useState({});
    const {data:allBudgets} = useQuery('allBudgets', API.common.fetchAllBudgetsFromAPI);
    const {data:allCategories} = useQuery('allCategories', API.common.fetchAllCategoriesFromAPI);
    const {data:budgetCategories} = useQuery(['budgetCategories',{id: activeBudget}], () => API.budget.fetchBudgetCategoriesFromAPI({id: activeBudget}));
    const {data:budget} = useQuery(['budget',{id: activeBudget}], () => API.budget.fetchBudgetFromAPI({id: activeBudget}));

    const addBudgetCategoryMutation = useMutation(API.budget.addBudgetCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('budgetCategories')
        },
    });
    const addBudgetMutation = useMutation(API.budget.addBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('budget')
            queryClient.invalidateQueries('allBudgets')
        },
    });
    const removeBudgetMutation = useMutation(API.common.removeBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('allBudgets');
        },
    })

    const handleNextAddBudgetForm = (values) => {
        setNewBudgetData(values)
    };

    const handleSubmitAddBudgetForm = (values) => {
        const newBudgetId = allBudgets.length > parseInt(allBudgets[allBudgets.length-1].id)
            ? (allBudgets.length).toString()
            :  (parseInt(allBudgets[allBudgets.length-1].id)+1).toString();
        const name = values['name'];
        const totalAmount = parseInt(values['totalAmount']);
        const categories = values['categories'];
        const budgetData = {name, totalAmount, id:newBudgetId};
        Object.keys(categories).forEach(function eachKey(key) {
            const categoryObject = {};
            categoryObject['categoryId'] = key;
            categoryObject['budget'] = categories[key];
            categoryObject['budgetId'] = newBudgetId;
            addBudgetCategoryMutation.mutate(categoryObject);
        });
        addBudgetMutation.mutate(budgetData);
        activeBudgetSet(newBudgetId);
        informationNotification("Succeeded in adding Budget");
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
                        />
                        <Link  to='/budget/new'>
                            <Button buttonType='addBudget'>Add new budget</Button>
                        </Link>
                    </SuspenseErrorBoundary>
                </section>
                <section>
                    <SuspenseErrorBoundary>
                        <Charts
                            budget={budget}
                            allCategories={allCategories}
                            budgetCategories={budgetCategories}
                        />
                    </SuspenseErrorBoundary>
                </section>
            </Grid>

            <Switch>
                <Route path='/budget/new' exact>
                    <Modal>
                        <AddBudgetForm categories={allCategories} onSubmit={handleNextAddBudgetForm}/>
                    </Modal>
                </Route>
                <Route path='/budget/categories' exact>
                    <Modal>
                        <AddBudgetCategoriesForm
                            name={newBudgetData['name']}
                            totalAmount={newBudgetData['totalAmount']}
                            categories={newBudgetData['categories']}
                            onSubmit={handleSubmitAddBudgetForm}
                        />
                    </Modal>
                </Route>
            </Switch>
        </>
    );
};

const ConnectedBudgetPage = connect(state => ({
    activeBudget: state.common.activeBudget
}),
{
    activeBudgetSet,
}
)(BudgetPage);

export default ConnectedBudgetPage;
