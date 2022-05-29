import { useState, useRef } from "react";
import { Link } from 'react-router-dom';

const DomainForm = () => {

  const [domain, setDomain] = useState();

  const addDomain = (e) => {
    e.preventDefault();

    const savedDomain = { name:domain };

    fetch('http://localhost:8000/domains', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(savedDomain)
     }).then(() => {
       console.log('domain added!')
    }).catch(err => console.log(err))

    window.location.pathname = "/applications/create"; 
  }

  return ( 
    <form className="app-form" onSubmit={addDomain}>
      <h3>Add your domain</h3>
      <fieldset className="form-section">
        <label htmlFor="inputDomain">Domain</label>
          <input 
          type="text" 
          id="inputDomain" 
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
          />
      </fieldset>
      <footer className="form-footer">
         <Link to="/applications/create"className="cancel-button">
           Cancel
         </Link>
         <button className="save-button">
           Save
         </button>
      </footer>
    </form>
   );
}
 
export default DomainForm;