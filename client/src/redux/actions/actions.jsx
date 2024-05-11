import axios from 'axios';

export const USER_SHOW = 'USER_SHOW';

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080');
      dispatch({
        type: USER_SHOW,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
};
