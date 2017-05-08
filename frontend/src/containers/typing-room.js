import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { Button, Table, Glyphicon, Col, Row, FormControl } from 'react-bootstrap';

import { getRoom, determineWinner, setUserReady, getGameScores } from '../actions';

import '../../style/animations/loading.css';
import '../../style/animations/round-button.css'
import '../../style/animations/lose.css'
import '../../style/animations/win.css'

let initialRender = true;
let isSubmitted = false;
let isNewRoundClicked = true;

let startTime = 0;
let wordStarted = false;

const centered = { textAlign: 'center' };

class TypingRoom extends Component {

    componentWillMount() {
        this.props.dispatch(getRoom(this.props.params.roomId));

        this.state = {
            enteredWord: '',
            timeTaken: 0
        };
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
                    <h1 style={{textAlign: 'center'}}>Waiting for other player</h1>
                </Col>
                <Col md={9}>
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
                <div className="win-animation col-centered"/>);
        }

        if (!initialRender && isSubmitted && !this.props.isWinner) {
            return (
                <div className="lose-animation col-centered"/>
            );
        }

        return <div className="round-button-red col-centered"/>;
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
        const isWaiting = !this.props.room.playerOneReady || !this.props.room.playerTwoReady;

        if (this.props.gameScores.length <= 0) {
            return <div/>;
        }

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

        if (!(!isWaiting && !isSubmitted)) {
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
    }

    renderTextArea() {
        const isWaiting = !this.props.room.playerOneReady || !this.props.room.playerTwoReady;
        const timeTakenInSeconds = parseInt((new Date().getTime() - startTime) / 1000);

        if (!isWaiting && !isSubmitted) {
            return (
                <div>
                    <h4 style={{...centered, marginTop: '60px', marginBottom: '60px'}}>
                        Current word to type
                    </h4>
                    <h1 style={{...centered, marginTop: '40px', marginBottom: '40px'}}>
                        { this.props.room.activeWord }
                    </h1>

                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={3}/>
                            <Col md={6}>
                                <FormControl
                                    style={{...centered, height: '60px'}}
                                    name="enteredWord"
                                    type="text"
                                    value={this.state.enteredWord}
                                    placeholder="Type the word fast to beat your opponent!"
                                    onChange={event => this.setState({enteredWord: event.target.value})}/>
                            </Col>
                            <Col md={3}/>
                        </Row>
                    </form>

                    <h3 className="white-text-black-outline"
                        style={{...centered, marginTop: '40px', marginBottom: '40px'}}>
                        { timeTakenInSeconds } s
                    </h3>
                </div>
            );
        }
    }

    render () {
        const isWaiting = !this.props.room.playerOneReady || !this.props.room.playerTwoReady;

        if (!isWaiting) {
            initialRender = false;
        }

        this.setStartTime();
        return (
            <div>
                <Row>
                    { this.renderResults() }
                </Row>
                <Row>
                    <Col md={7}>
                        { this.renderGameScores() }
                    </Col>
                    <Col md={5}>
                        { isSubmitted && isWaiting && this.renderNewMatchButton() }
                    </Col>
                </Row>

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
