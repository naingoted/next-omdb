import { useReducer, useEffect, useCallback, useMemo } from 'react';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';
import MovieList from './MovieList';
import Pagination from '../UI/Pagination';
/**
 * Using reducer instead of useState for cleaner state managment
 */
const inititalState = {
    searchTitle: "label", 
    searchResults: [],
    message: null,
    page: 1,
    total: 0
}
const movieReducer = (state, action) => {
    switch (action.type) {
      case 'setTitle':
        return { ...state, searchTitle: action.payload }
      case 'setData':
        return { ...state, searchResults: action.payload }
      case 'setMessage':
        return { ...state, message: action.payload }
      case 'setTotal':
        return { ...state, total: action.payload }
      case 'setPage':
        return { ...state, page: action.payload }
      default:
        throw new Error('Should not get there!');
    }
};

const Movies = () => {
    const [state, dispatch] = useReducer(movieReducer, inititalState);
    const {
        isLoading,
        data,
        sendRequest,
        error,
        clear
    } = useHttp();
    console.log('RENDERING Movies', state);
    const onSetTitle = useCallback( title => {
            dispatch({ type: 'setPage', payload: 1 });
            dispatch({ type: 'setTitle', payload: title });
    }, []);
    const movieList = useMemo(() => {
        return (
        <MovieList
            movies={state.searchResults}
            isLoading={isLoading}
        />
        );
    }, [state.searchResults, isLoading]);
    const onNextPage = () => {
        let page = state.page;
        page++;
        dispatch({ type: 'setPage', payload: page });
    }; 
    const onPrevPage = () => {
        let page = state.page;
        page--;
        dispatch({ type: 'setPage', payload: page });
    }; 
    useEffect(() => {
        sendRequest(
            `/api/omdb/?apikey=${process.env.NEXT_PUBLIC_ENV_OMDBAPI}&s="${state.searchTitle}"&page=${state.page}`,
            'GET'
        );
    }, [state.searchTitle, state.page])

    useEffect(() => {
        if(!isLoading && !error && data) {
            if(data.Response !== "False") {
                dispatch({ type: 'setData', payload: data.Search });
                dispatch({ type: 'setTotal', payload: data.totalResults });
            }
        }

    },[isLoading,error,data, state.searchTitle])

    return (
        <div className="movies">
        {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <Search onSetTitle={onSetTitle} placeholder={state.searchTitle}/>
            {/* {isLoading ?  <LoadingIndicator /> : state.message ? <div className="message"> showing results for : {state.searchTitle}</div> : null} */}
            {movieList}
            <Pagination page={state.page} total={state.total} onNextPage={onNextPage} onPrevPage={onPrevPage} isLoading={isLoading}/>
        </div>
    );
};

export default Movies;