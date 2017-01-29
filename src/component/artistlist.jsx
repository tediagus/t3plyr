import React from "react";
import { Vignette } from "./vignette";
import superAgent from "superagent";
import jsonp from "superagent-jsonp";

export class ArtistList extends React.Component {

   renderArtiste (){       
        let html = this.props.listeArtiste.map((data, k )=>{
            
            return (
                <Vignette searchAlbum={this.props.searchAlbum.bind(this, data.id)} 
                    key={data.id} 
                    id={data.id}
                    picture ={data.picture} 
                    libelle = { (k+1 ) + " - " + data.name} />
            )
            
        })
        return html;
    }

    render() {
        return (
            <div className="artiste-list">
             <h2>Liste des Artistes</h2>
              {this.renderArtiste()}
              <span className="spacer" />
            </div>
        )
    }


    
}
