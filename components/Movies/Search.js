import React, { useState, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import useHttp from '../../hooks/http';

const Search = React.memo(({onSetTitle, placeholder}) => {
    const [enteredFilter, setEnteredFilter] = useState(placeholder);
    const inputRef = useRef();
    // const { isLoading, data, error, sendRequest, clear } = useHttp();
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //       if (enteredFilter === inputRef.current.value) {
    //         sendRequest(
    //           `/api/omdb/?apikey=${process.env.NEXT_PUBLIC_ENV_OMDBAPI}&s="${enteredFilter}"`,
    //           'GET'
    //         );
    //       }
    //   }, 500);
    //   return () => {
    //     clearTimeout(timer);
    //   };
    // }, [enteredFilter, inputRef, sendRequest]);
    
    // useEffect(() => {
    //   if (!isLoading && !error && data) {
    //     const loadedIngredients = [];
    //     if(data.Search && data.Search.length){
    //       loadedIngredients.push(...data.Search);
    //     }
    //     onLoadIngredients(loadedIngredients);
    //   }
    // }, [data, isLoading, error, onLoadIngredients]);
    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        console.log('do validate');
        onSetTitle(enteredFilter);
      } else if (e.key === 'Escape') {
        setEnteredFilter('');
        inputRef && inputRef.current.focus() 
      }
    }
    return (
      <section className="search">
          <div className="search-input">
            <span className="search-icon"><img src="/images/loupe.svg" alt=""/></span>
            <input
              data-testid="input-box"
              className="input input--title"
              placeholder="Search Movies"
              ref={inputRef}
              type="text"
              value={enteredFilter}
              onChange={event => setEnteredFilter(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
      </section>
    );
  });
  
  export default Search;