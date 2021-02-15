import React from 'react';
import { Grid } from '@material-ui/core';

const HeadComponent = (props) => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<h1>{props.heading}</h1>
			</Grid>
		</Grid>
	);
};

export default HeadComponent;