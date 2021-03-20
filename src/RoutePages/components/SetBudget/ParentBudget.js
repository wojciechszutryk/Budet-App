import React from 'react';
import {StyledParentBudget} from "./SetBudgetStyles";

const ParentBudget = ({name, onClick}) => {
    return (
        <StyledParentBudget onClick={onClick}>
            <span>{name}</span>
        </StyledParentBudget>
    );
};

export default ParentBudget;
