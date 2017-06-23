import React from "react";
import  {Vignette} from "./vignette";
import { Song } from "./song";
import _ from "lodash";
import classNames from "classnames";
import superAgent from "superagent";
let jsonp = require('superagent-jsonp');



export class AlbumList extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            "tracks": []
        }
    }


    handleClick (obj){
        this.getTracks(obj);
        obj.isVisible = (obj.isVisible) ? !obj.isVisible : true;
    }  
    

    getTracks(data){
        superAgent.get(data.tracklist+"&output=jsonp")
        .set('Accept', 'application/json')
        .use(jsonp({timeout: 6000}))
        .end((err, res) => {
           if(res && res.body.data)
            {   
                this.setState({tracks: res.body.data});
            } else {
                console.log("Erreur dans la requete des chansons" , err);
            }        
        });
    }

    getAlbum(songs){

        songs.map((song, i) => {

            superAgent("http://localhost:8081/api/download/"+song.id)
                .end((err, res) =>{
                    console.log(res);
                });
        });
    }


    renderList (type) {  
        return  this.props.listeAlbum.map((data, i)=>{

            let classNameSong = classNames({
                "song-container": true,
                "hidden" : !data.isVisible
            });

            let classNameAlbumItem = classNames({
                "album-item" : true
            });
            
            return (
                <div key={data.id}>
                    <div className={classNameAlbumItem} onClick={ ()=> { this.handleClick(data)} }>
                        <Vignette 
                            id={data.id}
                            picture={data.cover_small} 
                            libelle={data.title}
                            active={data.isVisible}
                        /> 
                        
                        { (this.state.tracks) ? <div className={classNameSong} ><Song tracks={this.state.tracks}  dzDl={ () => {this.getAlbum(this.state.tracks)} }/></div> : <div /> }
                    </div>
                    
                </div >
            );
        });
    }

    render() {
        console.log("rendu des albums")
        return (
            <div className="album-container">                
                <h2>Albums ({this.props.listeAlbum.length}) </h2>
                {this.renderList("album")}
            </div>
        )
    }    
}

