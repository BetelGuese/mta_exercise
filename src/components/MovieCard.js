import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Collapse, Avatar, IconButton, Typography } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from "moment";
import MovieOtherDetails from './MovieOtherDetails';
import SimilarMovies from './SimilarMovies';

const useStyles = makeStyles((theme) => ({
	root: {},
	img: {
		width: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
		  duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatarBelow7: {
		backgroundColor: blue[500],
	},
	avatarAbove7: {
		backgroundColor: red[500],
	},
}));

const MovieCard = (props) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [wikiDescription, setWikiDescription] = useState("");
	const [wikiLink, setWikiLink] = useState("");
	const [panelContent, setPanelContent] = useState("")

	const handleExpandClick = async () => {
		if(expanded) {
			setExpanded(!expanded);
		}
		if(!expanded && wikiDescription === "") {
			const wikiResponse = await searchWikiPage()
			await fetchFirstParagraphFromWiki(wikiResponse)
			await searchIMDBLink()
		}
		setPanelContent("wiki");
		setExpanded(!expanded);
	};

	const handleSearchClick = async () => {
		if(expanded) {
			setExpanded(!expanded);
		}
		setTimeout(() => {
			setPanelContent("similar");
			setExpanded(!expanded);
		},500)
	}

	const searchWikiPage = async () => {
		const url = `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${props.movie.name}&limit=1&namespace=0&format=json`;
		const res = await fetch(url);
		const response = await res.json();
		if(typeof response === 'object' && response[0] !== '') {
			setWikiLink(response[response.length-1][0])
			return response;
		}
	}

	const fetchFirstParagraphFromWiki = async (response) => {
		if(response) {
			const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exintro&explaintext&titles=${encodeURI(response[0])}&format=json`
			const wikiRes = await fetch(wikiUrl);
			const wikiResponse = await wikiRes.json();
			const page = Object.keys(wikiResponse.query.pages)[0]
			setWikiDescription(wikiResponse.query.pages[page].extract)
		} else {
			//TODO error handling
		}
	}

	// TODO imdbid is missing
	const searchIMDBLink = async () => {
		const imdbAPIURL = `https://api.themoviedb.org/3/find/${props.movie.id}?api_key=1a6fba433784895da0de73431d5bc415&language=en-US&external_source=imdb_id`;
		const imdbRes = await fetch(imdbAPIURL);
		const imdbResponse = await imdbRes.json();
	}

	return (
		<>
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={props.movie.score>7 ? classes.avatarAbove7 : classes.avatarBelow7}>
							{props.movie.name.substr(0,2)}
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={props.movie.name}
					subheader={moment(props.movie.releaseDate).format("MMMM DD. YYYY")}
				/>
				<CardMedia
					className={classes.media}
					image={props.movie.backdrop ? props.movie.backdrop.medium : '/movie_placeholder.png'}
					title={props.movie.name}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{props.movie.overview}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<StarIcon />
					<Typography variant="subtitle2" >
						{props.movie.score} / {props.movie.votes}
					</Typography>
					<IconButton aria-label="search same genre" 
						onClick={handleSearchClick}
						aria-expanded={expanded}
						aria-label="show more">
						<SearchIcon />
					</IconButton>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
				{panelContent==="wiki" ? (
					<MovieOtherDetails link={wikiLink} description={wikiDescription} />
				) : (
					<SimilarMovies movies={props.movie.similar} />
				)}
				</Collapse>
			</Card>
		</>
	);
}

export default MovieCard;