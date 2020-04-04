import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button/Button';

const Header = ({ match }) => {
    console.log(match.path);
    return (
        <>
            {match.path !== '/' && (
                <Link to={'/'}>
                    <Button>Wróć do listy</Button>
                </Link>
            )}
            {match.path !== '/add' && (
                <Link to={'/add'}>
                    <Button>Dodaj nowy produkt</Button>
                </Link>
            )}
            {match.path !== '/shoplist' && (
                <Link to={'/shoplist'}>
                    <Button>Lista zakupów</Button>
                </Link>
            )}
            {match.path !== '/setting' && (
                <Link to={'/setting'}>
                    <Button color="orange">Ustawienia</Button>
                </Link>
            )}
        </>
    );
};

export default withRouter(Header);
