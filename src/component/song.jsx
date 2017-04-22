import React from "react";
import  url from "url" ;
import superAgent from "superagent";
import jsonp from "superagent-jsonp";
import classNames from "classnames";

export class Song extends React.Component {
    constructor(props){
        super(props);
         this.state = {
            songs: [],
            isVisible : true
        };
    }

    getSong(id){
        superAgent.get("https://api.deezer.com/album/"+id+"&output=jsonp&output=jsonp&version=js-v1.0.0&DZ.request.callbacks.dzcb_00588c75a128d948e_335531810")
        .use(jsonp)
        .end((err, res) =>{
            if(res && res.body.tracks)
            {   
                this.setState({songs: res.body.tracks.data});
            }            
        });        
    }

    renderSingle (){       
        let Songs = (this.props.albumId) ? this.getSong(this.props.albumId) : [];
        let html = this.state.songs.map((data, i )=>{
            return (
                <li key={data.id}><span className="title-song">{i+1} - {data.title}</span><span className="duration">{data.duration}</span></li>
            )        
        })
        
        return html;
    }

    render() {
        let classNameDiv = classNames ({ 
            "song-list" : true,
            hidden: (this.props.isVisible) ? !this.props.isVisible: true })
        return (
            <div className={classNameDiv}>
                <ul className="multi">
                    {this.renderSingle()}
                    <button onClick={this.download.bind(this)}>Télécharger</button>
               </ul>
            </div>
        )
    }
}
