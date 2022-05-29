import { useState, useRef } from "react";
import { Link } from 'react-router-dom';

const DomainForm = () => {

  const domainValidation = useRef(null);
  const [domain, setDomain] = useState("");

  const addDomain = (e) => {
    e.preventDefault();
    if(domain == ""){
      domainValidation.current.innerText = "Please provide your domain";
    }
    else if(!domain.includes(".")){
      domainValidation.current.innerText = "This domain is not valid";
    }
    else{
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
  }

  return ( 
    <form noValidate className="app-form" onSubmit={addDomain}>
      <h3>Add your domain</h3>
      <fieldset className="form-section">
        <label htmlFor="inputDomain">Domain</label>
          <input 
          type="text" 
          id="inputDomain" 
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          />
        <p className="validation" ref={domainValidation}></p>
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