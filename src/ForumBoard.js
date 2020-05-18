import React from 'react';
import { Table, Divider, Tag, Spin } from 'antd';
import "./ForumBoard.css"


import PropTypes from 'prop-types';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { fetchThreadTopics } from "./redux/actions/threadTopicActions.js";
import { connect } from "react-redux";

import AntForumPost from './AntForumPost.js'
import ForumComments from './ForumComments.js'

import ForumNavBar from './ForumNavBar'

import * as forumUserAuthActions from './redux/actions/forumUserAuthActions.js'
import * as threadPostActions from './redux/actions/threadPostActions.js'

class ForumBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPostData: null,
      commentsData: null,
    }
  }
  async componentDidMount(){
    console.log("component did mount of forum comments")
    console.log("localhost:8000/quizbank/getForumPostByID/"+this.props.threadID+"/")
    // here is where we should query the data for our posts
    let res = await fetch("http:localhost:8000/quizbank/getForumPostByID/"+this.props.threadID+"/")
    // .then(res => this.setState({mainPostData: res.data}))
    res.json().then(json => this.setState({mainPostData: json}))
    // this.setState({mainPostData: res.json()})
    res = await fetch("http:localhost:8000/quizbank/getForumComments/"+this.props.threadID+"/")
    // .then(res => this.setState({commentsData: res.data}))
    res.json().then(json => this.setState({commentsData: json}))
    // this.setState({commentsData: res.json()})
  }
  render (){
    /** 
    generate data for the table from the queries
    **/
    console.log(this.state.commentsData)
    console.log("look at what is above")
    
    // this should be taken in by props
    let titleProps = {
      "is_main_post": true,
      "post_id": 0,
      "parent_id": null,
      "creator": "CrazyClownMan",
      "post_title": "This is my mock main post title",
      "post_text": "This is the main post test! Let's see how this goes.",
      "created_on": "fake time here",
      "last_updated_on": "newer fake time here",
      "indentation_level": 0
      // get the profile pic from props!
    }

    // we should fill forumcomments with props that we get from querying data related to the topic that's placed
    if (this.state.mainPostData && this.state.commentsData){
      let myMainPostTitle = this.state.mainPostData["post_title"]
      console.log(this.state.mainPostData)
      console.log("MAIN POST DATA IN FORUM BOARD IS ABOVE")
      return (
      <>
      <ForumNavBar />
      <div className="main-post-container">
      <AntForumPost data={this.state.mainPostData}/>
      </div>
      <ForumComments data={this.state.commentsData}/>
      </>
    );
    } else {
      return (
      <>
        <ForumNavBar />
        <div className="center">
          <Spin size="large" />)
        </div>
        </>
      )
    }
    
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.forumUserAuth.token !== null,
  testState: state.forumUserAuth.testState,
  threadPosts: state.threadPosts.threadPosts,
  loading: state.threadPosts.loading,
  error: state.threadPosts.error,
  token: state.forumUserAuth.token,
  threadTopics: state.threadTopics.threadTopics,
  usernameToProfilePic: state.forumUserData.userNameToProfilePic,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginViaLocalStorage: (token) => dispatch(forumUserAuthActions.setUser(token)),
    fetchThreadPosts: (api_endpoint) => dispatch(threadPostActions.fetchThreadPosts(api_endpoint)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumBoard);