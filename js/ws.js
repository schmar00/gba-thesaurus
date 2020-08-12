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
            .then(thenFunc)
            .catch(error => {
                if (!$('#outOfService').length) {
                    $('#rightSidebar').append(`<div id="outOfService" class="alert alert-dismissible alert-primary">
                                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                <h4 class="alert-heading">Service downtime:</h4>
                                                    <p class="mb-0">
                                                        GBA Thesaurus is currently not available!
                                                    </p>
                                                </div>`);
                }
            });
    }
};
