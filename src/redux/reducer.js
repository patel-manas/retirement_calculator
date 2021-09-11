import * as actions from "./actions";

const initialState = {
  showCalculation: false,
  showWithdrawPlan: false,
  facts: {
    name: "Sandeep Nayak",
    email: "sandeep.nayak@sknayak.com",
    dob: "1995-05-22",
    age: 26,
    r_age: 48,
    salary: "1200000",
    currentExpense: "45000",
    roi: "12",
    inf: "6",
  },
  calculatuions: {
    futureValue: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_NAME: {
      return {
        ...state,
        facts: { ...state.facts, name: action.payload },
      };
    }
    case actions.SET_EMAIL: {
      return {
        ...state,
        facts: { ...state.facts, email: action.payload },
      };
    }
    case actions.SET_DOB: {
      return {
        ...state,
        facts: { ...state.facts, dob: action.payload },
      };
    }
    case actions.SET_R_AGE: {
      return {
        ...state,
        facts: { ...state.facts, r_age: action.payload },
      };
    }
    case actions.SET_AGE: {
      return {
        ...state,
        facts: { ...state.facts, age: action.payload },
      };
    }
    case actions.SET_SALARY: {
      return {
        ...state,
        facts: { ...state.facts, salary: action.payload },
      };
    }
    case actions.SET_EXPENCE: {
      return {
        ...state,
        facts: { ...state.facts, currentExpense: action.payload },
      };
    }
    case actions.SET_ROI: {
      return {
        ...state,
        facts: { ...state.facts, roi: action.payload },
      };
    }
    case actions.SET_INF: {
      return {
        ...state,
        facts: { ...state.facts, inf: action.payload },
      };
    }
    case actions.SHOW_CAL: {
      return {
        ...state,
        showCalculation: true,
      };
    }
    case actions.SHOW_WITHDRAW_PLAN: {
      return {
        ...state,
        showWithdrawPlan: true,
      };
    }
    case actions.SET_FUTURE_VALUE: {
      return {
        ...state,
        calculatuions: { ...state.calculatuions, futureValue: action.payload },
      };
    }
    default:
      return state;
  }
};

export default reducer;
