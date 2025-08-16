import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {useHistory} from "react-router-dom";

import "./styles.css";
import {values} from "@babel/runtime/regenerator";
import { HashRouter, Route, Switch ,Link,withRouter} from "react-router-dom";
import fetchmodel from "../../lib/fetchModelData";
// import {response} from "express";
/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      users:null,
    });
    this.myfunc=this.myfunc.bind(this);
    this.qaq=this.qaq.bind(this);
  }

  qaq(){
      return 1;
  }
  componentDidMount() {
      // console.log("!!!!!!!!");
      const url="http://localhost:3000/user/list";
      fetchmodel(url).then(response => {
          this.setState({users:response.data});
          // console.log("+++"+response.data);
      });
      // this.timerID=setInterval(this.qaq,100);
  }

  componentWillUnmount() {
      clearInterval(this.timerID);
  }

    myfunc(){
      // const history=this.props.history;
      // const handleClick=(user) =>{
      //     history.replace(`/users/${user._Id}`);
      // };
      if(!this.state.users)return <div>Loading...</div>;
      return (
          <HashRouter>
              <Typography variant="body1">
                  This is the user list, which takes up 3/12 of the window. You might
                  choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
                  and <a href="https://mui.com/components/dividers/">Dividers</a> to
                  display your users like so:
              </Typography>
              <List component="nav">
                  {this.state.users.map((user)=>(
                      <div>
                          <ListItem key={user._id}>
                              <Link to={"/users/" + user._id} replace>
                                  <ListItemText>
                                      {user.first_name}
                                      &nbsp;
                                      {user.last_name}
                                      <br/>
                                  </ListItemText>
                              </Link>
                          </ListItem>
                          <Divider/>
                      </div>
                  ))}
              </List>
              <Typography variant="body1">
                  The model comes in from window.cs142models.userListModel()
              </Typography>
          </HashRouter>
      );
  }
  render() {
      return this.myfunc();
  }
}

export default UserList;
