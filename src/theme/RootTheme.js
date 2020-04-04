import React from 'react';
import Header from '../components/molecules/Header/Header';

const RootTheme = ({ children }) => {
    return (
        <>
            <Header />
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    );
};

export default RootTheme;
