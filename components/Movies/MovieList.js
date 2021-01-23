// import { useEffect } from 'react';
import Image from 'next/image';
import useHttp from '../../hooks/http';
import Card from '../UI/Card';
const MovieList = props => {
    const { isLoading, data, error, sendRequest, clear } = useHttp();
    console.log('RENDERING MovieList', isLoading);
    // useEffect(() => {
    //   if (!error && data) {
    //     const loadedIngredients = [];
    //     if(data.Search && data.Search.length){
    //       loadedIngredients.push(...data.Search);
    //     }
    //     onLoadIngredients(loadedIngredients);
    //   }
    // }, [data, isLoading, error, onLoadIngredients]);
    const placeholderImg = `https://via.placeholder.com/300x450/000000/FFFFFF/?text=placeholder`;
    if(props.movies.length === 0) return <h2>Not Found</h2>
    return (
      <section className="movie-list">
          {props.movies.map((item, i) => (
            // should add ID in the movie object to avoid unecessary dom re-render
            <Card key={i} className="card movie">
              <div className="movie__img">
                <Image
                  src={item.Poster !== 'N/A' ? item.Poster : placeholderImg}
                  alt={item.Title}
                  layout="fill"
                  objectFit="cover"
                  // width={300}
                  // height={450}
                  // layout="responsive"
                />
              </div>
              <div className="movie__info">
                <div className="movie__title">{item.Title}</div>
                <div className="movie__year">{item.Year}</div>
              </div>
            </Card>
          ))}
      </section>
    );
  };
  
  export default MovieList;
  