import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  name: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        name: action.payload.name,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateCustomer":
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

function createCustomer(name, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      name,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateCustomer(name) {
  return {
    type: "customer/updateCustomer",
    payload: name,
  };
}

store.dispatch(deposit(1000));
console.log(store.getState());

store.dispatch(withdraw(500));
console.log(store.getState());

store.dispatch(requestLoan(800, "buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer("John Doe", "123456789"));
console.log(store.getState());

store.dispatch(updateCustomer("Jane Doe"));
console.log(store.getState());

// store.dispatch({
//   type: "account/deposit",
//   payload: 1000,
// });

// console.log(store.getState());

// store.dispatch({
//   type: "account/withdraw",
//   payload: 500,
// });

// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 800,
//     purpose: "buy a car",
//   },
// });
// console.log(store.getState());

// store.dispatch({
//   type: "account/payLoan",
// });

// console.log(store.getState());
