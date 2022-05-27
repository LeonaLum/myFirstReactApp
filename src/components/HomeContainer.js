import CardSources from "./CardSources";
import CardInvite from "./CardInvite";
import CardBuild from "./CardBuild";

const HomeContainer = () => {
 
  return ( 
    <div className="home-container">
      <CardSources />
      <CardInvite />
      <CardBuild />
    </div>
   );
}
 
export default HomeContainer;