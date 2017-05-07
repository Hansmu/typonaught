import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { Button, Table, Glyphicon, Col, Row } from 'react-bootstrap';

import { getRoom, determineWinner, setUserReady, getGameScores } from '../actions';

import '../../style/animations/loading.css';

let initialRender = true;
let isSubmitted = false;
let isNewRoundClicked = true;

let startTime = 0;
let wordStarted = false;

class TypingRoom extends Component {

    componentWillMount() {
        this.props.dispatch(getRoom(this.props.params.roomId));

        this.state = { enteredWord: '' };
        window.setInterval(() => this.props.dispatch(getRoom(this.props.params.roomId)), 500);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendUserReady = this.sendUserReady.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.renderTextArea = this.renderTextArea.bind(this);
        this.renderGameScores = this.renderGameScores.bind(this);
        this.renderNewMatchButton = this.renderNewMatchButton.bind(this);
    }

    componentWillUnmount() {
        initialRender = true;
        isSubmitted = false;
        isNewRoundClicked = true;
        wordStarted = false;
    }

    showWaitingForPlayer() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Waiting for other player</h1>
                    <div className="loading-animation col-centered"/>
                </Col>
            </Row>
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        const isWordCorrect = this.props.room.activeWord === this.state.enteredWord;
        const timeTaken = new Date().getTime() - startTime;

        this.props.dispatch(determineWinner(this.props.params.roomId, isWordCorrect, timeTaken));

        this.setState({enteredWord: ''});
        isSubmitted = true;
    }

    renderResults() {
        if (!initialRender && isSubmitted && this.props.isWinner) {
            return (
                <div>
                    <p>You have won</p>
                </div>);
        }

        if (!initialRender && isSubmitted && !this.props.isWinner) {
            return (
                <div>
                    <p>You have lost</p>
                </div>
            );
        }

        return <div/>;
    }

    sendUserReady() {
        isSubmitted = false;
        this.props.dispatch(setUserReady(this.props.params.roomId));
    }

    renderNewMatchButton() {
        return (
            <Button onClick={this.sendUserReady}>
                Ready For New Match
            </Button>
        );
    }

    setStartTime() {
        const isWaiting = !this.props.room.playerOneReady || !this.props.room.playerTwoReady;

        if (!isWaiting && !isSubmitted && wordStarted) {
            startTime = new Date().getTime();
            wordStarted = false;
        }

        if (isWaiting) {
            wordStarted = true;
        }
    }

    renderGameScores() {
        const gameScoreRows = this.props.gameScores.map(gameScore => {
            const green = '#5cb85c';
            const red = '#d9534f';

            const style = {
                backgroundColor: gameScore.victory ? green : red
            };

            return (
                <tr key={gameScore.id} style={style}>
                    <td>
                        <Glyphicon glyph={gameScore.victory ? 'ok' : 'remove'} style={{color: 'white'}}/>
                    </td>
                    <td>{gameScore.word}</td>
                    <td>{gameScore.timeSpent}</td>
                </tr>
            );
        });

        return (
            <Table striped responsive condensed hover>
                <thead>
                <tr>
                    <th>Victory</th>
                    <th>Word</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                    { gameScoreRows }
                </tbody>
            </Table>
        );
    }

    renderTextArea() {
        const isWaiting = !this.props.room.playerOneReady || !this.props.room.playerTwoReady;

        if (!isWaiting && !isSubmitted) {
            return (
                <div>
                    Current word to type: { this.props.room.activeWord }
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={event => this.setState({enteredWord: event.target.value})}
                               value={this.state.enteredWord}
                               name="enteredWord"/>
                    </form>
                </div>
            );
        }

        return this.renderGameScores();
    }

    render () {
        const isWaiting = !this.props.room.playerOneReady || !this.props.room.playerTwoReady;

        if (!isWaiting) {
            initialRender = false;
        }

        this.setStartTime();
        return (
            <div>
                { this.renderResults() }
                { isSubmitted && isWaiting && this.renderNewMatchButton() }
                { this.renderTextArea() }

                { ((!initialRender && isSubmitted && !isWaiting) || (!isSubmitted && isWaiting && isNewRoundClicked)) && this.showWaitingForPlayer() }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.main.playerId,
    room: state.main.room || { playerTwoReady: false },
    isWinner: state.main.isWinner,
    gameScores: state.main.gameScores || []
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(TypingRoom);
