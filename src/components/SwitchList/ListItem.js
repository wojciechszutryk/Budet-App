import React from 'react';

const ListItem = ({category, handleOnClick, isActive}) => {
    return (
        <div>
            <category.Trigger onClick={handleOnClick}/>
            {isActive && category.children}
        </div>
    );
};

export default ListItem;
