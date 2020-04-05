import MessageBox from '../../atoms/MessageBox/MessageBox';

import React, { Component } from 'react';

class UpdateInfo extends Component {
    state = {
        isUpdated: true,
        timeToUpdate: 20000,
        lastUpdate: null,
    };
    getNextUpdate = () => {
        const { lastUpdate, timeToUpdate } = this.props;
        const nextUpdate = new Date(lastUpdate + timeToUpdate);
        return nextUpdate;
    };

    componentDidMount() {
        this.setState({
            timeToUpdate: this.props.timeToUpdate,
            lastUpdate: this.props.lastUpdate,
        });
        const newData = new Date();
        const nextUpdate = new Date(this.getNextUpdate());
        const isUpdated = newData < nextUpdate;
        if (this.state.isUpdated !== isUpdated) this.setState({ isUpdated: false });
    }

    render() {
        const { hideAlert, lastUpdate } = this.props;
        const nextUpdate = this.getNextUpdate();

        const lastUpdateString = new Date(lastUpdate).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        const nextUpdateString = new Date(nextUpdate).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return this.state.isUpdated ? (
            <MessageBox color="green" onClick={hideAlert}>
                Ostatnia aktualizacja miała miejsce:{' '}
                <strong className="font-bold">{lastUpdateString}</strong>.<br />
                <strong className="font-bold">
                    <br />
                    Aplikacja nie wymaga aktualizacji
                </strong>
                . <br />
                Następna aktualizacja wymagana przed{' '}
                <strong className="font-bold">{nextUpdateString}</strong>.
            </MessageBox>
        ) : (
            <MessageBox onClick={hideAlert}>
                Ostatnia aktualizacja miała miejsce:{' '}
                <strong className="font-bold">{lastUpdateString}</strong>. Sprawdź czy lista jest
                aktualna.
            </MessageBox>
        );
    }
}

export default UpdateInfo;
