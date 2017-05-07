import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Panel, Accordion, Table } from 'react-bootstrap';

import { getPlayerKey, createLobby, getRooms, joinRoom , getHighScores} from '../actions';
import { getPlayerId, getLobbyId } from '../../utils/ui-utils';

class Homepage extends Component {

    componentWillMount() {
        const playerKey = getPlayerId();
        this.props.dispatch(getRooms());

        if (!playerKey) {
            this.props.dispatch(getPlayerKey());
        }

        this.props.dispatch(getHighScores());
        window.setInterval(() => this.props.dispatch(getRooms()), 5000);
    }

    joinLobby(roomIdentifier) {
        this.props.dispatch(joinRoom(roomIdentifier, this.props.router.push));
    }

    createLobbyList(lobbies) {
        const lobbyRows = lobbies.map(lobby => {
            const isJoiningAllowed = !lobby.playerOneReady || !lobby.playerTwoReady;

            return (
                <tr key={lobby.id}>
                    <td>{lobby.id}</td>
                    <td>{lobby.roomIdentifier}</td>
                    <td>{lobby.typingText.substring(0, 20)}</td>
                    <td>
                        <Button disabled={!isJoiningAllowed}
                                onClick={() => this.joinLobby(lobby.roomIdentifier)}>
                            Join
                        </Button>
                    </td>
                </tr>
            );
        });

        const lobbyHeaders = (
            <thead>
                <tr>
                    <th>#</th>
                    <th>Room Identifier</th>
                    <th>Text Example</th>
                    <th/>
                </tr>
            </thead>
        );

        return (
            <Table striped bordered condensed hover>
                { lobbyHeaders }
                <tbody>
                    { lobbyRows }
                </tbody>
            </Table>
        );
    }

    createHighScoreTable() {
        const tableRows = this.props.highScores.map(highScore => {
            return (
                <tr key={highScore.id}>
                    <td>{highScore.playerIdentifier}</td>
                    <td>{highScore.victories}</td>
                </tr>
            );
        });

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Player Identifier</th>
                        <th>Player Victories</th>
                    </tr>
                </thead>
                <tbody>
                    { tableRows }
                </tbody>
            </Table>
        );
    }

    render () {
        return (
            <div>
                <Button onClick={() => this.props.dispatch(createLobby(this.props.router.push))}>
                    Create lobby
                </Button>
                <Accordion>
                    <Panel header="Lobbies" eventKey="1">
                        { this.createLobbyList(this.props.lobbies) }
                    </Panel>
                </Accordion>
                { this.createHighScoreTable() }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.main.playerId,
    lobbies: state.main.lobbies || [],
    highScores: state.main.highScores || []
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(Homepage);
