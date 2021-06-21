import React, {useMemo} from 'react';
import {connect} from 'react-redux'
import {groupBy} from 'lodash';
import {SwitchList} from 'components';
import ParentCategory from "./ParentCategory";
import ChildrenCategory from "./ChildrenCategory";
import {StyledBudgetMoney} from "./BudgetCategoriesStyles";
import 'styled-components/macro'
import MoneyStatistics from "./MoneyStatistics";
import {setCurrency} from "utilities/functions";
import {addActiveCategory, removeActiveCategory} from 'data/actions/budgetActions'
import {useTranslation} from "react-i18next";
import {useQuery} from "react-query";
import API from "data/fetch";

const BudgetCategories = ({addActiveCategory, activeBudget, activeCategories, removeActiveCategory, allCategories, budgetCategories, parentCategories, otherCategoryId}) => {
    const {t} = useTranslation();
    const {data:budget} = useQuery(['budgetTransactions',{id: activeBudget}], () => API.budget.fetchBudgetTransactionsFromAPI({id: activeBudget}));

    const groupedCategories = useMemo(() => (groupBy(budgetCategories.budgetCategories,
        budgetCategory => {
            const parentCategoryId = allCategories.find(category => budgetCategory.categoryId === category.id);
            if (parentCategoryId) return parentCategories.find(category => category.id === parentCategoryId.parentCategory).name;
        }
    )), [allCategories, budgetCategories.budgetCategories, parentCategories]);

    let budgetMoneySpent = 0;
    budget.transactions.forEach(transaction => {
        if(transaction.amount) return budgetMoneySpent+=transaction.amount;
    });
    
    const availableBudgetMoney = budget.totalAmount;
    const moneyLeft = availableBudgetMoney-budgetMoneySpent;
    const isMoneyLeft = moneyLeft>0;

    const amountToSpendOnCategories = budgetCategories.budgetCategories.reduce((acc, budgetCategory) => (acc + budgetCategory.budget), 0);
    const otherTransactions = useMemo(() => budget.transactions.filter(transaction => {
            if (transaction.amount) return transaction.categoryId === otherCategoryId;
            else return null;
        }), [budget.transactions, otherCategoryId]);
    const otherExpenses = useMemo(() => 
        otherTransactions.reduce((acc,transaction) => acc + transaction.amount, 0),
    [otherTransactions]);
    const leftToSpendOnOther = budget.totalAmount - amountToSpendOnCategories;

    const categoriesList = Object.entries(groupedCategories).map(category => {
        if (category[0] === 'Other'){
            return {
                id: 'Other',
                Trigger: ({onClick}) => (
                    <ParentCategory
                        name={t('Other')}
                        onClick={() => {
                            onClick('Other');
                            activeCategories.includes('Other') ? removeActiveCategory('Other') : addActiveCategory('Other');
                        }}
                        categoriesInside={{}}
                        transactions={otherTransactions}
                        other={[(leftToSpendOnOther-otherExpenses).toFixed(2), setCurrency(leftToSpendOnOther.toFixed(2)), parseInt(leftToSpendOnOther-otherExpenses)>0]}
                    />
                ),
                children: (<ChildrenCategory
                    key={'Other'}
                    name={t('Money spent on other or non-budgeted categories')}
                    other={true}
                />)
            }
        }
        return {
            id: category[0],
            Trigger: ({onClick}) => (
                <ParentCategory
                    name={category[0]}
                    onClick={() => {
                        onClick(category[0]);
                        activeCategories.includes(category[0]) ? removeActiveCategory(category[0]) : addActiveCategory(category[0]);
                    }}
                    categoriesInside={category[1]}
                    transactions={budget.transactions.filter(transaction =>
                        category[1].find(cat => transaction.categoryId === cat.categoryId)
                    )}
                />
            ),
            children: category[1].map(budgetCategory => {
                const category = allCategories.find(cat => budgetCategory.categoryId === cat.id);
                let name = 'New'
                if (category !== undefined) name = category.name;
                return (<ChildrenCategory
                    key={name+budgetCategory.budget+Math.random()}
                    name={name}
                    budget={budgetCategory.budget}
                    transactions={budget.transactions.filter(transaction => {
                        return transaction.categoryId === budgetCategory.categoryId
                    })}
                />
            )}),
        }
    },[activeCategories, addActiveCategory, allCategories, budget.transactions, groupedCategories, removeActiveCategory]);


    return (
        <div>
            <div
                css={`
                  margin-bottom: 3px;
                `}
            >
                <StyledBudgetMoney>
                    <span>{budget.name}</span>
                    <MoneyStatistics
                        moneyLeft={moneyLeft}
                        allMoney={setCurrency(availableBudgetMoney)}
                        isMoneyLeft={isMoneyLeft}
                    />
                </StyledBudgetMoney>
            </div>

            <SwitchList
                categories={categoriesList}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    activeBudget: state.common.activeBudget,
    activeCategories: state.budget.activeCategories,
    otherCategoryId: state.budget.otherCategoryId,
});

const mapDispatchToProps = {
    addActiveCategory,
    removeActiveCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCategories);
