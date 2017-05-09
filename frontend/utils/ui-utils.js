
export const getPlayerId = () => {
    return window.localStorage.getItem('player-key');
};

export const getLobbyId = () => {
    return window.localStorage.getItem('lobby-key');
};

export const getUsername = () => {
    return window.localStorage.getItem('username');
};

export const setUsername = (username) => {
    window.localStorage.setItem('username', username);
};
