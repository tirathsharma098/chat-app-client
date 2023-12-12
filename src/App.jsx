import MainPage from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';

import { ToastContainer } from 'react-toastify';

const App = (props) => {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <MainPage/>
    </>
  );
};
export default App;
