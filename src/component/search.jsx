import React from "react";


export class Search extends React.Component {

    render() {

        return (
            <div>
                <form>
                    <input type="text" name="rechercher" placeholder="Rechercher une musique" onChange={this.props.onChange.bind(this)} />
                    <button type="button" onClick={this.props.onSubmit.bind(this)}>Rechercher</button>
                </form>
                <div className="search-message"></div>
            </div>
        )
    }
}
