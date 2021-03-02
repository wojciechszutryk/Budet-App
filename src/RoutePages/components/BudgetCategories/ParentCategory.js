import React, {useMemo} from 'react';
import {StyledParentCategory} from './BudgetCategoriesStyles'
import {setCurrency} from "utilities/functions";
import MoneyStatistics from "./MoneyStatistics";

const ParentCategory = ({name, onClick, categoriesInside, transactions, other= null}) => {

    const moneyInParentCategory = useMemo(() => {
        if(!other){
            let budgetMoney = 0;
            categoriesInside.forEach(category => budgetMoney += category.budget);

            if (!categoriesInside.length) return [budgetMoney, budgetMoney, true];

            let moneySpent = 0;
            transactions.forEach(transaction => moneySpent += transaction.amount);

            const moneyLeft = (budgetMoney - moneySpent).toFixed(2)
            const isMoneyLeft = moneyLeft>0;
            return [
                moneyLeft, setCurrency(budgetMoney), isMoneyLeft
            ];
        }
        return [...other];
    },[other,categoriesInside,transactions]);

    return (
        <StyledParentCategory onClick={onClick}>
            <span>{name}</span>
            {<MoneyStatistics
                moneyLeft={moneyInParentCategory[0]}
                allMoney={moneyInParentCategory[1]}
                isMoneyLeft={moneyInParentCategory[2]}
            />}
        </StyledParentCategory>
    );
};

export default ParentCategory;
