import React from "react";
import "./styles.css";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state=({
            name:"shao0320",
        });
    }
    render() {
        return(
            <header className="header-navbar">{this.state.name}</header>
        );
    }
}

export default Header;