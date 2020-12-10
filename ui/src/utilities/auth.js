import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs'

export const getUserId = () => Cookies.get('user_id')
export const isAuthenticated = () => !!getUserId()

export const redirectToLogin = () => {
  window.location = '/login';
}

export const login = async (username, password) => {
  // axios call for login, sets tokens as cookies, returns object {success:bool, warning:"invalid login"}
  
  
  return await axios({
    method: 'post',
    url: '/api/login',
    data: qs.stringify({
      username: username,
      password: password
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then(res => res.data)
    .then(res => {
      if (res.success && !isAuthenticated()) {
        Cookies.set('user_id', res.uid);
        console.log("URRRRRR user_id", res.uid);
      }
      return res;
    });

}

export const register = async (username, password, confirmPassword) => {

  return await axios({
    method: 'post',
    url: '/api/register',
    data: qs.stringify({
      username: username,
      password: password
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then(res => res.data)
    .then(res => {
      console.log(res.uid);
      if (res.success && !isAuthenticated()) {
        Cookies.set('user_id', res.uid);
        console.log("URRRRRR user_id", res.uid);
      }
      return res;
    });


}

export const logout = () => {
  Cookies.remove('user_id');
  redirectToLogin();
}
