import AppList from './components/AppList';
import Header from './components/Header';
import AppForm from './components/AppForm';

const CreateApp = () => {
  
  return (  
    <div className="main">
     <Header />
      <AppList />
      <AppForm />
   </div>
  );
}
 
export default CreateApp;