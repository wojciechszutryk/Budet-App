import React, {useState, useMemo} from 'react'
import {FormField, FormGroup, Label, Message} from "components/Input/InputStyles";
import {Button} from "components";
import {useTranslation} from "react-i18next";
import {BudgetAmount, BudgetName} from "./addBudgetCategoriesFormStyles";
import {setCurrency} from "utilities/functions";

const AddBudgetCategoriesForm = ({name, totalAmount, categories, onSubmit}) => {
    const [budgetCategoriesFounds, setBudgetCategoriesFounds] = useState({});
    const [budgetOvervaluedError, setBudgetOvervaluedError] = useState(true);
    const [otherCategoriesFounds, setOtherCategoriesFounds] = useState(totalAmount);
    const {t} = useTranslation();

    useMemo(() => {
        let totalCurrentCategoriesFounds = 0;
        Object.entries(budgetCategoriesFounds).forEach(category => {
            totalCurrentCategoriesFounds += category[1];
        });
        totalCurrentCategoriesFounds > totalAmount ? setBudgetOvervaluedError(true) : setBudgetOvervaluedError(false);
        Object.entries(budgetCategoriesFounds).forEach(category => {
            if (!category[1] || category[1] === 0) setBudgetOvervaluedError(true);
        });
        const inputs = document.querySelector('form').getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].value === ""){
                setBudgetOvervaluedError(true);
            }
        }
        setOtherCategoriesFounds(totalAmount-totalCurrentCategoriesFounds);
        if (categories.length === 0) setBudgetOvervaluedError(false);
    },[budgetCategoriesFounds, categories.length, totalAmount])

    console.log(budgetOvervaluedError)


    const resetForm = () => {
        document.getElementById("budgetCategoriesForm").reset();
        setOtherCategoriesFounds(totalAmount);
    }

    const handleFoundsChange = (id, e) => {
        const categoryFounds = {}
        categoryFounds[id]=parseInt(e.target.value);
        setBudgetCategoriesFounds({...budgetCategoriesFounds, ...categoryFounds});
    }

    const handleSubmit = () => {
        // let i =0;
        const budgetCategories = {};
        // = budgetCategoriesFounds.map(category => (
        //     {
        //         "id": i++,
        //         "budget": category[]
        //     }
        // ))
        onSubmit({
            name,
            totalAmount,
            budgetCategories,
        });
    }

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
                    <span>{t('Other')} </span>:
                    {otherCategoriesFounds > 0 ?
                        <BudgetAmount>{setCurrency(otherCategoriesFounds)}</BudgetAmount>
                        : <BudgetName>{setCurrency(otherCategoriesFounds)}</BudgetName>}
                </div>
                <div>
                    <Button
                        buttonType='submit'
                        type='submit'
                        disabled={budgetOvervaluedError}
                        onClick={handleSubmit}
                    >
                        {t('Submit')}
                    </Button>
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

export default AddBudgetCategoriesForm;