import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Posts from "../components/Posts"
import Post from "../components/Post"
import NewPost from "../components/NewPost"
import EditPost from "../components/EditPost"
import TopNav from "../components/navigation/TopNav"
import SideBar from '../components/navigation/SideBar'
import Category from '../components/Category'
import NewCategory from "../components/NewCategory"
import Categories from "../components/Categories"



const Routes = (props) => {

  const id = props.user_id

  return(
    <Router>
      <TopNav user_id={id} />

      <div className="row">
        <div className="col-lg-8">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/posts" render={ () => <Posts user_id={id} />} />
            <Route exact path="/posts/new" render={ (props) => <NewPost user_id={id} props={props} />} />
            <Route exact path="/posts/:id" render={ (props) => <Post id={props.match.params.id} user_id={id} />} />
            <Route exact path="/posts/:id/edit" render={ (props) => <EditPost id={props.match.params.id} />} />
            <Route exact path="/categories" render={ () => <Categories />} />
            <Route exact path="/categories/new" render={ () => <NewCategory />} />
            <Route exact path="/categories/:id" render={ (props) => <Category category_id={props.match.params.id} />} />
          </Switch>
        </div>

        <div className="col-lg-4 side-bar">
          <SideBar />
        </div>
      </div>
    </Router>
  )
}

export default Routes