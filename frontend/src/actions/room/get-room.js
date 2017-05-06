import { CREATE_LOBBY } from '../types';
import { postRequest } from '../../../utils/request-utils';
import { getPlayerId } from '../../../utils/ui-utils';

export function createLobby(push) {
    return {
        type: CREATE_LOBBY,
        payload: postRequest('room/start-room', { identifier: getPlayerId() }),
        onSuccess: lobbyId =>  {
            push(`room/${lobbyId}`);
        }
    };
}
