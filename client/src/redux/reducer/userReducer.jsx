import { USER_SHOW } from "../actions/actions";

const initialState = {
    userData: null
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_SHOW:
        return {
          ...state,
          userData: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;