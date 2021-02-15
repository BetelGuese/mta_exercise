import React from 'react';
import { CardContent, Typography, Link } from '@material-ui/core';

const SimilarMovies = (props) => {
	const size = props.movies.length
	if(!size) props.movies.push({name: "No data avaliable"})
	return (
		<CardContent>
			<Typography variant="h4" gutterBottom>
				Similar movies:
			</Typography>
			{props.movies.map((el, id) =>
				<Typography paragraph variant="body2" key={id}>
					<Link href="#" color="inherit" onClick={(e) => { 
						e.preventDefault();
					}}>
						{el.name}
					</Link>
				</Typography>
			)}
		</CardContent>
	)
}

export default SimilarMovies;