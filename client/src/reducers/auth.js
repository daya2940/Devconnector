import React from "react";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = [
  {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
];

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    default: {
      return state;
    }
  }
}
