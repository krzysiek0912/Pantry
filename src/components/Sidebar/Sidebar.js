import React from 'react';
import Button from '../atoms/Button/Button';
import Filter from '../atoms/Filter/Filter';
import Search from '../atoms/Search/Search';

const Sidebar = () => {
    return (
        <>
            <div class="flex flex-row mb-1 sm:mb-6">
                <Filter></Filter>
                <Search></Search>
            </div>
            <Button>Dodaj Nowy Produkt</Button>
        </>
    );
};

export default Sidebar;
