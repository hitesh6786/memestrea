import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../memeData/memeData.css';

const MemeData = ({ updateParentData }) => {
	const [userData, setUserData] = useState({
		_id: '',
		name: '',
		caption: '',
		url: '',
	});
	const [redirect, setRedirect] = useState(false);

	const { name, caption, url } = userData;
	const onChange = (e) =>
		setUserData({ ...userData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		setRedirect(true);
		e.preventDefault();

		// post request to backend
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await axios.post('/memes', userData, config);
			console.log(response);
			updateParentData(response);	
		} catch(err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h1>Meme Stream</h1>
			<form className='container' onSubmit={onSubmit}>
				<div className='input'>
					<label className='label'>Name:-</label>
					<input
						type='text'
						placeholder='Enter Your Full name'
						name='name'
						value={name}
						onChange={onChange}
					/>
				</div>
				<div className='input'>
					<label className='label_1'>Caption:-</label>
					<input
						type='text'
						placeholder='Be creative with the caption'
						name='caption'
						value={caption}
						onChange={onChange}
					/>
				</div>
				<div className='input'>
					<label className='label_2'>URL:-</label>
					<input
						type='text'
						placeholder='Enter url of your meme here'
						name='url'
						value={url}
						onChange={onChange}
					/>
				</div>
				<input className="button" type='submit' value='Submit Meme' />
			</form>
			{redirect ? <Redirect to='/memes' /> : null}
		</div>
	);
};

export default MemeData;
