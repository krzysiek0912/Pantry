import React, { Component } from 'react';
import Button from '../../atoms/Button/Button';
import Select from '../../atoms/Select/Select';
import { withRouter } from 'react-router';
class FormProduct extends Component {
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
        if (product) this.setState({ ...product });
    }
    handleChangeSelect = ({ target }) => {
        const { value, options } = target;
        const index = options.selectedIndex;
        const productCategory = options[index].text;
        this.setState({ productCategory, unit: value });
    };
    handleChangeInput = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const count = parseFloat(this.state.count);
        const minCount = parseFloat(this.state.minCount);
        const newItem = {
            ...this.state,
            count,
            minCount,
        };
        this.props.addItem(newItem);
    };

    render() {
        const { id, productName, count, minCount, unit } = this.state;
        return (
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
                            onChange={this.handleChangeInput}
                            value={productName}
                            placeholder="np. Mąka"
                        />
                        <Button type="submit">{id ? 'Zapisz zmiany' : 'Dodaj Produkt'} </Button>
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
                            id="minCount"
                            name="minCount"
                            type="number"
                            value={minCount}
                            onChange={this.handleChangeInput}
                        />
                        {/* <p className="text-gray-600 text-xs italic">
                                Some tips - as long as needed
                            </p> */}
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(FormProduct);
