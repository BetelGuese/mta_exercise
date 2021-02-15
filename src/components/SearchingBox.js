import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, CircularProgress, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	
}));

const SearchingBox = (props) => {
	const classes = useStyles();
	const [searchValue, setSearchValue] = useState(props.searchText) 

	return (
		<Grid container spacing={3} alignItems="center">
			<Grid item xs={12}>
				<form className={classes.root} noValidate autoComplete="off" onSubmit={e => { 
					e.preventDefault();
					props.setSearchText(searchValue);
					props.setPage(1);
					props.setLastPage(false);
				}}>
					<TextField 
						id="outlined-basic" 
						label="Press enter to search..." 
						variant="outlined" 
						value={searchValue} 
						onChange={(event) => {
							setSearchValue(event.target.value)
						}}
						placeholder='Type to search...'
					/>
				</form>
				<Box component="div" visibility={props.loading ? "visible" : "hidden"}>
					<CircularProgress />
				</Box>
			</Grid>
		</Grid>
	);
};

export default SearchingBox;