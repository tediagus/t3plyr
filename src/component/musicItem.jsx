import React from "react";

export class MusicItem extends React.Component{
    render() {
        return (
            <div>
                <div className="img-content">
                    <img src="#" title="#" />
                    <div className="music-item-info">
                        <p>Titre </p>
                        <p>Album </p>
                        <p>Artiste - YYYY </p>
                    </div>
                </div>
            </div>
        )
    }
}
