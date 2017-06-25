import React from "react";
import { Search } from "./search";
import { ArtistList } from "./artistlist";
import { AlbumList } from "./albumlist";
import { Footer } from "./footer";
import superAgent from "superagent";
let jsonp = require('superagent-jsonp');

export class PlayList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            artisteName : "",
            artistList: [],
            albumList: [],
            errorMessage: ""
        };
        
    }

    handleSearchTextChange(e){
        this.setState({artisteName: e.target.value});
    }

    /**
     * action de soumission du formulaire
     */
    onSubmit(){
        if(this.state.artisteName){
            //+"&output=jsonp&output=jsonp&version=js-v1.0.0"
            superAgent.get("http://api.deezer.com/search/artist?q="+this.state.artisteName+"&output=jsonp") //&limit=100
            //.accept('application/json')
            .use(jsonp)
            .end( (err, res) => {
                if(res)
                {
                    this.setState(() => {
                       return { artistList: res.body.data , albumList:[] }
                    })
                } else 
                {
                  //  this.setState({errorMessage: err});            
                }        
            });
        } else {
            this.setState({errorMessage: "Veuillez saisir un message dans le champ de recherche "});
            //TODO affiche un message d'erreur
        }
    }
    


    /**
     * Recherche les albums d'un artiste
     * @param {*} e 
     * @param {*} id 
     */
    searchAlbum(id, artName) {

    
        superAgent.get("http://api.deezer.com/artist/"+id+"/albums&output=jsonp")
        .set('Accept', 'application/json')
        .use(jsonp)
        .end((err, res) =>{
            if(res)
            {
                this.setState(() => {
                    return { 
                        albumList: res.body.data,
                        artisteName: artName 
                    }
                })
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
                            {(this.state.artistList.length) ? <ArtistList listeArtiste={this.state.artistList} searchAlbum={this.searchAlbum.bind(this)} /> : null}    
                            {(this.state.albumList.length) ? <AlbumList listeAlbum={this.state.albumList} artName={this.state.artisteName}/> : null} 
                        </div>
                    <div className="mod w14 pam"></div>
                </div>
                {/* <Footer /> */}                 
            </div>
        )
    }
}
