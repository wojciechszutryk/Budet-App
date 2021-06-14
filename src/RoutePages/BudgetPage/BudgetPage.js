import {Grid} from './BudgetPageStyles.js'
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {activeBudgetSet} from "data/actions/commonActions";
import {Button, Modal, SuspenseErrorBoundary,} from "components";
import {BudgetCategories} from "../components/BudgetCategories";
import {Charts} from "./components/Charts";
import {Link, Route, Switch} from "react-router-dom";
import SetBudget from "../components/SetBudget";
import {useMutation, useQuery, useQueryClient} from "react-query";
import API from "data/fetch";
import {informationNotification} from "utilities/functions";
import {useTranslation} from "react-i18next";
const AddBudgetForm = React.lazy(() => import('../components/addBudgetForm'));
const AddBudgetCategoriesForm = React.lazy(() => import('../components/addBudgetCategoriesForm'));
const EditCategoriesForm = React.lazy(() => import('../components/editCategoriesForm'));

const BudgetPage = ({activeBudget, activeBudgetSet}) => {
    const {t} = useTranslation();
    const queryClient = useQueryClient();
    const [newBudgetData, setNewBudgetData] = useState({});
    const {data:allBudgets} = useQuery('allBudgets', API.common.fetchAllBudgetsFromAPI);
    const {data:allCategories} = useQuery('allCategories', API.common.fetchAllCategoriesFromAPI);
    const {data:parentCategories} = useQuery('parentCategories', API.common.fetchParentCategoriesFromAPI);
    const {data:childrenCategories} = useQuery('childrenCategories', API.common.fetchChildrenCategoriesFromAPI);
    const {data:budgetCategories} = useQuery(['budgetCategories',{id: activeBudget}], () => API.budget.fetchBudgetCategoriesFromAPI({id: activeBudget}));
    const {data:budgetTransactions} = useQuery(['budgetTransactions',{id: activeBudget}], () => API.budget.fetchBudgetTransactionsFromAPI({id: activeBudget}));

    const addBudgetCategoryMutation = useMutation(API.budget.addBudgetCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('budgetCategories');
        },
    });
    const addBudgetMutation = useMutation(API.budget.addBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('budget');
            queryClient.invalidateQueries('allBudgets');
        },
    });
    const removeBudgetMutation = useMutation(API.common.removeBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('allBudgets');
        },
    });
    const addParentCategoryMutation = useMutation(API.common.addParentCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('allCategories');
            queryClient.invalidateQueries('childrenCategories');
            queryClient.invalidateQueries('parentCategories');
        },
    });
    const addChildrenCategoryMutation = useMutation(API.common.addCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('allCategories');
            queryClient.invalidateQueries('childrenCategories');
            queryClient.invalidateQueries('parentCategories');
        },
    });
    const removeParentCategoryMutation = useMutation(API.common.removeParentCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('allCategories');
            queryClient.invalidateQueries('childrenCategories');
            queryClient.invalidateQueries('parentCategories');
        },
    });
    const removeChildrenCategoryMutation = useMutation(API.common.removeCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('allCategories');
            queryClient.invalidateQueries('childrenCategories');
            queryClient.invalidateQueries('parentCategories');
        },
    });

    const handleSubmitAddBudgetForm = async (values) => {
        const name = values['name'];
        const totalAmount = parseInt(values['totalAmount']);
        const categories = values['categories'];
        const budgetData = {name, totalAmount};
        const data = await addBudgetMutation.mutateAsync(budgetData);
        await Object.keys(categories).forEach(function eachKey(key) {
            const categoryObject = {};
            categoryObject['categoryId'] = key;
            categoryObject['budget'] = categories[key];
            categoryObject['budgetId'] = data.createdBudget.id;
            addBudgetCategoryMutation.mutate(categoryObject);
        });
        const otherCategoryObject = {};
        otherCategoryObject['categoryId'] = '60c7bcc8cbd57a2b0cb3a610';
        otherCategoryObject['budget'] = 0;
        otherCategoryObject['budgetId'] = data.createdBudget.id;
        addBudgetCategoryMutation.mutate(otherCategoryObject);
        informationNotification("Succeeded in adding Budget");
    };

    const handleChangeCategories = async (addedChildren, removedChildren, addedParents, removedParents, addedParentsWithChildren) => {
        if (addedParents.length > 0) addedParents.forEach(parent => addParentCategoryMutation.mutate(parent));
        if (removedChildren.length > 0) removedChildren.forEach(child => removeChildrenCategoryMutation.mutate(child.id));
        if (removedParents.length > 0) removedParents.forEach(parent => removeParentCategoryMutation.mutate(parent.id));
        if (addedChildren.length > 0) addedChildren.forEach(child => addChildrenCategoryMutation.mutate(child));
        if (addedParentsWithChildren.length > 0){
            for(const group of addedParentsWithChildren){
                const parentData = await addParentCategoryMutation.mutateAsync(group.parent);
                for (const child of group.children) child.parentCategoryId = await parentData.createdParentCategory.id
            }
        }
        informationNotification("Categories changed successfully");
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
                        <Link  to='/budget/new'>
                            <Button buttonType='addBudget'>{t("Add new budget")}</Button>
                        </Link>
                        <Link  to='/budget/categories/edit'>
                            <Button buttonType='addBudget'>{t("Menage categories")}</Button>
                        </Link>
                    </SuspenseErrorBoundary>
                </section>
                <section>
                    <SuspenseErrorBoundary>
                        <Charts
                            budget={budgetTransactions}
                            parentCategories={parentCategories}
                            allCategories={allCategories}
                            budgetCategories={budgetCategories}
                        />
                    </SuspenseErrorBoundary>
                </section>
            </Grid>

            <Switch>
                <Route path='/budget/new' exact>
                    <Modal>
                        <AddBudgetForm categories={allCategories} onSubmit={setNewBudgetData}/>
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
                <Route path='/budget/categories/edit' exact>
                    <Modal>
                        <EditCategoriesForm
                            parentCategories={parentCategories}
                            childrenCategories={childrenCategories}
                            onSubmit={handleChangeCategories}
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
