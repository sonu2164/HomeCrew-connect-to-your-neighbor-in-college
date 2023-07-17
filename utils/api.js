const getLocations =async (zipcode)=>{
    
const url = `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${zipcode}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4d279fd174mshc2c758c2d7df5dep1328a8jsn3be6a34f907a',
		'X-RapidAPI-Host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);

//   const parsedResult = JSON.parse(result);
return result;
} catch (error) {
	console.error(error);
}

}

export default getLocations;

