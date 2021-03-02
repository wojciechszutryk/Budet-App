import React from 'react';
import {StyledListItem} from "../BudgetTransactionsStyles";

const ListItem = ({amount, category, date, description}) => {
    return (
        <StyledListItem>
            <span>{description}</span>
            <span>{amount}</span>
            <span>{date}</span>
            <span>{category}</span>
        </StyledListItem>
    );
};

export default ListItem;
