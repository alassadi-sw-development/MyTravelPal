import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const FAKE_USER = {
  name: "Khalid",
  email: "khalid@example.com",
  password: "qwertz",
  avatar: "https://scontent-muc2-1.xx.fbcdn.net/v/t31.18172-8/22048085_10159508894425515_7345390503560853882_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YcsNEMqkGIsQ7kNvgEZfEcA&_nc_ht=scontent-muc2-1.xx&oh=00_AYBVFiZ61bSbqmjnexCcsCRCXhfj1JoOyXCRx_M6bT8yYw&oe=668F969A",
};

function AuthProvider({ children }) {
  const initialState = {
    user: null,
    isAuthenticated: false,
    redirectPath: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload, isAuthenticated: true };
      case "logout":
        return { ...state, user: null, isAuthenticated: false, redirectPath: null };
      case "setRedirectPath":
        return { ...state, redirectPath: action.payload };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  function setRedirectPath(path) {
    dispatch({ type: "setRedirectPath", payload: path });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
