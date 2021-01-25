import { useEffect, useCallback, useMemo } from 'react';
import { useMovieState, useMovieDispatch } from '../../contexts/moviesContext'

import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';
import MovieList from './MovieList';
import Pagination from '../UI/Pagination';

const Movies = () => {
    const { searchTitle, searchResults, page, total} = useMovieState();
    const dispatch = useMovieDispatch();
    const {
        isLoading,
        data,
        error,
        getMoviesByTitle,
        clear
    } = useHttp();
    console.log('RENDERING Movies');
    const onSetTitle = useCallback( title => {
            dispatch({ type: 'setPage', payload: 1 });
            dispatch({ type: 'setTitle', payload: title });
    }, []);
    const movieList = useMemo(() => {
        return (
        <MovieList
            movies={searchResults}
            isLoading={isLoading}
        />
        );
    }, [searchResults, isLoading]);
    const onNextPage = () => {
        dispatch({ type: 'setPageIncrement'});
    }; 
    const onPrevPage = () => {
        dispatch({ type: 'setPageDecrement'});
    }; 
    useEffect(() => {
        getMoviesByTitle(searchTitle, page);
    }, [searchTitle, page])

    useEffect(() => {
        if(!isLoading && !error && data) {
            if(data.Response !== "False") {
                dispatch({ type: 'setData', payload: data.Search });
                dispatch({ type: 'setTotal', payload: data.totalResults });
            }
        }

    },[isLoading,error,data, searchTitle])

    return (
        <div className="movies" data-testid="movies-app">
        {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <div className="control-wrapper">
                <Search onSetTitle={onSetTitle} placeholder={searchTitle}/>
                <Pagination page={page} total={total} onNextPage={onNextPage} onPrevPage={onPrevPage} isLoading={isLoading}/>
            </div>
            {movieList}
        </div>

    );
};

export default Movies;