import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Panel, Table, Glyphicon, Row, Col, FormControl } from 'react-bootstrap';

import { getPlayerKey, createLobby, getRooms, joinRoom , getHighScores} from '../actions';
import { getPlayerId, getLobbyId, getUsername, setUsername } from '../../utils/ui-utils';

import '../../style/animations/round-button.css';

const centered = { textAlign: 'center' };

class Homepage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderUsernameField = this.renderUsernameField.bind(this);
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

    handleSubmit() {
        setUsername(this.state.username);
    }

    createLobbyList(lobbies) {
        if (lobbies.length == 0) {
            return (
                <div style={centered}>
                    <h6>There appear to be no lobbies yet</h6>
                    <h6>Click on the button to add a lobby</h6>
                </div>
            );
        }

        const lobbyRows = lobbies.map(lobby => {
            const isJoiningAllowed = !lobby.playerOneReady || !lobby.playerTwoReady;

            return (
                <tr key={lobby.id}>
                    <td style={centered}>{lobby.id}</td>
                    <td style={centered}>{lobby.roomIdentifier}</td>
                    <td style={centered}>
                        <Button disabled={!isJoiningAllowed}
                                bsStyle="success"
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
                    <th style={centered}>#</th>
                    <th style={centered}>Room Identifier</th>
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
        if (this.props.highScores.length <= 0) {
            return (
                <div style={centered}>
                    <h6>There are no high scores yet</h6>
                    <h6>Join a lobby and play to create some.</h6>
                </div>
            );
        }

        const tableRows = this.props.highScores.map(highScore => {
            return (
                <tr key={highScore.id}>
                    <td style={centered}>{highScore.username ? highScore.username : highScore.playerIdentifier}</td>
                    <td style={centered}>{highScore.victories}</td>
                </tr>
            );
        });

        return (
            <Table striped responsive condensed hover>
                <thead>
                    <tr>
                        <th style={centered}>Player Identifier</th>
                        <th style={centered}>Player Victories</th>
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
                <Col md={12} style={{marginBottom: '20px', marginTop: '90px'}}>
                    <div className="round-button col-centered"
                         onClick={() => this.props.dispatch(createLobby(this.props.router.push))}>
                        <Glyphicon glyph="plus"
                                   style={{fontSize: '50px', color: 'white', marginTop: '23px', marginLeft: '26px'}}/>
                    </div>
                </Col>
            </Row>
        );
    }

    renderUsernameField() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Row style={{marginTop: '100px'}}>
                        <Col md={3}/>
                        <Col md={6}>
                            <FormControl
                                style={{...centered, height: '60px'}}
                                name="username"
                                type="text"
                                value={this.state.username}
                                placeholder="Enter your username"
                                onChange={event => this.setState({username: event.target.value})}/>
                        </Col>
                        <Col md={3}/>
                    </Row>
                </form>
            </div>
        );
    }

    render () {
        if (!getUsername()) {
            return this.renderUsernameField();
        }

        return (
            <div>
                { this.renderCreateLobbyButton() }
                <Row>
                    <Col md={8}>
                        <Panel bsStyle="success"
                               header={<h1>Lobbies</h1>}
                               eventKey="1">
                            { this.createLobbyList(this.props.lobbies) }
                        </Panel>
                    </Col>
                    <Col md={4}>
                        <Panel bsStyle="success"
                               header={<h3>High Scores</h3>}
                               eventKey="1">
                            { this.createHighScoreTable() }
                        </Panel>
                    </Col>
                </Row>
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
