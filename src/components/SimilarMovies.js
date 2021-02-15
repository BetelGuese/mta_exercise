import React from 'react';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const SimilarMovies = (props) => {

	return (
		<CardContent>
			<Typography variant="h4" gutterBottom>
				Similar movies:
			</Typography>
			{props.movies.map(el => 
				<Typography paragraph variant="body2">
					{el.name}
				</Typography>	
			)}
		</CardContent>
	)
}

export default SimilarMovies;