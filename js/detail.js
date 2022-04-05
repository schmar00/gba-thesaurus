﻿// detail features
"use strict";
const BaseUri = {
    skos: 'http://www.w3.org/2004/02/skos/core#',
    dcterms: 'http://purl.org/dc/terms/',
    foaf: 'http://xmlns.com/foaf/0.1/',
    geo: 'http://www.w3.org/2003/01/geo/wgs84_pos#',
    gba: 'http://resource.geolba.ac.at/schema/thes#',
    owl: 'http://www.w3.org/2002/07/owl#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    dbpo: 'http://dbpedia.org/ontology/',
    schema: 'https://schema.org/'
};

const Uri = {
    PREF_LABEL: [BaseUri.skos + 'prefLabel'],
    PICTURE: [BaseUri.foaf + 'depiction'],
    SYNONYMS: [BaseUri.skos + 'altLabel'],
    NOTATION: [BaseUri.skos + 'notation'],
    GBA_STATUS: [BaseUri.gba + 'status'],
    GBA_DATAVIEWER: [BaseUri.gba + 'mapViewer'],
    DESCRIPTION_1: [BaseUri.skos + 'definition'],
    DESCRIPTION_2: [BaseUri.skos + 'scopeNote', BaseUri.dcterms + 'description', BaseUri.dcterms + 'abstract'],
    CITATION: [BaseUri.dcterms + 'bibliographicCitation'],
    REF_LINKS: [BaseUri.dcterms + 'references'],
    RELATIONS_1: [BaseUri.skos + 'broader', BaseUri.skos + 'narrower', BaseUri.skos + 'related'],
    RELATIONS_2: [BaseUri.skos + 'exactMatch', BaseUri.skos + 'closeMatch', BaseUri.skos + 'relatedMatch', BaseUri.skos + 'broadMatch', BaseUri.skos + 'narrowMatch'],
    RELATIONS_3: [BaseUri.rdfs + 'seeAlso', BaseUri.owl + 'sameAs', BaseUri.dcterms + 'relation', BaseUri.dcterms + 'hasPart', BaseUri.dcterms + 'isPartOf', BaseUri.dcterms + 'conformsTo'],
    DATA_LINKS: [BaseUri.dcterms + 'source', BaseUri.dcterms + 'isReferencedBy', BaseUri.dcterms + 'subject', BaseUri.dcterms + 'isRequiredBy', BaseUri.dcterms + 'identifier', BaseUri.schema + 'mainEntityOfPage'],
    VISUALIZATION: [BaseUri.dbpo + 'colourHexCode'],
    LOCATION: [BaseUri.skos + 'example', BaseUri.geo + 'lat_long', BaseUri.geo + 'location', BaseUri.dcterms + 'spatial'],
    CREATOR: [BaseUri.dcterms + 'creator', BaseUri.dcterms + 'created', BaseUri.dcterms + 'modified', BaseUri.dcterms + 'contributor']
}

