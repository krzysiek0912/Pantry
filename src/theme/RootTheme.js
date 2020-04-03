import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../components/atoms/Heading/Heading';
import Button from '../components/atoms/Button/Button';

const RootTheme = ({ children }) => {
    return (
        <>
            <Heading>Lista Produktów</Heading>
            <Link to={'/'}>
                <Button>Wróć do listy</Button>
            </Link>
            <Link to={'/add'}>
                <Button>Dodaj nowy produkt</Button>
            </Link>
            <Link to={'/shoplist'}>
                <Button>Lista zakupów</Button>
            </Link>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    );
};

export default RootTheme;
