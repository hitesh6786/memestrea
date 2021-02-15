const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./config/db');
const Meme = require('./models/meme');
const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/memes', async (req, res) => {
	const memes = await Meme.find();

	if (!memes) {
		return res.send(404).json({ msg: 'No memes available' });
	}
	res.status(200).json(memes);
});

app.get('/memes/:mid', async (req, res) => {
	const memeId = req.params.mid;

	const meme = await Meme.findById({ _id: memeId });

	if (!meme) {
		return res.status(404).json({ msg: 'No meme found for the provided id.' });
	}
	res.status(200).json({ meme: meme });
});

app.post('/memes', async (req, res) => {
	const { name, caption, url } = req.body;
	console.log(name, caption, url);

	const isName = await Meme.findOne({ name });
	const isCaption = await Meme.findOne({ caption });
	const isUrl = await Meme.findOne({ url });

	if (isName && isCaption && isUrl) {
		res.status(409).json({ msg: 'Meme exists already.' });
	}

	try {
		const meme = await new Meme({
			name,
			caption,
			url,
		});

		await meme.save();
		res.status(201).json({ meme: meme });
	} catch (error) {
		res.status(500).json({ msg: 'Server error' });
		console.error(error);
	}
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

app.listen(PORT);
