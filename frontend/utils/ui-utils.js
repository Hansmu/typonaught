
export const getPlayerId = () => {
    return window.localStorage.getItem('player-key');
};

export const getLobbyId = () => {
    return window.localStorage.getItem('lobby-key');
};
