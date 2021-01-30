import axios from "axios";
import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifer) => {
      console.log(url, method, body, reqExtra, reqIdentifer);
      dispatchHttp({ type: "SEND", identifier: reqIdentifer });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          if (responseData.Response && responseData.Response === "True") {
            dispatchHttp({
              type: "RESPONSE",
              responseData: responseData,
              extra: reqExtra,
            });
          } else {
            dispatchHttp({
              type: "ERROR",
              errorMessage: responseData.Error,
            });
          }
        })
        .catch((error) => {
          dispatchHttp({
            type: "ERROR",
            errorMessage: "Connection Failed!",
          });
        });
    },
    []
  );

  const getMoviesByTitle = useCallback(async (searchTitle, page) => {
    try {
      dispatchHttp({ type: "SEND", identifier: "getMoviesByTitle" });
      const response = await axios.get(
        `/api/omdb/?apikey=${process.env.NEXT_PUBLIC_ENV_OMDBAPI}&s="${searchTitle}"&page=${page}`
      );
      if (response.data.Response === "True") {
        dispatchHttp({ type: "RESPONSE", responseData: response.data });
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      const errorMessage =
        "API ERROR :" + error.response.status + " " + error.response.statusText;
      setError(errorMessage);
    }
  }, []);
  const setError = useCallback((message) => {
    dispatchHttp({
      type: "ERROR",
      errorMessage: message,
    });
  });
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifer: httpState.identifier,
    clear: clear,
    setError,
    getMoviesByTitle,
  };
};

export default useHttp;
