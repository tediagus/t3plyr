import React from "react";
import { Search } from "./search";
import { ArtistList } from "./artistlist";
import { AlbumList } from "./albumlist";
import { Footer } from "./footer";
import  url from "url" ;
import superAgent from "superagent";
import jsonp from "superagent-jsonp";

export class PlayList extends React.Component {
    
    deezerApiTopken ;

    constructor(props){
        super(props);
        this.state = {
            artisteName : "",
            artistList: [],
            albumList: [],
            errorMessage: ""
        };

        this.deezerApiTopken

    }

    handleSearchTextChange(e){
        this.setState({artisteName: e.target.value});
    }
    /**
     * action de soumission du formulaire
     */
    onSubmit(){
        if(this.state.artisteName){
            superAgent.get("https://api.deezer.com/search/artist?q="+this.state.artisteName+"&output=jsonp&output=jsonp&version=js-v1.0.0") //&limit=100
            .use(jsonp)
            .end((err, res) =>{
                if(res)
                {
                    this.setState({
                        artistList: res.body.data,
                        albumList: [],
                    })
                } else 
                {
                        
                }        
            });
        } else {
            this.setState({errorMessage: "Veuillez saisir un message dans le champ de recherche "});
            //TODO affiche un message d'erreur
        }
    }
    
    searchAlbum(e, id){
        superAgent.get("https://api.deezer.com/artist/"+id+"/albums&output=jsonp&output=jsonp&version=js-v1.0.0")
        .use(jsonp)
        .end((err, res) =>{
            if(res)
            {
                this.setState({albumList: res.body.data, tracks:[] })
            }            
        });
    }


    render() {
        return (
            <div >
                <Search onSubmit={this.onSubmit.bind(this)} value={this.state.artisteName} onChange={this.handleSearchTextChange.bind(this)} />
                <div className="flex-container">
                    <div className="mod w14 pam"></div>
                        <div className="flex-item-fluid pam">
                            {(this.state.errorMessage) ? <div className="warning" > {this.state.errorMessage} </div> : ""}
                            {(this.state.artistList.length) ? <ArtistList listeArtiste={this.state.artistList} searchAlbum={this.searchAlbum.bind(this,this.props.id)} /> : null}    
                            {(this.state.albumList.length) ? <AlbumList listeAlbum={this.state.albumList} /> : null} 
                        </div>
                    <div className="mod w14 pam"></div>
                </div>
                 <Footer />                  
            </div>
        )
    }
}
