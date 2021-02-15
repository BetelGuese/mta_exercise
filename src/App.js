import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import './App.css';
import HeadComponent from './components/HeadComponent'
import SearchingBox from './components/SearchingBox';

function App() {
	const darkTheme = createMuiTheme({
		palette: {
			//TODO: The dark theme not shown
			//type: 'dark',
			type: 'light',
		}
	});
	const [movies, setMovies] = useState([{
		"adult":false,
		"backdrop_path":"/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
		"genre_ids":[12,14],
		"id":671,
		"original_language":"en",
		"original_title":"Harry Potter and the Philosopher's Stone",
		"overview":"Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths -- and about the villain who's to blame.",
		"popularity":188.764,
		"poster_path":"/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
		"release_date":"2001-11-16",
		"title":"Harry Potter and the Philosopher's Stone",
		"video":false,
		"vote_average":7.9,
		"vote_count":19589
	},{
		"adult":false,
		"backdrop_path":"/8f9dnOtpArDrOMEylpSN9Sc6fuz.jpg",
		"genre_ids":[12,14,10751],
		"id":674,
		"original_language":"en",
		"original_title":"Harry Potter and the Goblet of Fire",
		"overview":"Harry starts his fourth year at Hogwarts, competes in the treacherous Triwizard Tournament and faces the evil Lord Voldemort. Ron and Hermione help Harry manage the pressure – but Voldemort lurks, awaiting his chance to destroy Harry and all that he stands for.",
		"popularity":160.172,
		"poster_path":"/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg",
		"release_date":"2005-11-16",
		"title":"Harry Potter and the Goblet of Fire",
		"video":false,
		"vote_average":7.8,
		"vote_count":15020
	}]);
	const [searchText, setSearchText] = useState('');
	const [loading, setLoading] = useState(false);

	return (
		<ThemeProvider theme={darkTheme}>
			<div className="App">
				<Container maxWidth="lg">					
					<HeadComponent heading="Movies" />
					<SearchingBox searchText={searchText} setSearchText={setSearchText} loading={loading} />
				</Container>
			</div>
		</ThemeProvider>
	);
}

export default App;
