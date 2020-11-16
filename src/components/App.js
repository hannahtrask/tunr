import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHeart } from 'react-icons/bs';

function App() {
	const [allSongs, setAllSongs] = useState({});
	const url = 'http://localhost:3000/songs';

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setAllSongs(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	console.log('this is allSongs', allSongs);

	const songsDisplay = () => (
		<>
			{allSongs &&
				allSongs.map((song) => (
					<div className='individual-song'>
						<h2>{song.title}</h2>
						<h3>{song.artist}</h3>
						<p>{song.time}</p>
						<BsHeart />
					</div>
				))}
		</>
	);

	const loadingSongs = <h1>loading songs...</h1>;

	return (
		<div className='body'>
			<h1>TUNR.</h1>
			<h2>for all your playlist needs</h2>
			<div>
				<h1>PLAYLIST</h1>
				<div className='playlist'>
					{allSongs.length > 0 ? songsDisplay() : loadingSongs}
				</div>
			</div>
			<div className='favorite-songs'>
				<h3>this will be a favorite songs list</h3>
			</div>
			<div className='new-song'>
				<h4>add a new song</h4>
				<form>
					<p>this will be a form, title, artist, time</p>
				</form>
			</div>
		</div>
	);
}

export default App;
