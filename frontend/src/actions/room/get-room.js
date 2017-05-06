import { CREATE_LOBBY, GET_ROOMS } from '../types';
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
