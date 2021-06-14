import React from 'react';
import {StyledListItem} from "../BudgetTransactionsStyles";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DeleteButton} from "components/Button/ButtonStyles";
import {useMutation, useQueryClient} from "react-query";
import {informationNotification} from "utilities/functions";
import API from "data/fetch";

const ListItem = ({amount, category, date, description, id}) => {
    const queryClient = useQueryClient();
    const removeTransactionMutation = useMutation(API.budget.removeTransition)
    const handleRemoveTransaction = () => {
        removeTransactionMutation.mutate(id, {onSuccess: () => {
            queryClient.refetchQueries()
        }});
        informationNotification("Succeeded in removing Transaction");
    }
    return (
        <StyledListItem>
            <span>{description}</span>
            <span>{amount}</span>
            <span>{date}</span>
            <span>{category}</span>
            <DeleteButton onClick={() => handleRemoveTransaction(id)}><FontAwesomeIcon icon={faTrashAlt} /></DeleteButton>
        </StyledListItem>
    );
};

export default ListItem;
