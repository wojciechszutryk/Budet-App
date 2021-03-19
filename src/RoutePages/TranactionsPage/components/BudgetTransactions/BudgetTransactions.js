import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import SortTransactions from "./SortTransactions";
import {cleanActiveCategories} from "data/actions/budgetActions";

const BudgetTransactions = ({transactions, categories, activeCategories, budgetCategories, cleanActiveCategories}) => {
    useEffect(()=>{
        cleanActiveCategories();
    },[cleanActiveCategories]);

    const filteredBySelectedCategory = useMemo(() => {
        const activeTransactions = [];
        if (activeCategories.length === 0) return transactions
        else if (activeCategories.includes('Other')) {
            const otherTransactions = transactions.filter(
                // transaction => !budgetCategories.find(budgetCategory => budgetCategory.id === transaction.categoryId)
                transaction => transaction.categoryId === "0"
            );
            activeTransactions.push(...otherTransactions)
        }
        const categoriesTransactions = transactions.filter(
            transaction => {
                try {
                    const transactionParentCategory = categories.find(category => transaction.categoryId === category.id).parentCategory.name;
                    return activeCategories.includes(transactionParentCategory);
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
    },[activeCategories, categories, transactions]);

    return (
        <SortTransactions allTransactions={transactions} transactions={filteredBySelectedCategory}/>
    );
};

const mapStateToProps = state => ({
    transactions: state.budget.budget.transactions,
    activeCategories: state.budget.activeCategories,
    budgetCategories: state.budget.categories,
    categories: state.common.categories
});

const mapDispatchToProps = {
    cleanActiveCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetTransactions);
