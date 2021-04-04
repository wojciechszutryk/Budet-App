import React from 'react';
import {StyledChildrenBudget} from "./SetBudgetStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {DeleteButton} from "components/Button/ButtonStyles";

const ChildrenBudget = ({name, id, setCurrentBudget, disabled, handleRemoveBudget}) => {
    return (
        <StyledChildrenBudget className={disabled ? 'disabled' : null}>
            <span onClick={disabled ? ()=>{} : () => setCurrentBudget(id)}>
                {name}
            </span>
            <DeleteButton onClick={() => handleRemoveBudget(id)}><FontAwesomeIcon icon={faTrashAlt} /></DeleteButton>
        </StyledChildrenBudget>
    );
};

export default ChildrenBudget;