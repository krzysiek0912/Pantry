import React, { Component } from 'react';
import Button from '../../atoms/Button/Button';
import { Link } from 'react-router-dom';
class SingleItem extends Component {
    handleShowModal = () => {
        this.props.toggleModal(this.props.item.id);
    };
    state = {
        show: true,
    };
    render() {
        const { item, isShopList } = this.props;
        const { id, productName, count, unit, minCount } = item;
        return (
            <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{productName}</p>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <p className="text-gray-900 whitespace-no-wrap">{`${count}${unit}`}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {isShopList ? `${minCount - count}${unit}` : `${minCount}${unit}`}
                </td>
                {!isShopList && (
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <Link to={`/edit/${id}`}>
                            <Button>Edytuj</Button>
                        </Link>
                        <Button onClick={this.handleShowModal} color="red">
                            Usuń
                        </Button>
                    </td>
                )}
            </tr>
        );
    }
}

export default SingleItem;
