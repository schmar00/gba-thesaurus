// bibliographic resources implementation
"use strict";
var biblRes = {
    expanded: false,

    init: function () {
        let urlParams = new URLSearchParams(window.location.search);
        let thesProjName = urlParams.get('proj');
        let all = thesProjName == null || thesProjName == "";

        //$('#headRef').text(`Bibliographic references used for ${thesProjName}`);
        //console.log(urlParams.get('uri')); // "http.."
        let query1 = encodeURIComponent(`   PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
                                            PREFIX dcterms:<http://purl.org/dc/terms/>
                                            SELECT DISTINCT ?o
                                            WHERE {
                                            ?s dcterms:references ?o
                                            }`);

        let query2 = encodeURIComponent(`   PREFIX dcterms:<http://purl.org/dc/terms/>
                                            SELECT DISTINCT *
                                            WHERE {
                                            ?s dcterms:bibliographicCitation ?C
                                            OPTIONAL {?s dcterms:source ?pdf}
                                            OPTIONAL {?s dcterms:identifier ?id}
                                            }
                                            ORDER BY ?C`);

        let url = `${ws.endpoint}${thesProjName}?query=${query1}&format=application/json`;
        let refs = [];


        let result =
            all ?
                fetch(`${ws.endpoint}ref?query=${query2}&format=application/json`).then(function (response) {
                    return response.json();
                })
                    .catch(function (error) {
                        console.log('Request failed', error);
                    })
                :

                fetch(url, {
                    method: 'get',
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    refs = Array.from(data.results.bindings, a => (a.o.value));
                    //console.log(refs);
                    return fetch(`${ws.endpoint}ref?query=${query2}&format=application/json`);
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .catch(function (error) {
                        console.log('Request failed', error);
                    });

        result.then(function (r) {
            let firstChar = '§';
            let ariaExp = true;
            let collapse = '';
            let count = 0;
            let toolBar = $("#biblrefToolbar");
            let refList = $("#refList");
            let done = "",
                c1 = "";

            for (let i of r.results.bindings) {
                if (all || refs.includes(i.s.value)) {
                    count++;
                    let idx = '';
                    let pdfx = '';
                    //console.log(i);
                    if (i.hasOwnProperty('pdf')) {
                        pdfx = ` <a href="${i.pdf.value}">[PDF]</a>`;
                    }
                    if (i.hasOwnProperty('id')) {
                        idx = ` <a href="https://opac.geologie.ac.at/document/${i.id.value}">[Catalog]</a>`;
                    }
                    let citArr = i.C.value.split(':');
                    let listGroupItem = `<li class="list-group-item">
                                            <strong>${citArr[0]}:</strong>
                                            ${citArr.slice(1).join()} ${pdfx}${idx}
                                         </li>`;

                    if (i.C.value.charAt(0).toUpperCase() == firstChar) {
                        $(`#ref${firstChar} ul`).append(listGroupItem);
                    } else {
                        firstChar = i.C.value.charAt(0).toUpperCase();
                        if (c1 == "")
                            c1 = firstChar;
                        if (done.indexOf(firstChar) < 0) {
                            done += firstChar;
                            toolBar.append(`<div class="panel-heading" role="tab" id="refHeading${firstChar}">
                                                <button id="btn${firstChar}" type="button" class="btn btn-outline-info btexpand"  style="font-size:12px;margin:5px;" onclick="biblRes.expand('${firstChar}');">
                                                    ${firstChar}
                                                </button>
                                            </div>
                                        </div>`);
                            refList.append(`<div id="ref${firstChar}" class="panel-collapse collapse${collapse}" role="tabpanel" aria-labelledby="refHeading${firstChar}">
                                                <ul class="list-group">
                                                    <li class="list-group-item">
                                                        <span class="badge badge-info badge-pill" ><strong>${firstChar}</strong></span>
                                                    </li>
                                                        ${listGroupItem}
                                                </ul>
                                            </div>`);
                            ariaExp = false;
                        }
                    }
                }

            }
            toolBar.append(`<button type="button" id="expBut" class="btn btn-outline-info btn-sm" onclick="biblRes.expandAll()" style="margin:5px;">
                    Expand All
            </button>`);

            biblRes.onResize();
            if (count < 10) {
                biblRes.expandAll();
            } else if (c1 != "")
                biblRes.expand(c1);
        });
    },

    expand: function (id) {
        var e = $("#ref" + id);
        var btn = $("#btn" + id);
        var vis = e.hasClass("show");
        if (vis) {
            e.attr("aria-expanded", "false");
            e.attr("class", "panel-collapse collapse hide");
            btn.removeClass("btn-info");
            btn.addClass("btn-outline-info");
        } else {
            e.attr("aria-expanded", "true");
            e.attr("class", "panel-collapse collapse show");
            e.attr("class", "panel-collapse collapse show");
            btn.removeClass("btn-outline-info");
            btn.addClass("btn-info");
            document.getElementById("ref" + id).scrollIntoView();
        }
    },
    expandAll: function () {
        biblRes.expanded = !biblRes.expanded;
        if (biblRes.expanded) {
            $('.collapsed').attr("aria-expanded", "true");
            $('.panel-collapse').attr("class", "panel-collapse collapse show");
            $('#expBut').text("Collapse All");
            $(".btexpand").removeClass("btn-outline-info");
            $(".btexpand").addClass("btn-info");
        } else {
            $('.collapsed').attr("aria-expanded", "false");
            $('.panel-collapse').attr("class", "panel-collapse collapse hide");
            $('#expBut').text("Expand All");
            $(".btexpand").removeClass("btn-info");
            $(".btexpand").addClass("btn-outline-info");
        }
    },
    onResize: function () {
        var h = $('#biblrefContainer').height();
        var dh = $('#biblrefToolbar').height();
        $('#tabList').height(h - dh - (dh / 2));
    }
};
