import React from 'react';
import { withRouter } from 'react-router';
import AppContext from '../../../context';
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import UpdateInfo from '../UpdateInfo/UpdateInfo';

const Header = ({ match }) => {
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
            <AppContext.Consumer>
                {(context) => {
                    const { lastUpdate, timeToUpdate, showAlert, hideAlert } = context;
                    return lastUpdate && showAlert ? (
                        <UpdateInfo
                            lastUpdate={lastUpdate}
                            hideAlert={hideAlert}
                            timeToUpdate={timeToUpdate}
                        />
                    ) : null;
                }}
            </AppContext.Consumer>
        </>
    );
};

export default withRouter(Header);
