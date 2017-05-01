import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getPlayerKey, createLobby } from '../actions';
import { getPlayerId, getLobbyId } from '../../utils/ui-utils';

class TypingRoom extends Component {

    render () {
        return (
            <div>
                Typing room
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.main.playerId
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(TypingRoom);
