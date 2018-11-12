(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            {headers: {'Authorization': 'Client-ID db2370ed40d29ea80c246f6a8f587c4464641da78e1736c86ba4c2c8933daf51'}}).then(function (response) {
            return response.json();
        }).then(function (data) {
            let htmlContent = '';
            const firstImage = data.results[0];
            if (firstImage) {
                htmlContent = `<figure><img src="${firstImage.urls.regular}" alt="${searchedForText}"><figcaption>
                ${searchedForText} by ${firstImage.user.name}</figcaption></figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.';
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }).catch(error => requestError(error, 'image'));
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=c778d454f8ac4cd29015c518b9c4666a`).then(function (response) {
            return response.json();
        }).then(function (articles) {
            let htmlContent = '';
            if (articles.response && articles.response.docs && articles.response.docs.length > 1) {
                htmlContent = '<ul>' + articles.response.docs.map(article => `<li class="article"><h2>
            <a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p></li>`).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No Articles Available</div>';
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }).catch(error => requestError(error, 'article'));
    });
    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('afterbegin', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
})();
