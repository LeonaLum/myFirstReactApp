import { Link } from 'react-router-dom';
import { useState, useRef } from "react";
export let user = ["Magica", " ", "Dimitrova"];

const AppForm = () => {

  let formatDate = (value, locale = "en-GB") => {
    return new Date(value).toLocaleDateString(locale);
  }
  const nameValidation = useRef(null);
  const urlValidation = useRef(null);

  const [name, setName] = useState();
  const [url, setUrl] = useState();

  const slash = "/";
  const hyphen = "-";
  const date = formatDate(new Date()).toString().replaceAll(slash, hyphen);


  const handleSubmit = (e) => {
    
    e.preventDefault();
    if(name.length < 3){
      let removeMessage = () => {
      nameValidation.current.innerText = "";
      }
      nameValidation.current.innerText = "The name has to be at least 3 characters";
      setTimeout(removeMessage, 3000)
    }
    else if(name.length > 3 && name.length < 100){
      const stringUrl = `${url.toString()}`;
      const sweetUrl = ".my.sweetcloud.se";
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
          if(app.url === stringUrl+sweetUrl){
            urlError = true;
          }
        })
        if(urlError){
          let removeMessage = () => {
            urlValidation.current.innerText = "";
          }
            urlValidation.current.innerText = "This URL already exists";
          setTimeout(removeMessage, 3000)
        }
        else{
          console.log("app added!")
          const application = { name, date, creator:user, url:stringUrl+sweetUrl };
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
  return ( 
  
    <form className="app-form" onSubmit={handleSubmit}>
      <h3>New application</h3>

      <section className="form-section">
        <label htmlFor="inputName">Name</label>
        <input 
        type="text" 
        id="inputName" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        <p className="validation" ref={nameValidation}></p>
       
      </section>

      <section className="form-section">
        <label htmlFor="inputUrl">URL address</label>
        <div className='url-section'>
          <input 
          className="input-url" 
          type="text" 
          id="inputUrl"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          />
          <div className="displayed-url">
            <p>.my.sweetcloud.se</p>
          </div>
        </div>
        <p className="validation" ref={urlValidation}></p>
      </section>

      <section className="form-section">
        <label htmlFor="inputDomain">Connect a domain you already own</label>
        <input 
        type="text" 
        id="inputDomain"
        />

        <button className="add-dom-button">
          + Add more
        </button>

      </section>

      <section className="form-footer">
         <Link to="/applications"className="cancel-button">Cancel</Link>
         <button className="save-button">
           Save
         </button>
      </section>
    </form>
   );
}
 
export default AppForm;