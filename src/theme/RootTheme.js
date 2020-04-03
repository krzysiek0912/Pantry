import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from '../components/ItemList/ItemList';
import Heading from '../components/atoms/Heading/Heading';
import Button from '../components/atoms/Button/Button';
const list = [
    {
        id: 1,
        productName: 'Mąka',
        productCategory: 'Produkty suche',
        count: 1,
        minCount: 2,
        unit: 'kg',
    },
    {
        id: 2,
        productName: 'Ryż',
        productCategory: 'Produkty suche',
        count: 2,
        minCount: 2,
        unit: 'kg',
    },
    {
        id: 3,
        productName: 'Woda gazowana',
        productCategory: 'Napoje',
        count: 5,
        minCount: 2,
        unit: 'l',
    },
];
const RootTheme = () => {
    return (
        <>
            <Heading>Lista Produktów</Heading>
            <Link to={'/add'}>
                <Button>Dodaj nowy produkt</Button>
            </Link>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <ItemList items={list}></ItemList>
                </div>
            </div>
        </>
    );
};

export default RootTheme;
