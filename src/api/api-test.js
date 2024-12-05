// const APIURL = 'https://worlds-evolved-2-0.onrender.com';

const ApiTest = async() => {
  const response = await fetch(`https://worlds-evolved-2-0.onrender.com/test`)
  const responseJson = await response.json();
  console.log(responseJson)
  return responseJson
}

ApiTest();
export default ApiTest