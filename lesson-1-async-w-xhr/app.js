(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const unsplashRequest = new XMLHttpRequest();
    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        const firstImage = data.results[0];
        htmlContent = `<figure><img src="${firstImage.urls.regular}" alt="${searchedForText}"><figcaption>
        ${searchedForText} by ${firstImage.user.name}</figcaption></figure>`;
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    function addArticles() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"><h2>
            <a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p></li>`).join('') + '</ul>';
        } else {
            htmlContent = '<div class="error-no-articles">No Articles Available</div>';
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
    const articleRequest = new XMLHttpRequest();
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID db2370ed40d29ea80c246f6a8f587c4464641da78e1736c86ba4c2c8933daf51');
        unsplashRequest.onload = addImage;
        unsplashRequest.send();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=c778d454f8ac4cd29015c518b9c4666a`);
        articleRequest.send();
    });
})();
