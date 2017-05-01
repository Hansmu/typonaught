import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Header from './containers/header';
import Homepage from './containers/homepage';
import TypingRoom from './containers/typing-room';

export default (
    <Route path="/" component={Header}>
        <IndexRoute component={Homepage} />
        <Route path="room/:roomId" components={TypingRoom}/>
    </Route>
);
