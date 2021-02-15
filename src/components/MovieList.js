import React from 'react';
import { Grid } from '@material-ui/core';
import MovieCard from './MovieCard';

const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<Grid item lg={4} xs key={movie.id}>
					<MovieCard movie={movie} />
				</Grid>
			))}
		</>
	);
};

export default MovieList;