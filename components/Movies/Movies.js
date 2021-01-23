import { useReducer, useEffect, useCallback, useMemo } from 'react';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';
import MovieList from './MovieList';
import LoadingIndicator from '../UI/LoadingIndicator';
/**
 * Using reducer here might be a bit overkill for our usecase but if we 
 * wanna add crud here it will be easier to maintain
 */
const movieReducer = (currentIngredients, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredients;
      case 'ADD':
        return [...currentIngredients, action.ingredient];
      case 'DELETE':
        return currentIngredients.filter(ing => ing.id !== action.id);
      default:
        throw new Error('Should not get there!');
    }
};

const Movies = () => {
    const [userIngredients, dispatch] = useReducer(movieReducer, []);
    const {
        isLoading,
        error,
        clear
    } = useHttp();
    console.log(useHttp());
    // useCallback to prevent infinite loop.
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        dispatch({ type: 'SET', ingredients: filteredIngredients });
    }, []);

    const movieList = useMemo(() => {
        return (
        <MovieList
            movies={userIngredients}
        />
        );
    }, [userIngredients, isLoading]);
    return (
        <div className="movies">
        {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
        <section>
            <Search onLoadIngredients={filteredIngredientsHandler} />
            {!isLoading ? movieList : <LoadingIndicator/>}
        </section>
        </div>
    );
};

export default Movies;