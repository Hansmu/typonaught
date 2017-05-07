import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Panel, Accordion, Table } from 'react-bootstrap';

import { getPlayerKey, createLobby, getRooms, joinRoom , getHighScores} from '../actions';
import { getPlayerId } from '../../utils/ui-utils';

class Lobbies extends Component {

    render() {

        return (
            <div>

            </div>
        );
    };

}

const mapStateToProps = (state) => ({
    playerId: state.main.playerId,
    lobbies: state.main.lobbies || [],
    highScores: state.main.highScores || []
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(Lobbies);
