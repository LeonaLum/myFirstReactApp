import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
export let user = ["Magica", " ", "Dimitrova"];

const AppForm = () => {

  let formatDate = (value, locale = "en-GB") => {
    return new Date(value).toLocaleDateString(locale);
  }
  const nameValidation = useRef(null);
  const urlValidation = useRef(null);
  const domainValidation = useRef(null);
  let buttonAddDomain = useRef(null);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [domains, setDomains] = useState();
  const [ownDomain, setOwnDomain] = useState("");

  const slash = "/";
  const hyphen = "-";
  const date = formatDate(new Date()).toString().replaceAll(slash, hyphen);

  let message = "";
  let type = "";

  useEffect(() => {
    fetch('http://localhost:8000/domains')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setDomains(data)
        if(data.length == 3){
          buttonAddDomain.current.style.pointerEvents="none";
          buttonAddDomain.current.style.color="#7F7F7F";
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, []);


  function throwError(message, type){
    let validationType;
    if(type == "url"){
      validationType = urlValidation;
    }
    else if(type == "name"){
      validationType = nameValidation;
    }
    else{
      validationType = domainValidation;
    }
  
    let removeMessage = () => {
      validationType.current.innerText = "";
      }
      validationType.current.innerText = message;
      setTimeout(removeMessage, 3000)
  }

  const handleSubmit = (e) => {
    
    e.preventDefault();

    if(name == "" && url == ""){
       message = "Please fill in the fields";
       type = "name";
       throwError(message, type);
    }
    else if(name.length < 3){
       message = "The name has to contain at least 3 characters";
       type = "name";
       throwError(message, type);
    }
    else if(name.length > 100){
        message = "Name can't surpass 100 characters";
        type = "name";
        throwError(message, type);
    }
    else if(url === "" && ownDomain == ""){
       message = "Please type a url or connect a domain";
       type = "url";
       throwError(message, type);
    }
    else if(name.length >= 3 && name.length < 100){
      const stringUrl = `${url.toString()}`;
      const sweetSuffix = ".my.sweetcloud.se";
      setUrl(stringUrl);

      //Fetch the apps to see if the url exists
      fetch('http://localhost:8000/apps')
      .then(res => {
        return res.json()
      })
      .then(data => {
        checkUrl(data);
      })
      .catch((error) => {
        console.log(error.message)
      })
      //Pass the json data to a function to check the url
      function checkUrl(data){
        let urlError;

        data.forEach((app) => {
          if(app.url === stringUrl+sweetSuffix || app.url === ownDomain){
            urlError = true;
          }
        })
        if(urlError){
          message = "The URL/domain is already used"
          type = "";
          throwError(message, type)
        }
        else{
          console.log("app added!")
          let application;

          if(ownDomain != ""){
            application = { name, date, creator:user, url:ownDomain };
          }
          else{
            application = { name, date, creator:user, url:stringUrl+sweetSuffix };
          }
          //If the url is free, convert to json and post
          fetch('http://localhost:8000/apps', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(application)
           }).then(() => {
             console.log('new blog added!')
          }).catch(err => console.log(err))
          //Redirect back to applist
          window.location.pathname = "/applications";
        }
      }
   }
  }

  const setDomain = (e) => {
      let targetDomain = e.target.innerText;
      setOwnDomain(targetDomain)
      setUrl("");

  }
  return ( 
  
    <form noValidate className="app-form" onSubmit={handleSubmit}>
      <h3>New application</h3>

      <fieldset className="form-section">
        <label htmlFor="inputName">Name</label>
        <input 
        type="text" 
        id="inputName" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        <p className="validation" ref={nameValidation}></p>
       
      </fieldset>

      <fieldset className="form-section">
        <label htmlFor="inputUrl">URL address</label>
        <div className='url-section'>
          <input 
          className="input-url" 
          type="text" 
          id="inputUrl"
          value={url.toLowerCase()}
          onFocus={() => setOwnDomain("")}
          onChange={(e) => setUrl(e.target.value)}
          />
          <div className="displayed-url">
            <p>.my.sweetcloud.se</p>
          </div>
        </div>
        <p className="validation" ref={urlValidation}></p>
      </fieldset>

      <fieldset className="form-section">
        <label htmlFor="showDomain">Connect a domain you already own</label>
        <input 
        type="text" 
        id="showDomain"
        disabled
        onFocus={() => setUrl("")}
        value={ownDomain}
        />
        {domains &&
          <ul className="saved-domains">
            {domains.map((domain) => (
              <li className="domain-item" key= { domain.id } onClick={setDomain}><p>{ domain.name }</p></li>
            ))}
          </ul>
        }
        <p className="validation" ref={domainValidation}></p>
        <Link to="/applications/create/savedom" className="add-dom-button" ref={buttonAddDomain}>
          + Add more
        </Link>

      </fieldset>

      <footer className="form-footer">
         <Link to="/applications"className="cancel-button">Cancel</Link>
         <button className="save-button">
           Save
         </button>
      </footer>
    </form>
   );
}
 
export default AppForm;