import axios from 'axios';
import { json, redirect, useSubmit } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import { API } from '../config/api/api.config';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Logout = () => {
  let submit = useSubmit();
  useEffect(() => {
    submit({}, { method: 'put' });
  }, []);
  return (
    <p>
      <i>Logging out ...</i>
    </p>
  );
};
export default Logout;
export async function action() {
  const token = getAuthToken();
  const response = await axios({
    method: 'put',
    url: API.endpoint + '/user/logout',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    validateStatus: () => true,
  });
  if (response.status !== 200) throw json({ message: 'Something went wrong' });
  localStorage.clear();
  toast.success('You logged out successfully', {
    position: toast.POSITION.TOP_RIGHT,
  });
  return redirect('/');
}
