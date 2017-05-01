import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getPlayerKey, createLobby } from '../actions';
import { getPlayerId, getLobbyId } from '../../utils/ui-utils';

class Homepage extends Component {

    componentWillMount() {
        const playerKey = getPlayerId();

        if (!playerKey) {
            this.props.dispatch(getPlayerKey());
        }
    }

    render () {
        const playerKey = getPlayerId();
        const lobbyId = getLobbyId();

        return (
            <div>
                <Button onClick={this.props.dispatch(createLobby())}>
                    Create lobby
                </Button>
                <Button>
                    Join lobby
                </Button>
                Hllo { playerKey } { lobbyId }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.main.playerId
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(Homepage);
