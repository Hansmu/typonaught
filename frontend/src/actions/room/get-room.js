import { CREATE_LOBBY, GET_ROOMS, JOIN_ROOM, GET_ROOM, DETERMINE_WINNER, SET_USER_READY, GET_HIGH_SCORES, GET_GAME_SCORES } from '../types';
import { postRequest, externalGetRequest, getRequest } from '../../../utils/request-utils';
import { getPlayerId } from '../../../utils/ui-utils';


function generateText() {
    return externalGetRequest('http://www.randomtext.me/api/gibberish/p-20/100-100');
}

function generateRoom() {
    return generateText()
        .then(response => {
            return postRequest('room/start-room', {
                playerIdentifier: getPlayerId(),
                typingText: response.data.text_out
            });
        });
}

export function createLobby(push) {
    return {
        type: CREATE_LOBBY,
        payload: generateRoom(),
        onSuccess: lobbyId =>  {
            push(`room/${lobbyId}`);
        }
    };
}

export function getRooms() {
    return {
        type: GET_ROOMS,
        payload: getRequest('room/rooms')
    };
}

export function getRoom(roomId) {
    return {
        type: GET_ROOM,
        payload: getRequest('room/' + roomId)
    };
}

export function joinRoom(roomIdentifier, push) {
    return {
        type: JOIN_ROOM,
        payload: postRequest('room/player-ready', {
            playerIdentifier: getPlayerId(),
            roomIdentifier
        }),
        onSuccess: roomIdentifier => {
            push(`room/${roomIdentifier}`)
        }
    };
}

export function determineWinner(roomIdentifier, isWordCorrect, timeTaken) {
    return {
        type: DETERMINE_WINNER,
        payload: postRequest('room/submit-result', {
            roomIdentifier, isWordCorrect, timeTaken,
            userIdentifier: getPlayerId()
        })
    };
}


export function setUserReady(roomIdentifier) {
    return {
        type: SET_USER_READY,
        payload: postRequest('room/player-ready', {
            playerIdentifier: getPlayerId(),
            roomIdentifier
        }),
    };
}

export function getHighScores() {
    return {
        type: GET_HIGH_SCORES,
        payload: getRequest('room/high-scores')
    };
}

export function getGameScores(roomIdentifier) {
    return {
        type: GET_GAME_SCORES,
        payload: getRequest(`room/${roomIdentifier}/scores`)
    };
}