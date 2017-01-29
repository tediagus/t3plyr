import React from "react";

export class AlbumList extends React.Component {

     renderAlbums (){       
        let html = this.props.listeAlbum.map((data, k )=>{
            console.log(data);
            return (
                <div className="vignette ">       

                    <img src={data.cover} onClick={this.props.searchAlbum}/>
                    <div className="vignette-detail" >
                        <h5>{data.title}</h5>
                    </div>
                </div>
            )
            
        })
        return html;
    }

    render() {
        return (
            <div className="spacer album-list">
                <h2>Liste des Albums({this.props.listeAlbum.length})</h2>
                 {this.renderAlbums()}
            </div>
        )
    }
}
