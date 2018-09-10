const axios = require('axios');
// http://data.fixer.io/api/latest?access_key=9355749bf4c76125cf9679bc5dbad9b8

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=9355749bf4c76125cf9679bc5dbad9b8');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (error) {
    throw new Error(`Unable to get echange rate for ${from} and ${to}.`);
  }
} 

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (error) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
}

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const convertedAmount = (rate * amount).toFixed(2);
  const countries = await getCountries(to);

  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
} 

convertCurrency('USD', 'CAD', 20)
  .then( (message) => console.log(message) )
  .catch( (error) => {console.log(error.message)} );

const doWork = async () => {
  return assad;
}

doWork().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log('Something went wrong');
});