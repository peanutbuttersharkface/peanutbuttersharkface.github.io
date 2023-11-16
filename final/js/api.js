const url = 'https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dee9df4e1cmshdb94e51f1bb9a26p1c2619jsn4bfc85bfef3d',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}