import React, {useState, useEffect} from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import Repositories from './components/Repositories';
import Settings from './components/Settings';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
console.log(process.env.REACT_APP_GIT_PAT)

export default function App() {
  const [userData, setUserData] = useState([]);
  const [repoData, setRepoData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const url = "https://api.github.com/users/evan-woodworth";

  async function getUserData(url) {
    const userResults = await axios.get(url);
    const userData = await userResults.data;
    const userRepoResults = await axios.get(userData.repos_url);
    const userRepoData = await userRepoResults.data;
    const userEventResults = await axios.get(userData.events_url);
    const userEventData = await userEventResults.data;
    setUserData(userData);
    setRepoData(userRepoData);
    setEventData(userEventData);
  }

  useEffect(()=>{
    getUserData(url);
  },[])

  return (
    <Router className="App">
      <nav>
        <img className="navIcon" height="36px"  src="/git-icon.png" alt="" />
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Explore">Explore</Link>
        <Link to="/Repositories">Repositories</Link>
        <Link to="/Settings">Settings</Link>
      </nav>
      <Route exact path="/" render={()=><Dashboard user={userData} repos={repoData} events={eventData} />} />
      <Route path="/Dashboard" render={()=><Dashboard user={userData} repos={repoData} events={eventData} />} />
      <Route path="/Explore" render={()=><Explore user={userData} repos={repoData} events={eventData} />} />
      <Route path="/Repositories" render={()=><Repositories user={userData} repos={repoData} events={eventData} />} />
      <Route path="/Settings" render={()=><Settings user={userData} repos={repoData} events={eventData} />} />
    </Router>
  );
}
