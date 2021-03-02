import React from 'react';
import {StyledChildrenCategory} from './BudgetCategoriesStyles'
import {setCurrency} from "utilities/functions";
import {useMemo} from "react";
import MoneyStatistics from "./MoneyStatistics";

const ChildrenCategory = ({name, budget, transactions, other}) => {

    const moneyInChildrenCategory = useMemo(() => {
        if(!other){
            const budgetMoney = budget.toFixed(2);
            if (!transactions.length) return [budgetMoney, budgetMoney, true];
            let moneySpent = 0;
            transactions.forEach(transaction => moneySpent += transaction.amount);
            const moneyLeft = (budget - moneySpent).toFixed(2);
            const isMoneyLeft = (budget - moneySpent) > 0;
            return [
                moneyLeft, setCurrency(budgetMoney), isMoneyLeft
            ];
        }
        return other;
    },[other,budget,transactions]);

    return (
        <StyledChildrenCategory>
            <span>{name}</span>
            {other ? null : <MoneyStatistics
                moneyLeft={moneyInChildrenCategory[0]}
                allMoney={moneyInChildrenCategory[1]}
                isMoneyLeft={moneyInChildrenCategory[2]}
            />}
        </StyledChildrenCategory>
    );
};

export default ChildrenCategory;
