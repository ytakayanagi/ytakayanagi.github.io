const app = document.getElementById('root');

const row = document.createElement('div');
row.setAttribute('class', 'row');

app.appendChild(row);

(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

const request = new XMLHttpRequest();

request.open('GET', 'https://mediaarts-db.bunka.go.jp/mg/api/v1/results_books', true);

request.onload = function() {
    var data = JSON.parse(this.response);

    if(request.status >= 200 && request.status < 400) {
        for(var i = 0; i < 100; i++) {

            // Create a div with a col s6 class
            const column = document.createElement('div');
            column.setAttribute('class', 'col s6');

            // Create a ul with a collection class
            const collection = document.createElement('ul');
            collection.setAttribute('class', 'collection with-header');

            // Create a li with a collection-header class
            const name = document.createElement('li');
            name.setAttribute('class', 'collection-header');

            // Create an h6 and set the text content to the manga's title
            const title = document.createElement('h6');
            title.textContent = data.results[i].name;

            // Create a li with a collection-item class
            const publisher = document.createElement('li');
            publisher.setAttribute('class', 'collection-item');

            // Set the text content to the manga's publisher
            publisher.textContent = data.results[i].publisher;

            // If no publisher is found return Unkown publisher
            if(publisher.textContent === '') {
                publisher.textContent = 'Unknown publisher';
            }

            // Create a li with a collection-item class
            const author = document.createElement('li');
            author.setAttribute('class', 'collection-item');
            
             // Set the text content to the manga's author
            author.textContent = data.results[i].author;

            row.appendChild(column);
            column.appendChild(collection);
            collection.appendChild(name);
            name.appendChild(title);
            collection.appendChild(publisher);
            collection.appendChild(author);

        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `For some reason it's not working!`;
        app.appendChild(errorMessage);
    }
}

request.send();