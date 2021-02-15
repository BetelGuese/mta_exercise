import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';

function App() {
	const darkTheme = createMuiTheme({
		palette: {
		  type: 'dark',
		}
	  });
	return (
		<ThemeProvider theme={darkTheme}>
			<div className="App">
				<header className="App-header">

				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
