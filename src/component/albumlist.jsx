import React from "react";
import  {Vignette} from "./vignette";
import { Song } from "./song";
import _ from "lodash";
import classNames from "classnames";

export class AlbumList extends React.Component {


    constructor(props){
        super(props);

        this.initialize();
    }

    initialize(){
        let albums = _.cloneDeep(this.props.listeAlbum);
        albums.map((data, i)=>{
            _.merge(data, { isVisible: false });
        });

         this.state = {
            listeAlbum : albums
        } 
    }

    handleClick (id){
        let albums = _.cloneDeep(this.state.listeAlbum);
        albums.map((data, i)=>{
            if( data.id == id){
                data.isVisible =!data.isVisible;
            }
        });
        this.setState({listeAlbum: albums});
    }


     renderList (type){  
        return  this.state.listeAlbum.map((data, i)=>{

            let classNameSong = classNames({
                "song-container": true,
                "hidden ": !data.isVisible 
            });

            let classNameAlbumItem = classNames({
              "album-item" : true,
              active: data.isVisible
            });

            if(data.record_type == type) {
                return (
                    <div className="album-container">
                        <div key={data.id} className={classNameAlbumItem} onClick={ () => { this.handleClick(data.id) }}>
                            <Vignette 
                                id={data.id}
                                picture={data.cover} 
                                libelle={data.title}
                                active ={data.isVisible }
                            /> 
                        </div>
                        <div className={classNameSong} >
                            <Song albumId={data.id} isVisible={data.isVisible}/>
                        </div>
                    </div >
                );
            }
        });
        
    }

    render() {
        return (
            <div>                
                <h2>Liste des Albums</h2>
                {this.renderList("album")}
            
                 {/*<div className=" spacer single-list">
                    <h2>Liste des Singles</h2>
                    {this.renderList("single")}
                </div>*/}
            </div>
        )
    }

   
    
}

