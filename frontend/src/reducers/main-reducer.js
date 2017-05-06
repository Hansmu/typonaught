import { GET_PLAYER_KEY, CREATE_LOBBY, GET_ROOMS } from '../actions/types';

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
        default:
            return state;
    }
}
