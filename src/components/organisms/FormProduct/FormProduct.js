import React, { Component } from 'react';
import Button from '../../atoms/Button/Button';
import Select from '../../atoms/Select/Select';
import firebase from '../../../firebase';
import { withRouter } from 'react-router';

const db = firebase.firestore();
class FormProduct extends Component {
    state = {
        id: null,
        productName: '',
        productCategory: 'Produkt na wagę',
        count: 0,
        minCount: 2,
        unit: 'kg',
        isUpdate: false,
        isError: false,
    };
    timeMessage = null;
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id)
            db.collection('products')
                .where('id', '==', this.props.match.params.id)
                .get()
                .then((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => doc.data());
                    const product = data[0];
                    this.setState((prevState, props) => ({
                        ...product,
                    }));
                });
    }

    handleChangeSelect = ({ target }) => {
        const { value, options } = target;
        const index = options.selectedIndex;
        const productCategory = options[index].text;
        this.setState({ productCategory, unit: value });
    };
    handleChangeInput = ({ target }) => {
        this.setState({ [target.name]: target.value, error: false });
    };
    handleShowModal = () => {
        this.props.toggleModal(this.state.id);
        this.setState({
            id: null,
            productName: '',
            productCategory: 'Produkt na wagę',
            count: 0,
            minCount: 2,
            unit: 'kg',
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        const { count, minCount, id, productName } = this.state;
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
            ...this.state,
            count: parseCount,
            minCount: parseMinCount,
        };

        if (!id) {
            addProduct(newProduct);
            this.setState({
                id: null,
                productName: '',
                productCategory: 'Produkt na wagę',
                count: 0,
                minCount: 2,
                unit: 'kg',
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
        const { id, productName, count, minCount, unit, isUpdate, isError } = this.state;
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
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
