import React, {useState} from 'react';
import ListItem from "./ListItem";

const SwitchList = ({categories}) => {
    const [activeCategory, setActiveCategory] = useState();

    const categoriesList = categories.map(category =>
        <ListItem
            key={category.id}
            category={category}
            handleOnClick={setActiveCategory}
            isActive={activeCategory === category.id}
        />
    );

    return (
        <>
            {categoriesList}
        </>
    );
};

export default SwitchList;
