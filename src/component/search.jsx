import React from "react";


export class Search extends React.Component {

    render() {

        return (
            <div className="txtcenter">
                <header>
                    <form className="center w50">
                        <input type="text" name="rechercher" placeholder="Rechercher une musique" onChange={this.props.onChange} />
                        <button type="button" onClick={this.props.onSubmit}>Rechercher</button>
                    </form>
                    <div className="search-message"></div>
                </header>
            </div>
        )
    }
}
