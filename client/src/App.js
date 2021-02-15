import React, { useState } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MemeList from './components/Meme/MemeList';
import MemeData from './components/memeData/MemeData';
import './components/memeData/memeData.css';
function App() {
	const [userData, setUserData] = useState({
		_id: '',
		name: '',
		caption: '',
		url: '',
	});

	const updateData = (response) => {
		//console.log(JSON.stringify(response.data.meme));
		const { _id, name, caption, url } = response.data.meme;
		setUserData({
			_id,
			name,
			caption,
			url,
		});
	};
	console.log(userData._id, userData.name, userData.caption, userData.url);
	return (
		<div className='App'>
			<Router>
				<Link className='button_1' to='/'>Meme Share</Link>
				<Link className='button_1' to='/memes'>Memes</Link>
				<Switch>
					<Route path='/' exact>
						<MemeData updateParentData={updateData} />
					</Route>
					<Route path='/memes' exact>
						<MemeList user={userData} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
