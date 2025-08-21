import React from "react";
import { Typography } from "@mui/material";
import { HashRouter, Route, Switch ,Link} from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import axios from 'axios';
/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
       userid:this.props.match.params.userId,
        user:null,
    });
    // this.func=this.func.bind(this);
  }

  // func(){
  //   const url=`http://localhost:3000/user/${this.props.match.params.userId}`;
  //   console.log("???");
  //   fetchmodel(url).then(response => {
  //       this.setState({users:response.data});
  //       console.log("+++"+response.data+this.state.users._id);
  //   });
  // }
  componentDidMount() {
      // console.log(this.props.match);
      this.loadUser();
      // this.timerID=setInterval(this.func,100);
  }
    componentDidUpdate(prevProps) {
        // 路由参数变化时，重新加载用户
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.loadUser(); // 调用加载用户的方法
        }
    }
    async loadUser() {
        const url=`http://localhost:3000/user/${this.props.match.params.userId}`;
        const user = null;
        // console.log(url);
        try {
            const response= await axios.get(url);
            // for(let i=1;i<=10;i++)response= await fetchmodel(url);
            this.setState({ user:response.data });
        } catch (error) {
            console.error('加载用户失败:', error);
        }
    }
  componentWillUnmount() {
      clearInterval(this.timerID);
  }

    render() {
      // console.log(this.state.user);
    if(!this.state.user)return <div>Loading</div>;
    return (
        <HashRouter>
          <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property
            match. So this should show details of user:
            {this.props.match.params.userId}. You can fetch the model for the user
            from window.cs142models.userModel(userId).


          </Typography>
            <div>
                name : {this.state.user.first_name} {this.state.user.last_name}
                <br/>
                description : {this.state.user.description}
                <br/>
                occupation : {this.state.user.occupation}
                <br/>
                <Link to={"/photos/"+this.state.user._id} replace>
                    see photo!!!
                </Link>
                <br/>
            </div>
        </HashRouter>
    );
  }
}

export default UserDetail;
