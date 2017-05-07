import { GET_PLAYER_KEY, CREATE_LOBBY, GET_ROOMS, GET_ROOM, JOIN_ROOM, DETERMINE_WINNER, GET_HIGH_SCORES, GET_GAME_SCORES } from '../actions/types';

const INITIAL_STATE = { examples: [], helloWorldMessage: '' };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_PLAYER_KEY:
            window.localStorage.setItem('player-key', action.payload.data.data);
            return { ...state, playerId: action.payload.data.data };
        case CREATE_LOBBY:
            action.payload.then(response => {
                const lobbyId = response.data.data;
                window.localStorage.setItem('lobby-key', lobbyId);
                action.onSuccess(lobbyId);
            });
            return {...state };
        case GET_ROOMS:
            return { ...state, lobbies: action.payload.data.data };
        case GET_ROOM:
            return {...state, room: action.payload.data.data};
        case JOIN_ROOM:
            action.payload.then(response => {
                action.onSuccess(response.data.data);
            });
            return {...state};
        case DETERMINE_WINNER:
            return {...state, isWinner: action.payload.data.data.iaWinner, gameScores: action.payload.data.data.rounds};
        case GET_HIGH_SCORES:
            return {...state, highScores: action.payload.data.data};
        case GET_GAME_SCORES:
            return {...state, gameScores: action.payload.data.data};
        default:
            return state;
    }
}
