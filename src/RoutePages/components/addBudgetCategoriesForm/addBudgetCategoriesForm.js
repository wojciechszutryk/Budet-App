import React, {useState, useMemo} from 'react'
import {FormField, FormGroup, Label, Message} from "components/Input/InputStyles";
import {Button} from "components";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {BudgetAmount, BudgetName} from "./addBudgetCategoriesFormStyles";
import {setCurrency} from "utilities/functions";

const AddBudgetForm = ({categories, name, totalAmount}) => {
    const [budgetCategoriesFounds, setBudgetCategoriesFounds] = useState({});
    const {t} = useTranslation();

    const resetForm = () => {
        document.getElementById("budgetCategoriesForm").reset();
    }

    const handleFoundsChange = (id, e) => {
        const categoryFounds = {}
        categoryFounds[id]=parseInt(e.target.value);
        setBudgetCategoriesFounds({...budgetCategoriesFounds, ...categoryFounds});
    }
    console.log(budgetCategoriesFounds)

    // const handleSubmit = {
    //
    // }

    const categoriesFoundsList = categories.map(category => {
        return(
            <FormGroup key={category.value}>
                <FormField type="number" onChange={(e) => handleFoundsChange(category.value, e)}/>
                <Label>{category.label}</Label>
            </FormGroup>
        )
    });

    return(
        <>
            <BudgetName>{name}</BudgetName>
            <span> {t('Founds')}</span>
            <div>
                <span>{t('Budget Amount')}: </span>
                <BudgetAmount>{setCurrency(totalAmount)}</BudgetAmount>
            </div>

            <form id="budgetCategoriesForm">
                <div>
                    {categoriesFoundsList}
                </div>
                <div>
                    <Link  to='/budget/categories'>
                        <Button buttonType='submit'>{t('Submit')}</Button>
                    </Link>
                    <Button
                        buttonType="reset"
                        type="button"
                        onClick={resetForm}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AddBudgetForm;