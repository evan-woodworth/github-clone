import React, { useState, useEffect } from 'react';

const Dashboard = (props) => {
    const {user, repos, events} = props;
    const processEvent = (event) => {
        let type = ""
        let target = event.repo.name
        let time = event.created_at
        if (event.type === "ForkEvent") {
            type = "forked from ";
        } else if (event.type === "PushEvent") {
            type = "pushed to ";
        } else if (event.type === "CreateEvent") {
            type = "created ";
        } 
        return "You "+type+target+" at "+time;
    }
    return(
        <div className="Dashboard">
            <div className="leftbar">
                {repos.map((repo,idx)=>(
                    <Link key={idx} to="/Repositories/">{repo.full_name}</Link>
                ))}
            </div>
            <div className="container">
                <div className="header">
                    {/* An empty placeholder */}
                </div>
                <div className="main">
                    {events.map((event,idx)=>(
                        <p key={idx}>{processEvent(event)}</p>
                    ))}
                </div>
                <div className="rightbar">
                    <p>Announcement Stuff</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;