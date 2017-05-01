import { GET_PLAYER_KEY, CREATE_LOBBY } from '../actions/types';

const INITIAL_STATE = { examples: [], helloWorldMessage: '' };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_PLAYER_KEY:
            window.localStorage.setItem('player-key', action.payload.data.data);
            return { ...state, playerId: action.payload.data.data };
        case CREATE_LOBBY:
            console.log(action.payload.data.data);
            window.localStorage.setItem('lobby-key', action.payload.data.data);
            return {...state, lobbyId: action.payload.data.data };
        default:
            return state;
    }
}