var detail = {

    details: function (uri) { //build the web page content
        var query = `PREFIX skos:<http://www.w3.org/2004/02/skos/core#> 
                    SELECT DISTINCT ?p ?o (GROUP_CONCAT(DISTINCT CONCAT(STR(?L), "@", lang(?L)) ; separator="|") AS ?Label) 
                    WHERE { 
                    VALUES ?s {<${uri}>} ?s a skos:Concept . ?s ?p ?o .
                    OPTIONAL {?o a skos:Concept; skos:prefLabel ?L}
                    } 
                    GROUP BY ?p ?o 
            `;

        ws.json(uri.split("/")[3], query, function (data) {
            if (data.results.bindings.length > 1) {
                var F = page.isEmbedded ? detail.FRONT_LIST_EMBEDDED : detail.FRONT_LIST;
                for (var key in F) detail.insertFrontPart(key, uri, data, Array.from(F[key].values()));
                var div = $('#pageContent');
                div.append(`<hr>
                                <div style="cursor: pointer; color: #757575;" id="detailsBtn" 
                                    onclick="javascript: page.toggleRead(\'detailsBtn\', \'detailsToggle\', \'read more\');"> <span class="fa fa-caret-down"></span> <em>read more ..</em>
                                </div>
                                <div style="display:none;" id="detailsToggle">
                                <br>
                                    <table id="details"></table>
                                </div>
                                `);

                for (key in detail.TECHNICAL_LIST) detail.insertTechnicalPart(key, data, Array.from(detail.TECHNICAL_LIST[key].values()));
                div.append('');

                if (uri.split("/")[3] !== 'doc') {
                    detail.insertConceptBrowser(div, uri, 50);
                } else {
                    div.append('<br><br><br><br><br><br><br><br><br><br>');
                }
            } else {
                $('#pageContent').append(`<br>no results for <br>URI: <span style="color: red;"><strong>${uri}</strong></span> <br>`);
            }
        });
    },
    rdfTS: function (url) {
        document.getElementById('irdfQuery').value = "CONSTRUCT {?s ?p ?o} WHERE {VALUES ?s {<" + url + ">} ?s ?p ?o}";
        document.getElementById('irdfForm').submit();
    },
    insertFrontPart: function (key, uri, data, props) {
        var div = $('#pageContent');
        let html = `<form id="irdfForm" target="_blank" style="display:none;" method="post" action="${ws.endpoint}${uri.split("/")[3]}"><input type="hidden" name="query" id="irdfQuery"/></form>`;
        props.forEach((i) => {
            let ul = this.getObj(data, i);
            if (ul.size > 0) {
                switch (key) {
                    case 'prefLabel':
                        let pL = this.setUserLang(Array.from(ul).join('|').replace(/  <span class="lang">/g, '@').replace(/<\/span>/g, ''));
                        html += '<h3 id="title" class="mt-4">' + pL + '</h3>';
                        html += `   <p class="lead">URI: 
                                    <span id="uri" class="" style="word-wrap:break-word;">${uri}</span>
                                        &nbsp;&nbsp;&nbsp;&#8658;
                                    <a href="javascript:detail.rdfTS('${uri}')"> RDF download</a>
                                </p>
                                <hr>`;
                        this.insertApp('Database', 'queries', `${ws.endpoint}${uri.split('/')[3]}`, 'list-alt'); //&list=${encodeURIComponent(pL)}&lang=${lang.ID}`, 'list-alt');
                        page.updateSharingTexts(pL);
                        break;
                    case 'dataViewer': //*********************########################################################
                        let projDV_Arno = ['GeologicUnit', 'lithology', 'GeologicTimeScale'];

                        if (projDV_Arno.includes(uri.split('\/')[3])) {
                            this.insertApp('Data', 'Viewer', 'https://gisgba.geologie.ac.at/DataViewer/tdv/Index.aspx?url=' + uri + '&lang=' + lang.ID, 'map');
                        } else if (uri.split('\/')[3] == 'structure') {
                            this.insertApp('Map', 'download', 'structureViewer.html?uri=' + uri + '&lang=' + lang.ID, 'map');
                        } else if (uri.split('\/')[3] == 'minres') {
                            this.insertApp('Map', 'download', 'minresViewer.html?uri=' + uri + '&lang=' + lang.ID, 'map');
                        } else if (uri.split('\/')[3] == 'mineral') {
                            this.insertApp('Map', 'download', 'mineralViewer.html?uri=' + uri + '&lang=' + lang.ID, 'map');
                        }

                        break;
                    case 'picture':
                        ul.forEach(a => this.insertApp('text1', 'text2', $(a).attr('href'), 'picture'));
                        break;
                    case 'altLabel':
                        html += '<ul class="' + key + '"><li>' + Array.from(ul).join('</li><li>') + '</li></ul>';
                        break;
                    case 'notation':
                        div.append('<hr><span>Notation: </span>');
                        html += '<ul class="' + key + '"><li>' + Array.from(ul).join('</li><li>') + '</li></ul>';
                        break;
                    case 'gbaStatus':
                        div.append('<br><span>GBA Status: </span>');
                        let status = Number(Array.from(ul)[0].slice(0, 1));
                        let gbaStatusStyle = ['', 'success', 'danger', 'primary'];
                        let gbaStatusText = ['', 'official use', 'informal use', 'obsolete'];
                        html += '<span class="badge badge-' + gbaStatusStyle[status] + '"> ' + gbaStatusText[status] + ' </span>';
                        $('#uri').attr('class', 'text-' + gbaStatusStyle[status]);
                        break;
                    case 'abstract':
                        html += '<hr><div class="' + key + '">' + this.setUserLang(Array.from(ul).join('|').replace(/  <span class="lang">/g, '@').replace(/<\/span>/g, '')) + '</div>';
                        break;
                    case 'citation':
                        let a = [];
                        ul.forEach(i => {
                            a.push($.parseHTML(i)[0].innerHTML);
                        });
                        html += '<div id="citation"></div>';
                        this.getCitation(a);
                        break;
                    case 'relatedConcepts':

                        if (html.search('<h4') == -1) {
                            html += '<hr><h4 style="margin-bottom: 1rem;">' + lang.SEM_REL + '</h4>';
                        }
                        html += '<table><tr><td class="skosRel' + i.search('Match') + ' skosRel">' + i.replace(BaseUri.skos, '') + '</td><td class="skosRelUl"><ul><li>' +
                            this.shortenText(Array.from(ul).join('</li><li>')) + '</li></ul></td></tr></table>';

                        break;
                    default:
                        html += `<h3 id="title" class="mt-4">Error: Undefined key ${key}</h3><hr>`;
                        break;
                }
            }
        });
        div.append(html);
    },

    shortenText: function (text) {
        let shorten = {
            INSPIRE: 'http://inspire.ec.europa.eu/codelist/',
            CGI: 'http://resource.geosciml.org/classifier/cgi/',
            ICS: 'http://resource.geosciml.org/classifier/ics/',
            DBpedia: 'http://dbpedia.org/resource/',
            DBpediaDE: 'http://de.dbpedia.org/resource/',
            BGS: 'http://data.bgs.ac.uk/id/EarthMaterialClass/',
            MICA: 'https://w3id.org/mica/ontology/MicaOntology/',
            WIKIDATA: 'http://www.wikidata.org/entity/'
        };

        for (let i in shorten) {
            if (text.search(shorten[i]) != -1) {

                text = text.split('>' + shorten[i])[0] + '>' + text.split('>' + shorten[i])[1].replace('<', ' (' + i + ')<');
            }
        }
        return text;
    },

    insertTechnicalPart: function (key, data, props) { //loop all single properties
        let html = '';
        /*        let geoPath = 'http://www.w3.org/2003/01/geo/wgs84_pos#';
                let coord = {};*/

        props.forEach((i) => {
            let ul = this.getObj(data, i);
            if (ul.size > 0) {
                html += '<tr><td headers="th1' + key + '" class="propTech">' + this.createHref(i) + '</td><td headers="th2' + key + '"><ul><li>' + Array.from(ul).join('</li><li>') + '</li></ul></td></tr>';

                if (i == BaseUri.geo + 'lat_long') {
                    this.insertApp('type', 'location', 'http://www.google.com/maps/place/' + ul.values().next().value.split(',')[0] + 'N+' + ul.values().next().value.split(',')[1] + 'E/@47.6381118,13.6028916,7z/data=!4m2!3m1!1s0x0:0x0', 'map-pin');
                }
                /*                if (i == geoPath + 'lat') {
                                    coord.lat = Number(ul.values().next().value);
                                }
                                if (i == geoPath + 'long') {
                                    coord.long = Number(ul.values().next().value);
                                }
                                if (coord.hasOwnProperty('lat') && coord.hasOwnProperty('long')) {
                                    this.insertApp('type', 'location', 'http://www.google.com/maps/place/' + coord.lat + 'N+' + coord.long + 'E/@47.6381118,13.6028916,7z/data=!4m2!3m1!1s0x0:0x0', 'map-pin');
                                    coord = {};
                                }*/

                if (i == BaseUri.dbpo + 'colourHexCode') {
                    this.insertApp('<span class="colorBox" style="background:' + ul.values().next().value + ';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>Color', ul.values().next().value, 'https://www.w3schools.com/colors/colors_converter.asp?color=' + ul.values().next().value.replace('#', ''), '');
                }

            }
        });

        if (html.length > 0) {
            $('#details').append(`
                    <tr id="${key}">
                        <th id='th1${key}'></th>
                        <th id='th2${key}'>
                            ${lang[key + '_H']}
                        </th>
                    </tr>
                    <tr>
                        ${html}
                    </tr>`);
        }
    },

    getObj: function (data, i) {
        let AT = page.isEmbedded ? "target='_blank' " : "";

        return new Set($.map(data.results.bindings.filter(item => item.p.value === i), (a => (a.Label.value !== '' ? '<a ' + AT + 'href="' + page.BASE +
            '?uri=' + a.o.value + '&lang=' + lang.ID + '">' + this.setUserLang(a.Label.value) + '</a> ' : this.createHref(a.o.value) + ' ' +
            this.createDTLink(a.o.datatype) + ' ' + this.langTag(a.o['xml:lang'])))));
    },

    createHref: function (x) { //PROVIDE_REDIRECT?
        let AT = page.isEmbedded ? "target='_blank' " : "";
        if (x.substring(0, 22) == 'http://resource.geolba') { //vocabulary base URI
            x = '<a ' + AT + 'href="' + page.BASE + '?uri=' + x + '">' + x + '</a>';
        } else if (x.substring(0, 4) == 'http') {
            let a = x;
            for (const [key, value] of Object.entries(BaseUri)) a = a.replace(value, key + ':');
            x = '<a ' + AT + 'href="' + x + '">' + this.createPdfRef(a.replace(/_/g, ' ')) + '</a>';
        }
        return x;
    },

    langTag: function (x) {
        if (typeof x !== 'undefined') {
            x = '<span class="lang">' + x + '</span>';
        } else {
            x = '';
        }
        return x;
    },

    createDTLink: function (x) {
        if (typeof x !== 'undefined') {
            let AT = page.isEmbedded ? "target=\"_blank\" " : "";
            if (x.indexOf('XMLSchema') > 0) {
                x = '<a ' + AT + 'class="datatype" href="' + x + '">' + x.replace('http://www.w3.org/2001/XMLSchema#', 'xsd:') + '</a>';
            }
        } else {
            x = '';
        }
        return x;
    },

    setUserLang: function (x) {
        if (x.indexOf('@' + lang.ID) > 0) {
            return x.substr(0, x.indexOf('@' + lang.ID)).split('|').slice(-1).pop();
        } else if (x.indexOf('@en') > 0) {
            return x.substr(0, x.indexOf('@en')).split('|').slice(-1).pop();
        } else if (x.indexOf('@') > 0) {
            return x.substr(0, x.indexOf('@')).split('|').slice(-1).pop();
        } else {
            return x.split('|')[0];
        }
    },

    getCitation: function (refArr) {
        refArr = '<' + refArr.join('> <') + '>';
        let AT = page.isEmbedded ? "target=\"_blank\" " : "";

        let query = `PREFIX dcterms:<http://purl.org/dc/terms/>
                    SELECT DISTINCT ?Citation ?DSN ?PDF
                    WHERE {
                    VALUES ?r {${refArr}}
                    ?r dcterms:bibliographicCitation ?Citation .
                    OPTIONAL {?r dcterms:identifier ?dsn}
                    BIND (IF(exists{?r dcterms:identifier ?dsn} , ?dsn, "") AS ?DSN)
                    OPTIONAL {?r dcterms:source ?pdf}
                    BIND (IF(exists{?r dcterms:source ?pdf} , ?pdf, "") AS ?PDF)
                    }`;

        ws.json("ref", query, jsonData => {
            var html = '<br><blockquote class="blockquote">';
            jsonData.results.bindings.forEach((i) => {

                html += '<footer class="blockquote-footer">' + i.Citation.value.replace(/\:/g, ': <cite title="">') + '</cite>';
                if (i.PDF.value !== '' && i.PDF.value.substring(0, 4) == 'http') {
                    html += '&nbsp;-&nbsp;<a ' + AT + 'href="' + i.PDF.value + '" style="font-style: normal;">[PDF]</a>';
                } else if (i.PDF.value !== '') {
                    html += '&nbsp;-&nbsp;<a ' + AT + 'href="https://opac.geologie.ac.at/wwwopacx/wwwopac.ashx?command=getcontent&server=images&value=' + i.PDF.value + '" style="font-style: normal;">[PDF]</a>';
                }
                if (i.DSN.value !== '') {
                    html += '&nbsp;-&nbsp;<a ' + AT + 'href="https://opac.geologie.ac.at/document/' + i.DSN.value + '" style="font-style: normal;">[Catalog]</a>';
                }
                html += '</footer>';

            });
            $('#citation').append(html + '</blockquote>');
        });
    },

    provideAll: function (divID, uri, offset) { //provide all available concepts for navigation
        let AT = page.isEmbedded ? "target=\"_blank\" " : "";
        //query Sparql endpoint
        var query = `PREFIX dcterms:<http://purl.org/dc/terms/> 
                    PREFIX skos:<http://www.w3.org/2004/02/skos/core#> 
                    SELECT DISTINCT ?s (STR(?l) AS ?Label) ?cs (STR(?csl) AS ?Schema) (COALESCE(?csd, "") AS ?SchemaDesc) (COALESCE(?sd, "") AS ?Desc) ?tc 
                    WHERE { 
                    <${uri}> skos:broader* ?b . ?b skos:topConceptOf ?cs . 
                    ?cs dcterms:title ?csl .  FILTER(lang(?csl)="${lang.ID}") . 
                    ?cs skos:hasTopConcept ?tc . ?s skos:broader* ?tc; skos:prefLabel ?l . FILTER(lang(?l)="${lang.ID}") 
                    OPTIONAL{?cs dcterms:description ?csd .  FILTER(lang(?csd)="${lang.ID}") } 
                    OPTIONAL{?s skos:definition ?sd .  FILTER(lang(?sd)="${lang.ID}") } 
                    } 
                    ORDER BY ?Label 
                    LIMIT 50 
                    OFFSET ${offset}`;
        ws.json(uri.split("/")[3], query, function (data) {
            var allConcepts = $('#allConcepts');
            let a = [];
            $('#' + divID).append('');
            $('#allConceptsHeader').html(data.results.bindings[0].Schema.value + ' (' + Number(offset + 1) + ' .. ' + Number(offset + data.results.bindings.length) + ')');
            allConcepts.empty().append('<div>' + data.results.bindings[0].SchemaDesc.value + '</div><br>');

            data.results.bindings.forEach((i) => {
                if (i.s.value == i.tc.value) {
                    a.push('<a ' + AT + 'data-toggle="tooltip" data-placement="right" data-html="true" title="<h4>' + i.Label.value + '</h4>' + i.Desc.value.slice(0, 230) + '.." href="' + page.BASE + '?uri=' + i.s.value + '&lang=' + lang.ID + '"><strong>' + i.Label.value + '</strong></a> (&#8658; top concept)');
                } else {
                    a.push('<a ' + AT + 'data-toggle="tooltip" data-placement="right" data-html="true" title="<h4>' + i.Label.value + '</h4>' + i.Desc.value.slice(0, 230) + '.." href="' + page.BASE + '?uri=' + i.s.value + '&lang=' + lang.ID + '">' + i.Label.value + '</a>');
                }

            });
            if (offset !== 0) {
                allConcepts.append('.. ');
            }
            allConcepts.append(a.join(', '));

            document.getElementById("leftBtn").value = offset;
            document.getElementById("rightBtn").value = offset;
            if (document.getElementById("leftBtn").value == "0") {
                $('#leftBtn').prop('disabled', true);
                if (Object.keys(data.results.bindings).length < 50) {
                    $("#coBr").hide();
                }
            } else {
                $('#leftBtn').prop('disabled', false);
            }
            if (Object.keys(data.results.bindings).length < 50) {
                $('#rightBtn').prop('disabled', true);
            } else {
                $('#rightBtn').prop('disabled', false);
                allConcepts.append(' ...');
            }

            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip({
                    trigger: "hover"
                });
                $('[data-toggle="tooltip').on('click', function () {
                    $(this).tooltip('hide');
                    $("#DeleteUserModal").modal();
                });
            });

        });
    },

    insertConceptBrowser: function (div, uri, offset) {
        div.append(`
        <hr>
        <div class="card my-4">
            <ul id="coBr" class="pagination mb-4 cardHeaderRight">
                <li>
                    <button type="button" id="leftBtn" class="btn btn-outline-secondary btn-sm" onclick="detail.provideAll('allConcepts', '${uri}', Number(this.value)-50)">
                        <span class="fa fa-chevron-left"></span>
                    </button>
                </li>
                <li>
                    <button type="button" id="rightBtn" class="btn btn-outline-secondary btn-sm" onclick="detail.provideAll('allConcepts', '${uri}', Number(this.value)+50)">
                        <span class="fa fa-chevron-right"></span>
                    </button>
                </li>
            </ul>
            <h4 id="allConceptsHeader" class="card-header"></h4>
            <div id="allConcepts" class="card-body"></div>
        </div>
                           `);
        this.provideAll('allConcepts', uri, 0);
    },

    createPdfRef: function (a) {
        var pdfImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAIcKAACMDQABBbcAAIDoAABSBQABFVsAADavAAAfQQLQ3GkAAAFDSURBVHjaADYByf4B////+gAAurGy5f/39vz6Cfn8Bu/1EwgRPEFFEyMWAf6ajgHZ5vjF2Pz+AwIGBef67PdANSx6b6nJxhAuKATxk4QB0+4PAAAAAAAAAADRAAD1E/3p3Du259X3+ucE6CIv9Q70BPfyDgAC5vr84Pf9QVhZ4+DvMA4q9vf9Af///+kA/r7NtSMjJwrw+uO3xklYZgDh7QAABs7KzAQAAAAA5usu3AwrGSLr49385fz90dj8LiPJCfuU7vgEAAAAAAQDCxQTAPX++Le8LyAW08y57sXyDSwkavz8BAAAAP76+O/05va1yRoeBf1LKwkIKBfQ0BPn7w3x+wQAAAAJBwcC8+oZLR4QQ0f7APAA8+oQNz8W+grJqK8EAAAABQcHu+Pi29HP87OxBvX+CfsE9Pj89QACHCsrAwCLf5kn2fkcxQAAAABJRU5ErkJggg==";

        if (a.split('.').slice(-1).pop().toLowerCase() == 'pdf') {
            a += ' - <img alt="PDF version" src="' + pdfImage + '">';
        }
        return a;
    },


    insertApp: function (text1, text2, link, glyphicon) {

        if (glyphicon == 'picture') {
            $('#appsBody2').append(`
                <div class="apps thumbNail">
                    <a href="${link}">
                        <img alt="${text1}" src="${this.imgPng(link.replace('http:', 'https:'))}" class="img-thumbnail" alt="Image" title="Image" onerror="$(this).remove();" style="width:75px; height:75px; overflow:hidden;">
                    </a>
                </div>`);
        } else if (glyphicon == '') {
            $('#appsBody2').append(`
                <div class="apps">
                    <a href="${link}" class="card-link">
                        ${text1}<br>${text2}
                    </a>
                </div>`);
        } else {
            $('#appsBody1').append(`
                <div class="apps">
                    <span class="appsIcon fa fa-${glyphicon} text-info style=""></span>
                    <br>
                    <a href="${link}" class="card-link">
                        ${text1}<br>${text2}
                    </a>
                </div>`);
        }
    },

    imgPng: function (url) {
        if (url.search('geologie.ac.at') > -1) {
            let a = url.split('.');
            a.pop();
            url = a.join('.') + '.png';
        }
        return url;
    },

    TECHNICAL_LIST: {
        descriptions: [...Uri.PREF_LABEL, ...Uri.SYNONYMS, ...Uri.DESCRIPTION_1, ...Uri.DESCRIPTION_2],
        scientificReferences: Uri.CITATION,
        semanticRelations: [...Uri.RELATIONS_1, ...Uri.RELATIONS_2, ...Uri.RELATIONS_3],
        dataLinks: Uri.DATA_LINKS,
        visualization: [...Uri.PICTURE, ...Uri.VISUALIZATION],
        location: Uri.LOCATION,
        creator: Uri.CREATOR
    },
    FRONT_LIST: {
        prefLabel: Uri.PREF_LABEL,
        picture: Uri.PICTURE,
        altLabel: [...Uri.PREF_LABEL, ...Uri.SYNONYMS],
        notation: Uri.NOTATION,
        gbaStatus: Uri.GBA_STATUS,
        abstract: Uri.DESCRIPTION_1,
        citation: Uri.REF_LINKS,
        dataViewer: Uri.GBA_DATAVIEWER,
        relatedConcepts: [...Uri.RELATIONS_1, ...Uri.RELATIONS_2]
    },
    FRONT_LIST_EMBEDDED: {
        /*FOR EMBEDDED PAGE VERSION*/
        prefLabel: Uri.PREF_LABEL,
        picture: Uri.PICTURE,
        altLabel: [...Uri.PREF_LABEL, ...Uri.SYNONYMS],
        notation: Uri.NOTATION,
        gbaStatus: Uri.GBA_STATUS,
        abstract: Uri.DESCRIPTION_1,
        //dataViewer: Uri.GBA_DATAVIEWER,
        citation: Uri.REF_LINKS
    }
};
