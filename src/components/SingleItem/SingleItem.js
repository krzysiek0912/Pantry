import React, { Component } from 'react';
import Button from '../atoms/Button/Button';
import { Link } from 'react-router-dom';

class SingleItem extends Component {
    render() {
        const { id, productName, count, unit, minCount } = this.props.item;
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
                    {`${minCount}${unit}`}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <Link to={`/edit/${id}`}>
                        <Button>Edytuj</Button>
                    </Link>
                    <button onClick={() => console.log('usuń')}>Usuń</button>
                    <Button onClick={() => console.log('usuń')} color="red">
                        Usuń
                    </Button>
                </td>
            </tr>
        );
    }
}

export default SingleItem;
