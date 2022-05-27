import AppForm from "./AppForm";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
let appAmount = 0;


const AppList = () => {
  
   const [apps, setApps] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/apps')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setApps(data)
        appAmount = (data.length);
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, []);
 

  return ( 
    <div className="list-container">
      
      <Link to="/applications/create"className="green-button">
        <span className="plus">+</span> Create new application
      </Link>

      <ul className="applist">
        <div className="applist-head">
          <input type="checkbox" />
          <section className="head-name"><h3>name</h3>
            <div className="arrows"></div>
          </section>
          <section className="head-date"><h3>Date created</h3>
            <div className="arrows"></div>
          </section>
          <section className="head-creator"><h3>Created by</h3>
            <div className="arrows"></div>
          </section>
          <section className="head-url"><h3>URL address</h3>
            <div className="arrows"></div>
          </section>
        </div>

        {apps &&  
         <div className="applist-body">

          {apps.map((app) => (
              <li className="app-item" key= { app.id }>
                <input type="checkbox" />
                <div className="body-name"><h4>{ app.name }</h4></div>
                <div className="body-date"><p>{ app.date }</p></div>
                <div className="body-creator"><p>{ app.creator }</p></div>
                <div className="body-url"><p className="url">{ app.url }</p></div>
               <div className="more-icon"></div>
              </li>
              ))}
  
         </div>
        }

      </ul>
    </div>
   );
}
export default AppList;
export {appAmount}