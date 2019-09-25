// webservices
"use strict";
var ws = {
    endpoint: 'https://resource.geolba.ac.at/PoolParty/sparql/',

    doc: function (query, thenFunc) {
        return fetch(this.endpoint + 'doc?query=' + encodeURIComponent(query) + '').then(thenFunc);
    },
    json: function (uri, query, thenFunc) {
        return fetch(this.endpoint + uri + '?query=' + encodeURIComponent(query) + '&format=application/json')
            .then(res => res.json())
            .then(thenFunc)
            .catch(error => $('#pageContent').append(`<br>no results for <br>URI: <span style="color: red;"><strong>${uri}</strong></span> <br>`));
    },
    docJson: function (query, thenFunc) {
        return fetch(this.endpoint + 'doc?query=' + encodeURIComponent(query) + '&format=application/json')
            .then(res => res.json())
            .then(thenFunc);
    },
    projectJson: function (projectId, query, thenFunc) {
        return fetch(this.endpoint + projectId + '?query=' + encodeURIComponent(query) + '&format=application/json')
            .then(res => res.json())
            .then(thenFunc);
    }
};
