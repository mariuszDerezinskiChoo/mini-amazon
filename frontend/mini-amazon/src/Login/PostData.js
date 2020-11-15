export function PostData(type, userData) {
  //let BaseURL = 'https://api.thewallscript.com/restful/';
  let BaseURL = 'http://127.0.0.1:5000/buyers';

  return new Promise((resolve, reject) =>{
  
      fetch(BaseURL, {
          method: 'POST',
          body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });


    });
}