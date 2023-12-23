import MainPage from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';

import { ToastContainer } from 'react-toastify';
import { socket } from './socket';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socketAction } from './store/socketState';

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    function onConnected () {
      dispatch(socketAction.onConnect())
      console.log("Connected to socket");
    }
    socket.emit("setup");
    socket.on("connected",onConnected);
    return () => {
      socket.off("connected", onConnected)
    }
}, []);
  return (
    <>
      <ToastContainer autoClose={2000} />
      <MainPage/>
    </>
  );
};
export default App;
