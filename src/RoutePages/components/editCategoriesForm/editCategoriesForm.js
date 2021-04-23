import React, {useState, useMemo} from 'react'
import {Button} from "components";
import {useTranslation} from "react-i18next";
import {Link, useHistory } from "react-router-dom";
import {CategoriesHeader} from "./editCategoriesFormStyles";
import {groupBy} from "lodash";

const EditCategoriesForm = ({childrenCategories, parentCategories, allCategories, onSubmit}) => {
    const {t} = useTranslation();
    const [redirect, setRedirect] = useState(false);
    let history = useHistory();

    const groupedCategories = Object.entries(groupBy(childrenCategories,
        childrenCategory => parentCategories.find(
            parentCategory => parentCategory.id === childrenCategory.parentCategoryId).name
    ));

    console.log(groupedCategories)

    useMemo(() =>{
        if (!childrenCategories || !parentCategories) setRedirect(true);
    },[childrenCategories, parentCategories]);

    const handleError = () => {
        history.push('/budget');
        window.location.reload();
    }

    const resetForm = () => {
        document.getElementById("editCategoriesForm").reset();
        // setOtherCategoriesFounds(totalAmount);
    };

    const handleSubmit = () => {
        onSubmit({
            // name,
            // totalAmount,
            // categories: budgetCategoriesFounds,
        });
    };

    return(
        redirect ? handleError() :
        <>
            <CategoriesHeader>{t("categories").toUpperCase()}</CategoriesHeader>
            <form id="editCategoriesForm">
                <div>
                    <Link to='/budget'>
                        <Button
                            buttonType='submit'
                            type='submit'
                            // disabled={budgetOvervaluedError}
                            onClick={handleSubmit}
                        >
                            {t('Submit')}
                        </Button>
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

export default EditCategoriesForm;