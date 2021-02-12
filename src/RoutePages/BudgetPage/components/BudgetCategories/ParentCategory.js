import React, {useMemo} from 'react';
import {StyledParentCategory, Money} from './BudgetCategoriesStyles'

const ParentCategory = ({name, onClick, categoriesInside, transactions}) => {

    const moneyInParentCategory = useMemo(() => {
        if (!categoriesInside.length) return null;
        let budgetMoney = 0;
        let moneySpent = 0;
        categoriesInside.forEach(category => budgetMoney += category.budget);
        transactions.forEach(transaction => moneySpent += transaction.amount);
        return (budgetMoney - moneySpent).toFixed(2);
    },[categoriesInside,transactions]);

    const money = moneyInParentCategory >= 0;
    return (
        <StyledParentCategory onClick={onClick}>
            <span>{name}</span>
            <Money money={money}>
                {moneyInParentCategory}
            </Money>
        </StyledParentCategory>
    );
};

export default ParentCategory;
