import HomeContainer from './components/HomeContainer';
import Header from './components/Header';
import TextContainer from './components/TextContainer';

const Home = () => {
  return ( 
    <div className="main">
      <Header />
         <TextContainer/>
         <HomeContainer /> 
    </div>
   );
}
 
export default Home;