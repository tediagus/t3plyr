import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';

import { PlayList } from "./component/playlist";


const render = (Component) => {

    ReactDOM.render( 
        <AppContainer>
            <Component />
        </AppContainer>
    , document.getElementById("app"));
}

render(PlayList);

if(module.hot) {
    module.hot.accept("./component/playlist", ()=> {
        render(PlayList);        
    });
}