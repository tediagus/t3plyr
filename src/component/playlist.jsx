import React from "react";
import { Search } from "./search";
import { ArtistList } from "./artistlist";
import { AlbumList } from "./albumlist";
import { SingleList } from "./singlelist";
import  url from "url" ;
import superAgent from "superagent";
import jsonp from "superagent-jsonp";

export class PlayList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            artisteName : "",
            artistList: [],
            albumList: [],
            singleList:[]
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
            superAgent.get("https://api.deezer.com/search/artist?q="+this.state.artisteName+"&output=jsonp&output=jsonp&version=js-v1.0.0&DZ.request.callbacks.dzcb_00588c75a128d948e_335531810&limit=20")
            .use(jsonp)
            .end((err, res) =>{
                if(res)
                {
                    this.setState({
                        artistList: res.body.data,
                        albumList: [],
                        singleList:[]
                    })
                } else 
                {
                        
                }        
            });
        }else {

            console.log("le champs de recherche est vide")
        }
    }
    
    searchAlbum(e, id){
        superAgent.get("https://api.deezer.com/artist/"+id+"/albums&output=jsonp&output=jsonp&version=js-v1.0.0&DZ.request.callbacks.dzcb_00588c75a128d948e_335531810")
        .use(jsonp)
        .end((err, res) =>{
            if(res)
            {
                this.setState({albumList: res.body.data})
            }            
        });
    }
    
    render() {
        console.log(this.state.artistList.length);
        return (
            <div>
                <div className="container">
                    <Search onSubmit={this.onSubmit.bind(this)} value={this.state.artisteName} onChange={this.handleSearchTextChange.bind(this)} />
                    {(this.state.artistList.length) ? <ArtistList listeArtiste={this.state.artistList} searchAlbum={this.searchAlbum.bind(this,this.props.id)} /> : null}    
                    {(this.state.albumList.length) ? <AlbumList listeAlbum={this.state.albumList}  /> : null}    
                    {(this.state.singleList.length) ? <SingleList singleList={this.state.singleList} /> : null}                    
                </div>
            </div>
        )
    }
}
