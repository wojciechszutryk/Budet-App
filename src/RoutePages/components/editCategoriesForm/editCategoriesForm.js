import React, {useState, useMemo} from 'react'
import {Button} from "components";
import {useTranslation} from "react-i18next";
import {Link, useHistory } from "react-router-dom";
import {
    CategoriesHeader,
    StyledCategoryBox,
    StyledChild,
    StyledChildrenCategoriesBox,
    StyledParent
} from "./editCategoriesFormStyles";
import {groupBy} from "lodash";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const EditCategoriesForm = ({childrenCategories, parentCategories, onSubmit}) => {
    const {t} = useTranslation();
    const [redirect, setRedirect] = useState(false);
    const [parentCat, setParentCat] = useState(parentCategories);
    const [childrenCat, setChildrenCat] = useState(childrenCategories);
    let history = useHistory();

    const removeChild = (id, parentCategoryId) => {
        const childrenCopy = [...childrenCat];
        const index = childrenCopy.indexOf(childrenCopy.find(child => child.id === id && child.parentCategoryId === parentCategoryId));
        childrenCopy.splice(index,1)
        setChildrenCat(childrenCopy)
    }

    const removeParent = (parentName) => {
        const childrenCopy = [...childrenCat];
        const parentCopy = [...parentCat];
        const parentIndex = parentCopy.indexOf(parentCopy.find(parent => parent.name === parentName));
        setChildrenCat(childrenCopy.filter(child => (
            child.parentCategoryId !== parentCopy[parentIndex].id
        )))
        parentCopy.splice(parentIndex,1);
        setParentCat(parentCopy);
    }

    const groupedCategories = Object.entries(groupBy(childrenCat,
        childrenCategory => parentCat.find(
            parentCategory => parentCategory.id === childrenCategory.parentCategoryId).name
    ));

    const groupedCategoriesList = groupedCategories.map(parentCategory => {
        const [parentName, children] = parentCategory;
        const childrenCategories = children.map(child => (
            <StyledChild key={child.name+Math.random()*100}>
                {child.name}
                <Button buttonType={'delete'} onClick={() => removeChild(child.id, child.parentCategoryId)}><FontAwesomeIcon icon={faTrashAlt}/></Button>
            </StyledChild>
        ))
        return (
            <StyledCategoryBox key={parentName+Math.random()*100}>
                <StyledParent key={parentName+Math.random()*100}>
                    {parentName}
                    <Button buttonType={'delete'} onClick={() => removeParent(parentName)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                </StyledParent>
                <StyledChildrenCategoriesBox>
                    {childrenCategories}
                    <StyledChild><span>+</span><input type="text" placeholder={t('Add new')}/></StyledChild>
                </StyledChildrenCategoriesBox>
            </StyledCategoryBox>
        )
    })

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
            {groupedCategoriesList}
            <form id="editCategoriesForm">
                <div>
                    <Link to='/budget'>
                        <Button
                            buttonType='submit'
                            type='submit'
                            // disabled={budgetOvervaluedError}
                            onClick={handleSubmit}
                        >
                            {t('Save')}
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