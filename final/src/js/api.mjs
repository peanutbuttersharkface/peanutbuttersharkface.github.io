export async function fetchData(inputURL, fix, sac) {
  const encodedParams = new URLSearchParams();
  encodedParams.set('content', inputURL);
  encodedParams.set('response_type', 'html');
  encodedParams.set('request_type', 'html');
  encodedParams.set('fixation', fix);
  encodedParams.set('saccade', sac);

  const encodedParamsJSON = JSON.stringify(Object.fromEntries(encodedParams));
  console.log('Encoded Params (JSON):', encodedParamsJSON);

 
  const apiURL = 'https://bionic-reading1.p.rapidapi.com/convert';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'dee9df4e1cmshdb94e51f1bb9a26p1c2619jsn4bfc85bfef3d',
      'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com'
    },
    body: encodedParams
  };
  try {
	  const response = await fetch(apiURL, options);
	  const result = await response.text();
	  return result;
  } catch (error) {
	  console.error(error);
    throw error;
  }
}


export function displayText(responseData, container){
  if (container) {

     const tempElement = document.createElement("div");
     tempElement.innerHTML = responseData;

     const computedStyles = getComputedStyle(container);
     Object.assign(tempElement.style, {
      fontFamily: computedStyles.fontFamily,
      fontSize: computedStyles.fontSize,
     });

     container.innerHTML = "";
     container.appendChild(tempElement);
  }  
}

fetchData().then(displayText).catch(error => console.error(error));


