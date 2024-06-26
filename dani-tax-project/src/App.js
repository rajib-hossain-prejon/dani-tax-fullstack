import { NotificationContainer } from 'react-notifications';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <NotificationContainer />
    </>
  );
}

export default App;
