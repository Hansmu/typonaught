import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Panel, Accordion, Table, Glyphicon, Row, Col } from 'react-bootstrap';

import { getPlayerKey, createLobby, getRooms, joinRoom , getHighScores} from '../actions';
import { getPlayerId, getLobbyId } from '../../utils/ui-utils';

import '../../style/animations/round-button.css';

class Homepage extends Component {

    constructor(props) {
        super(props);

        this.renderCreateLobbyButton = this.renderCreateLobbyButton.bind(this);
    }

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
                    <th/>
                </tr>
            </thead>
        );

        return (
            <Table striped responsive condensed hover>
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
            <Table striped responsive condensed hover>
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

    renderCreateLobbyButton() {
        return (
            <Row>
                <Col md={12} style={{marginBottom: '20px', marginTop: '20px'}}>
                    <div className="round-button col-centered"
                         onClick={() => this.props.dispatch(createLobby(this.props.router.push))}>
                        <Glyphicon glyph="plus" style={{fontSize: '50px', color: 'white', marginTop: '23px', marginLeft: '26px'}}/>
                    </div>
                </Col>
            </Row>
        );
    }

    render () {
        return (
            <div>
                { this.renderCreateLobbyButton() }
                    <Panel header={<h3>Lobbies</h3>} eventKey="1">
                        { this.createLobbyList(this.props.lobbies) }
                    </Panel>
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
