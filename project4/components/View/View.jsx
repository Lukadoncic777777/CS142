import React from "react";
import "./style.css";
import States from "../States";
import Example from "../Example";
// import header from "../Header";
import Header from "../Header";
// import {handle} from "express/lib/router";

class View extends React.Component{
            constructor(props) {
                super(props);
                this.state=({
                    isExample:true,
        });
        this.handleClick=this.handleClick.bind(this);
    }

    // componentDidMount() {
    //     const func
    //     this.timerID=setInterval(func,100);
    // }
    handleClick(event){
        this.setState((prevState) => ({
           isExample:! prevState.isExample,
        }));
    }

    render() {
        return (
            <div className="main-content">
                <Header></Header>
                <button onClick={this.handleClick}>reverse</button>
                <div>
                    {this.state.isExample?<Example/>:<States/>}
                </div>
            </div>
        );
    }
}

export default View;