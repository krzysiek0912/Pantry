import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/atoms/Button/Button';
import Heading from '../components/atoms/Heading/Heading';
import Select from '../components/atoms/Select/Select';

class SingleProductTheme extends Component {
    state = {
        id: null,
        productName: '',
        productCategory: 'Produkt na wagę',
        count: 0,
        minCount: 2,
        unit: 'kg',
    };

    componentDidMount() {
        const { product } = this.props;
        if (product)
            this.setState(prevState => {
                return { ...product };
            });
    }
    handleChangeSelect = ({ target }) => {
        const { value, options } = target;
        const index = options.selectedIndex;
        const productCategory = options[index].text;
        this.setState({ productCategory, unit: value });
    };
    handleChangeInput = ({ target }) => {
        // const { name, type } = target;
        const { name } = target;
        let { value } = target;

        // if (type === 'number') {
        //     console.log(value);
        //     if (value.length === 0) {
        //         this.setState({ [name]: value });
        //     }
        //     value = parseFloat(value);

        //     if (isNaN(value)) return;
        // }

        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log('Wysłanie formularza');
    };

    render() {
        const { id, productName, count, minCount, unit } = this.state;
        return (
            <>
                <Heading>{id ? 'Edytuj' : 'Dodaj'} Produkt</Heading>
                <Link to={'/'}>
                    <Button>Wróć do listy</Button>
                </Link>
                <form className="w-full" onSubmit={this.handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-12">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="productName"
                            >
                                Nazwa Produktu
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="productName"
                                name="productName"
                                type="text"
                                onChange={this.handleChange}
                                defaultValue={productName}
                                placeholder="np. Mąka"
                            />
                            {/* <p className="text-red-500 text-xs italic">
                                Please fill out this field.
                            </p> */}
                            <Button type="submit">{id ? 'Edytuj' : 'Dodaj'} </Button>
                        </div>
                        <div className="w-full md:w-1/4 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="productCategory"
                            >
                                Kategoria Produktu
                            </label>
                            <Select value={unit} changeSelect={this.handleChangeSelect}></Select>
                        </div>
                        <div className="md:w-1/4 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Ilośc
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="count"
                                name="count"
                                type="number"
                                value={count}
                                onChange={this.handleChangeInput}
                            />
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Minimalna ilośc
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="count"
                                name="count"
                                type="number"
                                value={minCount}
                                onChange={this.handleChangeInput}
                            />
                            {/* <p className="text-gray-600 text-xs italic">
                                Some tips - as long as needed
                            </p> */}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6"></div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3"></div>
                    </div>
                </form>
            </>
        );
    }
}

export default SingleProductTheme;
