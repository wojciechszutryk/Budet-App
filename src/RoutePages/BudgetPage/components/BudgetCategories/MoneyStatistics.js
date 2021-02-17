import React from 'react';
import {Money, MoneyLeft} from "./BudgetCategoriesStyles";

const MyComponent = ({moneyLeft, allMoney, isMoneyLeft}) => {
    return (
        <div>
            <MoneyLeft money={isMoneyLeft}>
                {moneyLeft}
            </MoneyLeft>
            /
            <Money>
                {allMoney}
            </Money>
        </div>
    );
};

export default MyComponent;
