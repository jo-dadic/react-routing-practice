import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";
//import NewPost from "./NewPost/NewPost";

const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true,
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Posts
                </NavLink>
                {/* primjer što se sve može dodati u Link tag, ovisno o potrebi: */}
                <NavLink
                  to={{
                    // making an relative path:
                    // pathname: this.props.match.url + "/new-post",
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* you can have as many routes as you wish, even with the same path:
        <Route path='/' exact render={() => <h1>Home</h1>}/>
        <Route path='/' render={() => <h1>Home 2</h1>}/> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />
          {/* jedan od načina za hendlanje nepoznatih ruta i grešaka, umjesto ovog naslova se možemo renderati i obična komponenta. Ovo se uvijek stavlja na kraj!! */}
          <Route render={() => <h1>Not found!</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
          {/* you can have multiple routes with different paths that lead to the same content: */}
          {/* <Route path="/" component={Posts} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
