import React from 'react';
import { CardContent } from '@material-ui/core';
import { Typography, Link } from '@material-ui/core';

const MovieOtherDetails = (props) => {

	return (
		<CardContent>
			<Typography variant="body2" gutterBottom>
				<Link href={props.link} target="_blank" color="inherit">
					Wikipedia
				</Link>
			</Typography>
			<Typography paragraph variant="body2">
				{props.description==="" ? "No data avaliable" : props.description}
			</Typography>
		</CardContent>
	)
}

export default MovieOtherDetails;