import React from 'react';
import AppContext from '../../../context';
import SingleItem from '../../molecules/SingleItem/SingleItem';
const ShopList = () => {
    return (
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Produkt
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Ilość
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Braki
                    </th>
                </tr>
            </thead>
            <tbody>
                <AppContext.Consumer>
                    {(context) => {
                        return context.products
                            .filter(({ count, minCount }) => count < minCount)
                            .map((product) => (
                                <SingleItem
                                    key={product.id}
                                    product={product}
                                    removeItem={context.removeItem}
                                    isShopList
                                ></SingleItem>
                            ));
                    }}
                </AppContext.Consumer>
            </tbody>
        </table>
    );
};

export default ShopList;
