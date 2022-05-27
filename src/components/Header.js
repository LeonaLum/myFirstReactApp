import { user } from "./AppForm";

const Header = () => {
  
  let category = "";
  if(window.location.pathname.includes('/applications')){
    category = "Applications"
  }
  return ( 
    <div className="main-head">
      <div className="category">
        <h2>{ category }</h2>
      </div>

      <div className="head-content">
        <div className="user-image">
         <p>{user[0][0] + user[2][0]}</p>
        </div>
        <p className="username">{ user[0] }</p>
      </div>
    </div>
   );
}
 
export default Header;