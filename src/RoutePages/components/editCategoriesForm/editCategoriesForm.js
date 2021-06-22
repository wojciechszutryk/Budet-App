import React, {useState, useMemo, useCallback} from 'react'
import {Button} from "components";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {
    CategoriesHeader,
    StyledCategoryBox,
    StyledChild,
    StyledChildrenCategoriesBox,
    StyledParent
} from "./editCategoriesFormStyles";
import {groupBy} from "lodash";
import {faTrashAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";

const EditCategoriesForm = ({childrenCategories, parentCategories, userId, onSubmit}) => {
    const {t} = useTranslation();
    const [parentCat, setParentCat] = useState(parentCategories);
    const [childrenCat, setChildrenCat] = useState(childrenCategories);

    const handleInputEmpty = useCallback((input, message) => {
        input.placeholder = t(message);
        input.classList.add('red');
        setTimeout(() => {
            input.placeholder = t('Add new');
            input.classList.remove('red');
        },3000);
    },[t]);

    const addChild = useCallback((parentName) => {
        const parentCategoryId = parentCat.find(parent => parent.name === parentName).id;
        const input = document.getElementById(parentName);
        if (!input.value || !parentCategoryId) handleInputEmpty(input, 'Insert category name');
        else {
            const id = (childrenCat.length+1) > (parseInt(childrenCat.slice(-1)[0].id)+1) ? (childrenCat.length+1).toString() : (parseInt(childrenCat.slice(-1)[0].id)+1).toString();
            const newChildCat = {
                id,
                parentCategory: parentCategoryId,
                name: input.value,
                userId,
            }
            setChildrenCat([...childrenCat, newChildCat]);
        }
    },[childrenCat, handleInputEmpty, parentCat, userId]);

    const addParent =  useCallback(() => {
        const input = document.getElementById('newParent');
        if (!input.value) handleInputEmpty(input, 'Insert category name');
        else if(parentCat.find(cat => cat.name === input.value)) {
            input.value = "";
            handleInputEmpty(input, 'Category exists');
        }
        else {
            const id = (parentCat.length+1) > (parseInt(parentCat.slice(-1)[0].id)+1) ? (parentCat.length+1).toString() : (parseInt(parentCat.slice(-1)[0].id)+1).toString();
            const newParentCat = {
                id,
                name: input.value,
                userId,
            }
            setParentCat([...parentCat, newParentCat]);
        }
    },[handleInputEmpty, parentCat, userId]);

    const removeChild = useCallback((id, parentCategoryId) => {
        const childrenCopy = [...childrenCat];
        const index = childrenCopy.indexOf(childrenCopy.find(child => child.id === id && child.parentCategoryId === parentCategoryId));
        childrenCopy.splice(index,1)
        setChildrenCat(childrenCopy)
    },[childrenCat]);

    const removeParent = useCallback((parentName) => {
        const childrenCopy = [...childrenCat];
        const parentCopy = [...parentCat];
        const parentIndex = parentCopy.indexOf(parentCopy.find(parent => parent.name === parentName));
        setChildrenCat(childrenCopy.filter(child => (
            child.parentCategory !== parentCopy[parentIndex].id
        )))
        parentCopy.splice(parentIndex,1);
        setParentCat(parentCopy);
    },[childrenCat, parentCat]);

    const groupedCategories = useMemo(()=> Object.entries(groupBy(childrenCat,
        childrenCategory => {
            const parentCategory = parentCat.find(parentCategory => {
                    return (parentCategory.id === childrenCategory.parentCategory)
                });
            if (parentCategory !== undefined) return parentCategory.name
        })),[childrenCat, parentCat]);
    const otherCatInGroupedCatIndex = groupedCategories.indexOf(groupedCategories.find(group => group[0] === 'Other'));
    groupedCategories.splice(otherCatInGroupedCatIndex, 1);
    
    const nonEmptyParents = groupedCategories.map(category => category[0]);
    const allParents = parentCat.map(category => category.name);
    const emptyParents = allParents.filter(parent => !nonEmptyParents.includes(parent));
    const emptyParentsObjects = parentCat.filter(parent => emptyParents.includes(parent.name));
    const otherCatInEmptyParentsObjects = emptyParentsObjects.indexOf(emptyParentsObjects.find(parent => parent.name === 'Other'));
    emptyParentsObjects.splice(otherCatInEmptyParentsObjects, 1);
    const emptyParentsList = emptyParentsObjects.map(parent => {
        return(
            <StyledCategoryBox key={parent.name+Math.random()*100}>
                <StyledParent>
                    {parent.name}
                    <Button buttonType={'delete'} onClick={() => removeParent(parent.name)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                </StyledParent>
                <StyledChildrenCategoriesBox>
                    <StyledChild>
                        <button onClick={() => addChild(parent.name)}><FontAwesomeIcon icon={faPlus}/></button>
                        <input type="text" id={parent.name} placeholder={t('Add new')}/>
                    </StyledChild>
                </StyledChildrenCategoriesBox>
            </StyledCategoryBox>
        )
    });
    
    const groupedCategoriesList = useMemo(() => groupedCategories.map(parentCategory => {
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
                    <StyledChild>
                        <button onClick={() => addChild(parentName)}><FontAwesomeIcon icon={faPlus}/></button>
                        <input type="text" id={parentName} placeholder={t('Add new')}/>
                    </StyledChild>
                </StyledChildrenCategoriesBox>
            </StyledCategoryBox>
        )
    }),[addChild, groupedCategories, removeChild, removeParent, t]);

    const resetForm = useCallback(()=> () => {
        setChildrenCat(childrenCategories);
        setParentCat(parentCategories);
    },[childrenCategories, parentCategories]);

    const handleSubmit = () => {
        childrenCat.forEach(child => delete child.id);
        const addedChildren = childrenCat.filter(child => !childrenCategories.includes(child));
        const removedChildren = childrenCategories.filter(child => !childrenCat.includes(child));
        const addedParents = parentCat.filter(parent => !parentCategories.includes(parent));
        const removedParents = parentCategories.filter(parent => !parentCat.includes(parent));
        const addedParentsWithChildren = addedParents.filter(parent => {
            const parentsChildren = addedChildren.filter(child => child.parentCategory === parent.id);
            parentsChildren.forEach(child => delete child.id)
            return parentsChildren.length > 0;
        }).map(parent => {
            const parentsChildren = addedChildren.filter(child => child.parentCategory === parent.id);
            return {
                parent: parent,
                children: parentsChildren,
            }
        });
        onSubmit(addedChildren, removedChildren, addedParents, removedParents, addedParentsWithChildren);
    };

    return(
        <>
            <CategoriesHeader>{t("categories").toUpperCase()}</CategoriesHeader>
            {groupedCategoriesList}
            {emptyParentsList}
            <StyledParent>
                <button onClick={addParent}><FontAwesomeIcon icon={faPlus}/></button>
                <input type="text" id='newParent' placeholder={t("New parent Category")}/>
            </StyledParent>
            <div>
                <Link to='/budget'>
                    <Button
                        buttonType='submit'
                        type='submit'
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
        </>
    );
};

const ConnectedEditCategoriesForm = connect(state => ({
        userId: state.common.userId,
    })
)(EditCategoriesForm);

export default ConnectedEditCategoriesForm;