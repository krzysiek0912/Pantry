import React, { Component } from 'react';
import Button from '../../atoms/Button/Button';
import Select from '../../atoms/Select/Select';
import { getOneProductRequest } from '../../../firebase';
import { withRouter } from 'react-router';
class FormProduct extends Component {
    state = {
        product: {
            id: null,
            productName: '',
            productCategory: 'Produkt na wagę',
            count: 0,
            minCount: 2,
            unit: 'kg',
        },
        isUpdate: false,
        isError: false,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id)
            getOneProductRequest(id, (product) => {
                this.setState((prevState, props) => ({
                    product: { ...product },
                }));
            });
    }

    handleChangeSelect = ({ target }) => {
        const { value, options } = target;
        const index = options.selectedIndex;
        const productCategory = options[index].text;
        this.setState({ product: { productCategory, unit: value } });
    };
    handleChangeInput = ({ target }) => {
        this.setState((prevState) => ({
            product: { ...prevState.product, [target.name]: target.value },
            isError: false,
        }));
    };
    handleShowModal = () => {
        this.props.toggleModal(this.state.product.id);
        this.setState({
            product: {
                id: null,
                productName: '',
            },
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('state', this.state.product);
        const { count, minCount, id, productName } = this.state.product;
        if (productName === '') {
            this.setState({
                isError: true,
            });
            return;
        }
        const { addProduct, editProduct } = this.props;
        const parseCount = parseFloat(count);
        const parseMinCount = parseFloat(minCount);
        const newProduct = {
            ...this.state.product,
            count: parseCount,
            minCount: parseMinCount,
        };
        if (!id) {
            addProduct(newProduct);
            this.setState({
                product: {
                    id: null,
                    productName: '',
                },
            });
        } else {
            editProduct(newProduct);
            this.setState(
                {
                    isUpdate: true,
                },
                () => {
                    setTimeout(() => {
                        this.setState((prevState) => ({
                            isUpdate: false,
                        }));
                    }, 2000);
                },
            );
        }
    };

    render() {
        const { product, isUpdate, isError } = this.state;
        const { id, productName, count, minCount, unit } = product;
        return (
            <form className="w-full" onSubmit={this.handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-12">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="productName"
                        >
                            Nazwa Produktu
                            {isError && (
                                <small className="text-red-600 text-xs italic">
                                    {'    '}Wpisz nazwę produkt
                                </small>
                            )}
                        </label>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                                isError && 'border-red-500'
                            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            id="productName"
                            name="productName"
                            type="text"
                            onChange={this.handleChangeInput}
                            value={productName}
                            placeholder="np. Mąka"
                        />
                        <Button type="submit">{id ? 'Zapisz zmiany' : 'Dodaj Produkt'} </Button>

                        {id ? (
                            <Button color="red" onClick={this.handleShowModal}>
                                Usuń{' '}
                            </Button>
                        ) : null}
                        {isUpdate && (
                            <p className="text-green-600 text-xs italic">
                                Produkt został zaktualizowany
                            </p>
                        )}
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
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(FormProduct);
