import React from "react";
import ReactDOM from "react-dom";
import View from "./components/View/View";
import Header from "./components/Header";
import Example from "./components/Example";
import States from "./components/States";
import { HashRouter, Route, Link } from "react-router-dom";


class Vieww extends React.Component{
    constructor(props) {
        super(props);
        this.state=({});
    }

    // componentDidMount() {
    //     const func
    //     this.timerID=setInterval(func,100);
    // }

    render() {
        return (
            <HashRouter>
                <div className="main-content">
                    <Header></Header>
                    <Link to="/states"><button>states</button></Link>
                    <Link to="/example"><button>example</button></Link>
                    <Route path="/states" component={States} />
                    <Route path="/example" component={Example} />
                </div>
            </HashRouter>
        );
    }
}


ReactDOM.render(<Vieww />, document.getElementById("reactapp"));
