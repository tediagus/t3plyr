import React from "react";

export class Vignette extends React.Component {

    render() {
        return (
            <div className="vignette">            
                <img src={this.props.picture} onClick={this.props.searchAlbum}/>
                <div className="vignette-detail" >
                    <h5>{this.props.libelle}</h5>
                </div>
            
            </div>
        )
    }
}
