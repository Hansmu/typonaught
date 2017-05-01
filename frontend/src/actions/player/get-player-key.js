import { GET_PLAYER_KEY } from '../types';
import { getRequest } from '../../../utils/request-utils';

export function getPlayerKey() {
    return {
        type: GET_PLAYER_KEY,
        payload: getRequest('room/generate-player-id')
    };
}
