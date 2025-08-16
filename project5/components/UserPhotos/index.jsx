import React from "react";
import { Typography ,Divider } from "@mui/material";

import "./styles.css";
import {HashRouter, Link} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
// import {response} from "express";
/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
        photos:null,
    });
    this.func=this.func.bind(this);
  }

  func() {
      return 1;
  }

  componentDidMount() {
      // console.log(this.props.match.params.userId);
      const url=`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`;
      fetchModel(url).then( response => {
         this.setState({photos:response.data});
      });
      this.timerID=setInterval(this.func,100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

    render() {
    if(!this.state.photos)return <div>Loading...</div>;
    return (
        <HashRouter>
          <Typography variant="body1">
            This should be the UserPhotos view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property
            match. So this should show details of user:
            {this.props.match.params.userId}. You can fetch the model for the user
            from window.cs142models.photoOfUserModel(userId):
            <Typography variant="caption">
                {this.state.photos.map((photo)=>(
                    <div>
                        {/*{console.log("comment="+photo.comments+"\n")}*/}
                        <img src={"/images/"+photo.file_name} width="auto" height={50}></img>
                        <br/>
                        date time : {photo.date_time}
                        <br/>
                        comments : {photo.comments!==undefined ? photo.comments.map((comment) =>
                            (
                                // {console.log("comment="+comment.comment+"\n")}
                                <div>
                                    <Link to={"/users/"+comment.user._id}>
                                        {comment.user.first_name}
                                        &nbsp;
                                        {comment.user.last_name}
                                    </Link>
                                    <br/>
                                    {comment.comment}
                                    <br/>
                                    time : {comment.date_time}
                                </div>
                            ))
                            : null
                        }
                        <br/>
                        <Divider></Divider>
                    </div>
                ))}
            </Typography>
          </Typography>
        </HashRouter>
    );
  }
}

export default UserPhotos;
/*
http://localhost:3000/photo-share.html#/users/57231f1a30e4351f4e9f4bd8
http://localhost:3000/photo-share.html#/user/57231f1a30e4351f4e9f4bd8
 */