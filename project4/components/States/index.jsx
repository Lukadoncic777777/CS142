import React from "react";
import "./styles.css";
import Header from "../Header";
/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.state=(
        {
          states:window.cs142models.statesModel(),
          nowString:"",
          nowStates:window.cs142models.statesModel(),
        }
    );
    this.handleNowString=this.handleNowString.bind(this);
    this.getNowState=this.getNowState.bind(this);
  }

  handleNowString(event){
      // this.state
      // return;
      this.setState({nowString:event.target.value});
  }

  getNowState(){
      console.log("IN!");
      let res=[];
      for(let i=0;i<this.state.states.length;i++) {
          // console.log("???");
          if(this.state.states[i].includes(this.state.nowString)){
              // console.log("111");
              res.push(this.state.states[i]);
          }
      }
      this.setState({nowStates:res});
  }
  componentDidMount(){
    const func=this.getNowState;
    this.timerID=setInterval(func,1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

    render() {
      // let res="";
      // for(let i=0;i<this.state.nowStates.length;i++){
      //     res+=this.state.nowStates[i]+"<br>";
      // }
    return (
        <div className="state-container">
            <Header></Header>
            <input className="state-input" onChange={this.handleNowString} value={this.state.nowString} type="text" />
            <div>{this.state.nowString}</div>
            <div className="state-item">
                {
                    this.state.nowStates.map(
                        (value,index) => (
                            <div key={index}>{value}</div>
                        )
                    )
                }
            </div>
        </div>

    );
  }
}

export default States;
