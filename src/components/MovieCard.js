import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Collapse, Avatar, IconButton, Typography, Link } from '@material-ui/core';
import { red, blue, green } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
	avatar: {
		backgroundColor: blue[500],
	},
}));

const MovieCard = (props) => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = async () => {
		setExpanded(!expanded);
	};

	return (
		<>
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							{props.movie.original_title.substr(0,1)}
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={props.movie.original_title}
					subheader={props.movie.release_date}
				/>
				<CardMedia
					className={classes.media}
					image={props.movie.backdrop_path ? 'https://image.tmdb.org/t/p/original'+props.movie.backdrop_path : '/movie_placeholder.png'}
					title={props.movie.original_title}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{props.movie.overview}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<StarIcon />
					<Typography variant="subtitle2" >
						{props.movie.vote_average} / {props.movie.vote_count}
					</Typography>
					<IconButton aria-label="search same genre">
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
					<CardContent>
						<Typography variant="body2" gutterBottom>
							<Link href="#" target="_blank" color="inherit">
								Wikipedia
							</Link>
						</Typography>
						<Typography paragraph variant="body2">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis, leo condimentum vestibulum sagittis, metus ligula volutpat sapien, eget vehicula metus ex at sapien. Mauris ut aliquet est. Duis faucibus volutpat elit, eu efficitur risus porta at. Aenean ultrices purus pellentesque suscipit lacinia. Etiam placerat vel lectus vitae ultrices. Fusce nec diam sit amet turpis posuere rutrum. Vestibulum ac ipsum vitae lectus efficitur facilisis vel non elit. Aenean scelerisque urna ipsum, sit amet convallis purus scelerisque nec. In eu ipsum vestibulum, faucibus enim suscipit, laoreet risus. Etiam eget neque pulvinar, tristique dolor non, facilisis ante. In bibendum sagittis pulvinar. Sed purus mauris, malesuada a cursus nec, facilisis et ligula. Mauris et fringilla dui.
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
		</>
	);
}

export default MovieCard;