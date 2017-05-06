import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { Button } from 'react-bootstrap';

import { getPlayerKey, createLobby, getRoom, determineWinner, setUserReady } from '../actions';
import { getPlayerId, getLobbyId } from '../../utils/ui-utils';

let initialRender = true;
let isSubmitted = false;

class TypingRoom extends Component {

    componentWillMount() {
        this.props.dispatch(getRoom(this.props.params.roomId));

        this.state = { enteredWord: '' };
        window.setInterval(() => this.props.dispatch(getRoom(this.props.params.roomId)), 5000);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendUserReady = this.sendUserReady.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.renderNewMatchButton = this.renderNewMatchButton.bind(this);
    }

    componentWillUnmount() {
        initialRender = true;
        isSubmitted = false;
    }

    showWaitingForPlayer() {
        return (
            <div>
                Waiting for player
                <Loading type="bubbles" color='#e3e3e3'/>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        const isWordCorrect = this.props.room.activeWord === this.state.enteredWord;
        this.props.dispatch(determineWinner(this.props.params.roomId, isWordCorrect));

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

    render () {
        const isWaiting = !this.props.room.playerOneReady || !this.props.room.playerTwoReady;

        if (!isWaiting) {
            initialRender = false;
        }

        return (
            <div>
                { this.renderResults() }
                { !initialRender && isWaiting && this.renderNewMatchButton() }
                { initialRender && isWaiting && this.showWaitingForPlayer() }

                {
                    !isWaiting &&
                    <div>
                        Current word to type: { this.props.room.activeWord }
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={event => this.setState({enteredWord: event.target.value})}
                                   value={this.state.enteredWord}
                                   name="enteredWord"/>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playerId: state.main.playerId,
    room: state.main.room || { playerTwoReady: false },
    isWinner: state.main.isWinner
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(TypingRoom);
