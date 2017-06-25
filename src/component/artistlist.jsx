import React from "react";
import { Vignette } from "./vignette";

export class ArtistList extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            selectedIndex : false
        }
    }

   renderArtiste (){       
        let html = this.props.listeArtiste.map((data, k )=>{
            return (
                <Vignette 
                    search={this.props.searchAlbum.bind(this,data.id, data.name)} 
                    key={data.id} 
                    id={data.id}
                    picture ={data.picture_small} 
                    libelle = {data.name} 
                />
            )         
        
        })
        return html;
    }

    render() {
        return (
            <div className="artist-list">
                <h2>Artistes({this.props.listeArtiste.length})</h2>
                <div >
                    {this.renderArtiste()}
                    <span className="spacer" />
                </div>
            </div>
        )
    }
}
