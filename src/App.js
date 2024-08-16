import './App.css'
import React, { Component } from 'react'
import Navbarr from './components/Navbarr'
import News  from './components/News'
// import Spinner from './components/Spinner'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {

  state={
    progress:0
  }

  apiKey = process.env.REACT_APP_NEWS_API

  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }

  render() {
    return (
      
      <div>
        <Router>
          <Navbarr />
            <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          {/* <Spinner/> */}
          {/* <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country="in" category='sports'/> */}
          <Routes>
            <Route exact path="/"  element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country="in" category='general'/>}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={6} country="in" category='business'/>}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={6} country="in" category='entertainment'/>}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={6} country="in" category='health'/>}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={6} country="in" category='science'/>}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={6} country="in" category='sports'/>}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={6} country="in" category='technology'/>}/>
        </Routes>
        </Router>
      </div>

    )
  }
}
