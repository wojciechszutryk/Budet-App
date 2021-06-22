import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import SortTransactions from "./SortTransactions";

const BudgetTransactions = ({activeCategories, budget, allCategories, parentCategories, otherCategoryId}) => {
    const filteredBySelectedCategory = useMemo(() => {
        const activeTransactions = [];
        if (activeCategories.length === 0) return budget.transactions
        else if (activeCategories.includes('Other')) {
            const otherTransactions = budget.transactions.filter(
                // transaction => !budgetCategories.find(budgetCategory => budgetCategory.id === transaction.categoryId)
                transaction => transaction.categoryId === otherCategoryId
            );
            activeTransactions.push(...otherTransactions)
        }
        const categoriesTransactions = budget.transactions.filter(
            transaction => {
                try {
                    const transactionParentCategoryId = allCategories.find(category => transaction.categoryId === category.id).parentCategory;
                    const parentCategoryName = parentCategories.find(category => category.id === transactionParentCategoryId).name;
                    return activeCategories.includes(parentCategoryName);
                } catch (err) {
                    return false
                }
            }
        );
        activeTransactions.push(...categoriesTransactions);
        const seen = new Set();
        return activeTransactions.filter(el => {
            const duplicate = seen.has(el.id);
            seen.add(el.id);
            return !duplicate;
        });
    },[activeCategories, allCategories, budget.transactions, otherCategoryId, parentCategories]);

    return (
        <SortTransactions allTransactions={budget.transactions} categories={allCategories} transactions={filteredBySelectedCategory}/>
    );
};

const mapStateToProps = state => ({
    activeCategories: state.budget.activeCategories,
    activeBudget: state.common.activeBudget,
    otherCategoryId: state.common.otherCategoryId,
});


export default connect(mapStateToProps)(BudgetTransactions);
