import React, { useState, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import './App.css';
import HeadComponent from './components/HeadComponent';
import SearchingBox from './components/SearchingBox';
import MovieList from './components/MovieList';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
	const darkTheme = createMuiTheme({
		palette: {
			//TODO: The dark theme not shown
			//type: 'dark',
			type: 'light',
		}
	});
	const [movies, setMovies] = useState([]);
	const [searchText, setSearchText] = useState('Harry Potter');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const fetchMovies = async (searchText, page) => {
		if(searchText!=="" && /[a-zA-Z'"!?,. ]{3,}/g.test(searchText)) {
			setLoading((loading) => !loading);
			const url = `https://tmdb.sandbox.zoosh.ie/graphql?api_key=1a6fba433784895da0de73431d5bc415`
			const response = await fetch(url, {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: `query {
						searchMovies(query: "${searchText}") {
							id
							name
							overview
							releaseDate
							genres {
								id
								name
							}
							poster {
								url: custom(size: "w185_and_h278_bestv2")
							}
							backdrop {
								medium
							}
							popularity
							votes
							score
							similar {
								id
								name
							}
							socialMedia {
								facebook
								imdb
								instagram
								twitter
							}
						}
					}`
				})
			});
			if (!response.ok) {
				setErrorMessage("Something went wrong until the fethcing the movies. Please try again later!");
				setOpen(true);
				setLoading(false);
				return
			}
			const responseJSON = await response.json();
			setMovies(responseJSON.data.searchMovies);
			setLoading((loading) => !loading);
		}
	}

	//TODO infinite scrolling
	const handleWaypoint = async (event) => {
		console.log('Waypoint reached', searchText, page)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		fetchMovies(searchText, page);
	}, [searchText, page]);

	return (
		<ThemeProvider theme={darkTheme}>
			<div className="App">
				<Container maxWidth="lg">					
					<HeadComponent heading="Movies" />
					<SearchingBox searchText={searchText} setSearchText={setSearchText} setPage={setPage} loading={loading} />
					<Grid container spacing={3}>
						<MovieList movies={movies} />
					</Grid>
					<Waypoint onEnter={handleWaypoint}/>
				</Container>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error">
						{errorMessage}
					</Alert>
 				</Snackbar>
			</div>
		</ThemeProvider>
	);
}

export default App;
