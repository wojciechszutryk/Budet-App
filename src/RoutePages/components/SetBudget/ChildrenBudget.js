import React from 'react';
import {StyledChildrenBudget} from "./SetBudgetStyles";

const ChildrenBudget = ({name, id, onClick}) => {
    return (
        <StyledChildrenBudget onClick={() => onClick(id)}>
            <span>{name}</span>
        </StyledChildrenBudget>
    );
};

export default ChildrenBudget;