const initialStateCustomer = {
  name: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(name, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      name,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateCustomer(name) {
  return {
    type: "customer/updateCustomer",
    payload: name,
  };
}
