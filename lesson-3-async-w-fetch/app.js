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
            htmlContent = `<figure><img src="${firstImage.urls.regular}" alt="${searchedForText}"><figcaption>
            ${searchedForText} by ${firstImage.user.name}</figcaption></figure>`;
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        });
    });
})();
