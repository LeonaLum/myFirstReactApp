import AppList from './components/AppList';
import Header from './components/Header';
import AppForm from './components/AppForm';
import DomainForm from "./components/DomainForm";

const AddDom = () => {
  return (  
    <div className="main">
     <Header />
      <AppList />
      <DomainForm />
    </div>
  );
}
 
export default AddDom;