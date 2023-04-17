import {
  AUTH_SIGNUP_LOADING,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNIN_LOADING,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_ERROR
} from "./actionTypes";
import axios from "axios";

export const signup = (data) => async (dispatch) => {
  dispatch({ type: AUTH_SIGNUP_LOADING });
  try {
    const res = await axios.post(
      "https://enchanting-sunglasses-pig.cyclic.app/user/register",
      data
    );
    dispatch({
      type: AUTH_SIGNUP_SUCCESS,
      payload: {
        message: res.data.message
      }
    });
  } catch (error) {
    dispatch({
      type: AUTH_SIGNUP_ERROR,
      payload: {
        message: error.response.data.message
      }
    });
  }
};

export const signin = (data) => async (dispatch) => {
  dispatch({ type: AUTH_SIGNIN_LOADING });
  try {
    const res = await axios.post(
      "https://enchanting-sunglasses-pig.cyclic.app/user/login",
      data
    );
    dispatch({
      type: AUTH_SIGNIN_SUCCESS,
      payload: {
        message: res.data.message,
        token: res.data.token,
        name: res.data.username
      }
    });
  } catch (error) {
    dispatch({
      type: AUTH_SIGNIN_ERROR,
      payload: {
        message: error.response.data.message
      }
    });
  }
};
