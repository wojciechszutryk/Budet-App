import React, {useState} from 'react';
import ListItem from "./ListItem";
import {connect} from "react-redux";

const SwitchList = ({categories, activeCategories}) => {
    const [activeCategoriesState, setActiveCategoriesState] = useState(activeCategories);

    const handleOnClick = (id) => {
        if (activeCategoriesState.includes(id)){
            const index = activeCategoriesState.indexOf(id);
            const copy = [...activeCategoriesState];
            copy.splice(index, 1);
            setActiveCategoriesState(copy);
        }
        else {
            const copy = [...activeCategoriesState];
            setActiveCategoriesState([...copy, id]);
        }
    }

    const categoriesList = categories.map(category =>
        <ListItem
            key={category.id+category.name+Math.random()*100}
            category={category}
            handleOnClick={() => handleOnClick(category.id)}
            isActive={activeCategoriesState.includes(category.id)}
        />
    );
    return (
        <>
            {categoriesList}
        </>
    );
};

const mapStateToProps = state => ({
    activeCategories: state.budget.activeCategories,
});

export default connect(mapStateToProps)(SwitchList);
