import axios from 'axios';
import { json } from 'body-parser';
import React, { useState, useEffect } from 'react';

import Meme from './Meme';

const MemeList = ({ user }) => {
	const [memes, setMemes] = useState([]);
	// useEffect(() => {
	// 	setMemes([...memes, { user }]);
	// }, []);

	// useEffect(async () => {
	// 	try {
	// 		const res = await axios.get('/memes');
	// 		res.data.map((meme) => setMemes([...memes, {meme}]))
	// 		setMemes([...memes, { user }])
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// })
	
	useEffect(() => {
		axios.get('/memes').then(res => res.data).then(res => setMemes([...res.reverse()])).catch(err => console.log(err))
		
	})

	console.log(memes)
	return (
		<div className='memelist'>
			{memes.map((meme) => (
				<Meme
					key={meme._id}
					name={meme.name}
					caption={meme.caption}
					imageURL={meme.url}
				/>
			))}
		</div>
	);   
};

export default MemeList;
