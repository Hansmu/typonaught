import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Panel, Accordion, Table } from 'react-bootstrap';

import { getPlayerKey, createLobby, getRooms, joinRoom } from '../actions';
import { getPlayerId, getLobbyId } from '../../utils/ui-utils';

class Homepage extends Component {

    componentWillMount() {
        const playerKey = getPlayerId();
        this.props.dispatch(getRooms())

        if (!playerKey) {
            this.props.dispatch(getPlayerKey());
        }

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

    render () {
        const playerKey = getPlayerId();
        const lobbyId = getLobbyId();

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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.main.playerId,
    lobbies: state.main.lobbies || []
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(Homepage);
