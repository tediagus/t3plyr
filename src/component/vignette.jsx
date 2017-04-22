import React from "react";
import classNames from "classnames";

export class Vignette extends React.Component {
    
    constructor(props){
        super(props)
    }

    render() {
        let classNameDiv = classNames({
            vignette: true
        });

        return (
            <div className={classNameDiv} onClick={this.props.search} >            
                <img src={this.props.picture}  />
                <p>{this.props.libelle}</p>
            </div>
        )
    }
}
