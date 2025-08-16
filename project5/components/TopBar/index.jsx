import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import {HashRouter, Route,Switch} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    console.log('TopBar props:', props);
    this.state=({
      // userid:this.props.match==undefined?null:this.props.match.params.userId,
        user: null,
        isLoading: true,
        version:null,
        // user:this.props.match==undefined?null:window.cs142models.userModel(this.props.match.params.userId)
    });
    this.fetchUserData=this.fetchUserData.bind(this);
    this.getVersion=this.getVersion.bind(this);
  }
     async getversion(){
        const url="http://localhost:3000/test/info";
         try {
             const response = await fetchModel(url);
             console.log(url, response);
             return response?.data?.__v || 0; // 安全访问，避免 undefined
         } catch (error) {
             console.error("获取版本失败:", error);
             return 0;
         }

     }
    async fetchUserData() {
        if (!this.props.match) {
            console.error("match props 为 undefined，无法获取 userId");
            return;
        }
        console.log("user in FUD:",this.state.user);
        const userId = this.props.match.params.userId;
        if(!this.props.match.params.userId)return;
        const url=`http://localhost:3000/user/${this.props.match.params.userId}`;
        console.log("????????"+url);
        const response = await fetchModel(url);
        console.log(response.data);
        this.setState({ user:response.data, isLoading: false }); // 强制同步状态
    }
    // async componentDidMount() {
    //     const user = await window.cs142models.userModel(this.props.match.params.userId);
    //     this.setState({ user });
    // }
    async fetchVersion() {
        const ver = await this.getversion(); // 等待 getversion 完成
        // this.setState({ version }); // 更新状态，触发重新渲染
        this.setState({version:ver});
    }
    async componentDidMount() {
        await this.fetchUserData();
        await this.fetchVersion();
    }
    async componentDidUpdate(prevProps) {
        // 对比上一次的 userId 和当前的 userId
        // if (!this.props.match) {
        //     console.error("match props 为 undefined，无法获取 userId");
        //     return;
        // }
        // if (!prevProps.props.match) {
        //     console.error("match props 为 undefined，无法获取 userId");
        //     return;
        // }
        // console.log("+++++++"+this.match.params?.userId+" "+prevProps.match.params?.userId);
        // if (prevProps.match.params.userId !== this.props.match.params.userId) {
            // 如果变化了，重新请求数据
            // console.log(this.match.params.userId+" "+prevProps.match.params.userId);
        if (!prevProps.match || !this.props.match) {
            return;
        }
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            await this.fetchUserData();
        }
        // }
    }
    getVersion(){

    }
    render() {
      const user = this.state.user;
      const isLoading = this.state.isLoading;
      // if (isLoading) return <div>Loading...</div>;
      console.log("user state:",user);
      if (!user) {
          console.log("IN!user state:",user);
          return <AppBar className="cs142-topbar-appBar" position="absolute">
              <Toolbar><Typography variant="h5" color="inherit"><div>Home &nbsp;&nbsp;&nbsp;version={this.state.version}</div></Typography></Toolbar></AppBar>;
      }
      console.log("GOGOGO chufalou!");
      // if(!user)return <div>Home</div>;
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute" >
          <Toolbar>
              {/*This is the TopBar component*/}
              {/*{console.log(window.cs142models.userModel(this.props.match.params.userId).first_name+"\n")}*/}
              {/*{console.log(this.props.match.params.userId)}*/}
              <Switch>
              <Route path="/users" render={() => (
                  <Typography variant="h5" color="inherit">
                    {user.first_name}&nbsp;
                    {user.last_name}&nbsp;&nbsp;&nbsp;
                      version={this.state.version}
                  </Typography>
              )} />
              <Route path="/photos" render={() => (
                  <Typography variant="h5" color="inherit">
                      {user.first_name}&nbsp;
                      {user.last_name}
                        's photos&nbsp;&nbsp;&nbsp;
                      version={this.state.version}
                  </Typography>
              )} />
              </Switch>

          </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
