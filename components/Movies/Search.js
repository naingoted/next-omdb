import React, { useState, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import useHttp from '../../hooks/http';

const Search = React.memo(props => {
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();
    const { isLoading, data, error, sendRequest, clear } = useHttp();
    useEffect(() => {
      const timer = setTimeout(() => {
          if (enteredFilter === inputRef.current.value) {
            sendRequest(
              `/api/omdb/?apikey=${process.env.NEXT_PUBLIC_ENV_OMDBAPI}&s="${enteredFilter}"`,
              'GET'
            );
          }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }, [enteredFilter, inputRef, sendRequest]);
    
    useEffect(() => {
      if (!isLoading && !error && data) {
        const loadedIngredients = [];
        if(data.Search && data.Search.length){
          loadedIngredients.push(...data.Search);
        }
        onLoadIngredients(loadedIngredients);
      }
    }, [data, isLoading, error, onLoadIngredients]);

    return (
      <section className="search">
        {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
        <Card>
          <div className="search-input">
            <label>Filter by Title</label>
            {isLoading && <span>Loading...</span>}
            <input
              ref={inputRef}
              type="text"
              value={enteredFilter}
              onChange={event => setEnteredFilter(event.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </Card>
      </section>
    );
  });
  
  export default Search;