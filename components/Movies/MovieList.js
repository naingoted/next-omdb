// import { useEffect } from 'react';
import Image from "next/image";
import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";

const MovieList = (props) => {
  console.log("RENDERING MovieList");
  const placeholderImg = `https://via.placeholder.com/300x450/000000/FFFFFF/?text=placeholder`;
  return (
    <section className="movie-list">
      {!props.isLoading ? (
        props.movies.map((item, i) => (
          // should add ID in the movie object to avoid unecessary dom re-render
          <Card key={i} className="card movie">
            <div className="movie__img">
              <Image
                src={item.Poster !== "N/A" ? item.Poster : placeholderImg}
                alt={item.Title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="movie__info">
              <div className="movie__title">{item.Title}</div>
              <div className="movie__year">{item.Year}</div>
            </div>
          </Card>
        ))
      ) : (
        <div className="loading-container">
          <LoadingIndicator />
        </div>
      )}
    </section>
  );
};

export default MovieList;
