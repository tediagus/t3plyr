import React from "react";
import { Vignette } from "./vignette";
import superAgent from "superagent";
import jsonp from "superagent-jsonp";

export class ArtistList extends React.Component {

   renderArtiste (){       
        let html = this.props.listeArtiste.map((data, k )=>{
            return (
                <Vignette 
                    search={this.props.searchAlbum.bind(this, data.id)} 
                    key={data.id} 
                    id={data.id}
                    picture ={data.picture} 
                    libelle = {data.name} 
                />
            )         
        
        })
        return html;
    }

    render() {
        return (
            <div >
                <h2>Liste des Artistes({this.props.listeArtiste.length})</h2>
                <div className="grid-6-small-2 artiste-list  ">
                    {this.renderArtiste()}
                    <span className="spacer" />
                </div>
            </div>
        )
    }
}
