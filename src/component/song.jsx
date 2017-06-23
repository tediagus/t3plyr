import React from "react";
import  url from "url" ;
import classNames from "classnames";

export class Song extends React.Component {
    constructor(props){
        super(props);   
    }

    fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
    renderSingle () {       
        return this.props.tracks.map((song, i )=>{
            return <li key={song.id}>{i+1} - {song.title} &nbsp; {this.fmtMSS(song.duration)}</li> 
        });
    }

    render() {
        let tracks =  this.renderSingle();
        return (<ul className="multi"> 
            {tracks} 
            <button onClick={this.props.dzDl}>Télécharger</button>
        </ul> );
    }
}
