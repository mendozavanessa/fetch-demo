const forms = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

forms.addEventListener('submit', function(event) {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=783f698733d641229d84a70012c9ddb4`;
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(addNews)
    .catch(displayErrors);
});

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res) {
  return res.json()
    .then(function(data) {
      return data;
    });
  console.log(data);
}

// function getNews() {
//   const articleRequest = new XMLHttpRequest();
//   articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=783f698733d641229d84a70012c9ddb4`);
//   articleRequest.onload = addNews;
//   articleRequest.onerror = handleError;
//   articleRequest.send();
// }

function addNews(data) {
  // debugger;
  // const data = JSON.parse(this.responseText);
  // console.log(data);
  // // const response = data.response;
  // // console.log(response);
  console.log(data);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;
  let li = document.createElement('li');
  li.ClassNmae = 'articleClass';
  li.innerText = snippet;
  responseContainer.appendChild(li);
  // for (var i = 0; i < data.response.docs.length; i++) {
  //   const article = data.response.docs[i];
  //   const title = article.headline.main;
  //   const snippet = article.snippet;
  //   let li = document.createElement('li');
  //   li.ClassNmae = 'articleClass';
  //   li.innerText = snippet;
  //   responseContainer.appendChild(li);
  // }
}

function displayErrors(err) {
  console.log('INSIDE displayErrors!');
  console.log(err);
}
