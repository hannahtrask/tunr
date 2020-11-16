import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHeart, BsTrash } from 'react-icons/bs';

function App() {
	/* base url */
	const url = 'http://localhost:3000/songs';

	/* get all songs */
	const [allSongs, setAllSongs] = useState({});

	const getSongs = () => {
		axios
			.get(url)
			.then((res) => {
				setAllSongs(res.data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => getSongs(), []);

	const songsDisplay = () => (
		<>
			{allSongs &&
				allSongs.map((song) => (
					<div className='individual-song' key={song.id}>
						<div className='data'>
							<h2 className='individual-song-title'>{song.title}</h2>
							<h3>{song.artist}</h3>
						</div>
						<p>{song.time}</p>
						<BsHeart onClick={() => handleHeartClick(song)} id={song.id} />
						<BsTrash onClick={() => removeSong(song)} />
					</div>
				))}
		</>
	);

	const loadingSongs = <h1>loading songs...</h1>;

	/* add to favorites */
	const [faves, setFaves] = useState([
		{ title: 'This is Nuts', artist: 'Him', time: '5:23' },
	]);

	const handleHeartClick = (song) => {
		if (faves.indexOf(song) === -1) {
			const addFave = faves.push(song);
			setFaves([...faves, addFave]);
		} else {
			console.log(faves.indexOf(song));
			const index = faves.indexOf(song);
			faves.splice(index, 1);
			setFaves([...faves]);
		}
	};

	const loadingFaves = <h1>loading your favorites...</h1>;

	const favesDisplay = () => (
		<>
			{faves &&
				faves.map((song) => (
					<div className='individual-song' key={song.id}>
						<div className='data'>
							<h2 className='individual-song-title'>{song.title}</h2>
							<h3>{song.artist}</h3>
						</div>
						<p>{song.time}</p>
						<BsHeart
							onClick={() => handleHeartClick(song)}
							id={song.id}
							className='red'
						/>
					</div>
				))}
		</>
	);

	/* create a new song */
	const emptySong = { title: '', artist: '', time: '' };
	const [formData, setFormData] = useState(emptySong);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleCreate = (newSong) => {
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newSong),
		}).then(() => {
			getSongs();
		});
	};

	const handleSubmit = (e) => {
		// e.preventDefault();
		handleCreate(formData);
	};

	/* remove a song */
	const removeSong = (song) => {
		axios.delete(url + '/' + song.id).then(() => getSongs());
	};

	/* page render */
	return (
		<div className='body'>
			<div className='header'>
				<h1>TUNR.</h1>
				<h3 className='title-head'>FOR ALL YOUR PLAYLIST NEEDS</h3>
			</div>
			<div>
				<h2 className='list'>PLAYLIST</h2>
				<div className='playlist'>
					{allSongs.length > 0 ? songsDisplay() : loadingSongs}
				</div>
			</div>
			<br />
			<div className='favorite-songs'>
				<h2 className='list'>YOUR FAVES</h2>
				{faves.length > 0 ? favesDisplay() : loadingFaves}
			</div>
			<br />
			<div className='new-song'>
				<h2 className='list'>ADD A NEW SONG</h2>
				<form onSubmit={handleSubmit}>
					<h4>title</h4>
					<input
						type='text'
						name='title'
						value={formData.title}
						onChange={handleChange}
					/>
					<br />
					<h4>artist</h4>
					<input
						type='text'
						name='artist'
						value={formData.artist}
						onChange={handleChange}
					/>
					<br />
					<h4>time</h4>
					<input
						type='text'
						name='time'
						value={formData.time}
						onChange={handleChange}
					/>
					<br />
					<input type='submit' value='ADD NEW SONG' className='submit' />
				</form>
			</div>
		</div>
	);
}

export default App;
