import React from "react";

const MovieStateContext = React.createContext();
const MovieDispatchContext = React.createContext();
/**
 * Using reducer instead of useState for cleaner state managment
 */
const inititalState = {
  searchTitle: "label",
  searchResults: [],
  message: null,
  page: 1,
  total: 0,
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case "setTitle":
      return { ...state, searchTitle: action.payload };
    case "setData":
      return { ...state, searchResults: action.payload };
    case "setMessage":
      return { ...state, message: action.payload };
    case "setTotal":
      return { ...state, total: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setPageIncrement":
      return { ...state, page: state.page + 1 };
    case "setPageDecrement":
      return { ...state, page: state.page - 1 };
    default:
      throw new Error("Should not get there!");
  }
};

function MovieProvider({ children }) {
  const [state, dispatch] = React.useReducer(movieReducer, inititalState);
  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatch}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
}

function useMovieState() {
  const context = React.useContext(MovieStateContext);
  if (context === undefined) {
    throw new Error("useMovieState must be used within a MovieProvider");
  }
  return context;
}

function useMovieDispatch() {
  const context = React.useContext(MovieDispatchContext);
  if (context === undefined) {
    throw new Error("useMovieDispatch must be used within a MovieProvider");
  }
  return context;
}

export { MovieProvider, useMovieState, useMovieDispatch };
