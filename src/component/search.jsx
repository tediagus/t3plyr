import React from "react";


export class Search extends React.Component {

    render() {

        return (
            <div >
                <header className="pbm">
                    <div className="logo">t3diPlayList</div>
                    <div className=" mtm mbm txtcenter">
                    <form className="center w50">
                        <input type="text" name="rechercher" placeholder="Rechercher une musique" onChange={this.props.onChange} />
                        <button type="button" onClick={this.props.onSubmit}>Rechercher</button>
                    </form>
                    </div>
                    <div className="search-message"></div>
                </header>
            </div>
        )
    }
}
