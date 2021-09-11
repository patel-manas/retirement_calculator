export const SET_NAME = "SET_NAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_DOB = "SET_DOB";
export const SET_AGE = "SET_R_AGE";
export const SET_R_AGE = "SET_R_AGE";
export const SET_SALARY = "SET_SALARY";
export const SET_EXPENCE = "SET_EXPENCE";
export const SET_ROI = "SET_ROI";
export const SET_INF = "SET_INF";
export const SHOW_CAL = "SHOW_CAL";
export const SET_FUTURE_VALUE = "SET_FUTURE_VALUE";
export const SHOW_WITHDRAW_PLAN = "SHOW_WITHDRAW_PLAN";

export const updateFacts = (action) => (dispatch) => {
  console.log({
    action,
  });
  dispatch({ type: SET_NAME, payload: action.payload.name });
  dispatch({ type: SET_EMAIL, payload: action.payload.email });
  dispatch({ type: SET_DOB, payload: action.payload.dob });
  dispatch({ type: SET_AGE, payload: action.payload.age });
  dispatch({ type: SET_R_AGE, payload: action.payload.retirementAge });
  dispatch({ type: SET_SALARY, payload: action.payload.salary });
  dispatch({ type: SET_EXPENCE, payload: action.payload.currentExpense });
  dispatch({ type: SET_ROI, payload: action.payload.roi });
  dispatch({ type: SET_INF, payload: action.payload.inf });
  dispatch({ type: SHOW_CAL });
};
