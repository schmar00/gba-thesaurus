// language context
"use strict";
var lang = {
    load: function (id) {
        this.ID = id || "de";
        var f = this[id] || this.DE;
        f.call(this);
        // after lang loaded:
        this.LIST_THESAURUS_PROJECTS = [this.GeologicUnitDesc, this.lithologyDesc, this.structureDesc, this.GeologicTimeScaleDesc, this.tectonicunitDesc, this.mineralDesc, this.minresDesc];
    },
    // loading functions, one for each language
    de: function () {
        this.LABEL_LICENSE = 'Nutzungsbedingungen';
        this.LABEL_DISCLAIMER = 'Haftungsausschluss';
        this.LABEL_SERVICES = 'Services';
        this.LABEL_CONTACT = 'Kontakt';
        this.LABEL_SEARCH = 'thesaurus';
        this.TIP_SEARCH = 'Suchen...';
        this.TITLE_SEARCHRESULTS = 'Suchergebnisse';
        this.HITS_SEARCHRESULTS = '0 Treffer zu ';
        this.LABEL_BIBLREF = 'Quellverzeichnis';
        this.IMG_GBALOGO = 'gbaLogo50.png';
        this.APPS = 'Anwendungen';
        this.TOPIC = 'Thema';
        this.DB_QUERY = 'Datenbankabfrage (SPARQL)';
        this.EXAMPLE_QUERY = 'Beispiele f&uuml;r Abfragen';
        this.SEM_REL = 'Verwandte Begriffe, Relationen';
        this.descriptions_H = 'Beschreibungen';
        this.scientificReferences_H = 'Quellverweise';
        this.semanticRelations_H = 'Semantische Relationen';
        this.dataLinks_H = 'Downloads';
        this.visualization_H = 'Grafische Darstellung';
        this.location_H = 'Ortsbezug';
        this.creator_H = 'Bearbeitung';
        this.TITLE_THES_2 = 'ein kontrolliertes Vokabular geowissenschaftlicher Begriffe';
        this.DESC_THESAURUS = '..zweisprachig (Deutsch, Englisch), wie sie in den Textpublikationen und Karten der Geologischen Bundesanstalt verwendet werden<br>..entworfen als Wissensrepr&auml;sentation der Geologischen Bundesanstalt, im Gegensatz zu nationalen und internationalen Standards, Klassifikationen oder Lexika<br>..formatiert als <a href="http://www.w3.org/2004/02/skos/" title="SKOS Simple Knowledge Organization System" target="_blank">SKOS</a> Konzepte (Begriffe, einschlie&szlig;lich Synonyme), mit eigenen Web-Adressen &#8594; <a href="http://de.wikipedia.org/wiki/Uniform_Resource_Identifier" title="URI Uniform Resource Identifier" target="_blank">URI\'s</a><br>..definiert durch polyhierarchische Beziehungen als &uuml;ber-, untergeordnete, und verwandte Konzepte innerhalb eines Themenbereichs, mit Beschreibungen und Quellenangabe &#8594; <a href="bibl_res.html" target="_blank">Literaturverzeichnis</a>';

        //************Description Objects**************
        this.DESC_INSPIRE = {
            id: 'inspire',
            image: 'INSPIRE.png',
            name: 'INSPIRE',
            desc: 'Mit der Erstellung von semantischen und technisch interoperablen Geodaten setzt die Geologische Bundesanstalt die gesetzlichen Verpflichtungen der EU-Direktive 2007/2/EC <a href="http://inspire.ec.europa.eu/registry/" title="INSPIRE Codes" target="_blank">INSPIRE</a> bzw. des Geodateninfrastrukturgesetzes 2010 <a href="http://www.parlament.gv.at/PAKT/VHG/XXIV/ME/ME_00055/index.shtml" title="Geodateninfrastrukturgesetz GeoDIG" target="_blank">GeoDIG</a> um. Die Daten der GBA werden hierbei mit Thesaurus-Konzepten attributiert, w&auml;hrend der Thesaurus gleichzeitig mit INSPIRE-Codes und weiteren international standardisierten Vokabularen verlinkt wird. Datens&auml;tze, die bereits nach INSPIRE harmonisiert wurden, k&ouml;nnen mit dem DataViewer (ein Erweiterungsmodul des GBA Thesaurus, dzt. im Testbetrieb) durchsucht werden.'
        };
        this.DESC_LINKEDDATA = {
            id: 'linkedData',
            image: 'linkedData.png',
            name: 'Linked Data',
            desc: 'Alle Begriffe sind als SKOS Konzepte formatiert (Begriffe, einschlie&szlig;lich Synonyme), mit eigenen Web-Adressen &#8594; <a href="http://de.wikipedia.org/wiki/Uniform_Resource_Identifier" title="URI Uniform Resource Identifier" target="_blank">URI\'s</a>, sowie durch polyhierarchische Beziehungen als &uuml;ber-, untergeordnete, und verwandte Konzepte innerhalb eines Themenbereichs definiert , mit Beschreibungen und Quellenangabe &#8594; Literaturverzeichnis<br>Als <a href="http://de.wikipedia.org/wiki/Linked_Open_Data" title="Linked Data" target="_blank">Linked Data</a> Resource ist sie semantisch mit anderen Resourcen im Web verlinkt &#8594; <a href="http://dbpedia.org/" title="DBpedia Knowledge Base" target="_blank">DBpedia</a>, <a href="http://inspire.ec.europa.eu/registry/" title="INSPIRE Codes" target="_blank">INSPIRE</a>, <a href="http://resource.geosciml.org/" title="Resources for Geosciences XML" target="_blank">GeoSciML</a> maschinenlesbar &uuml;ber Webservices (Endpoints) gem&auml;&szlig; den <a href="http://www.w3.org/2013/data/" title="The World Wide Web Consortium" target="_blank">W3C</a> Standards ver&ouml;ffentlicht &#8594 <a href="http://www.w3.org/RDF/" title="Resource Description Framework (RDF)" target="_blank">RDF</a>, <a href="http://www.w3.org/TR/rdf-sparql-query/" title="SPARQL Query Language for RDF" target="_blank">SparQL</a><br>zur Verwendung in Linked Data Webapplikationen, als Hyperlinks, oder als Kodierung f&uuml;r Geodaten &#8594; Datenharmonisierung, DataViewer'
        };
        this.GeologicUnitDesc = {
            id: 'GeologicUnit',
            image: 'profil.png',
            name: 'Geologische Einheiten',
            desc: 'Das Thema Geologische Einheiten umfasst verschiedene als Punkte, Linien oder Fl&auml;chen dargestellte Einheiten und Signaturen auf geologischen Karten. Derzeit sind neben den lithostratigraphischen Einheiten der &quot;Stratigraphischen Tabelle von &Ouml;sterreich&quot; (Piller et al., 2004) ebenso lithogenetische, allostratigraphische und geomorphologische Einheiten, sowie lithodemische Einheiten erfasst. Die meist geographischen, informellen Gliederungseinheiten der &quot;Stratigraphischen Tabelle von &Ouml;sterreich&quot;, wurden zus&auml;tzlich noch mit eckigen Klammern gekennzeichnet und sollten nicht zur Attributierung verwendet werden.'
        };
        this.structureDesc = {
            id: 'structure',
            image: 'falte.png',
            name: 'Geologische Strukturen',
            desc: 'Das Projekt Geologische Strukturen beinhaltet lineare und planare Strukturen in geologischen Karten, &uuml;berwiegend Deformationsstrukturen. Dar&uuml;ber hinaus sind Konzepte zu den Schersinn-Indikatoren verf&uuml;gbar.'
        };
        this.GeologicTimeScaleDesc = {
            id: 'GeologicTimeScale',
            image: 'time.png',
            name: 'Zeitskala',
            desc: 'Das Projekt Geologische Zeitskala umfasst chronostratigraphische und geochronologische Einheiten der &quot;Internationalen Stratigraphischen Tabelle&quot; (2013), der Internationalen Stratigraphischen Kommission sowie deren deutsche &Uuml;bersetzung, wie sie von der &Ouml;sterreichischen Stratigraphischen Kommission verwendet werden. Dar&uuml;ber hinaus sind sowohl die Stufengliederung der Paratethys als auch informelle Einheiten codiert, gegliedert in historische und regional verwendete Einheiten. Neben einer mono-hierarchischen Gliederung sind auch nicht-hierarchische Verwandtschaftsbeziehungen, z.B. zwischen Einheiten der Internationalen Stratigraphischen Tabelle und informellen Einheiten, formalisiert.'
        };
        this.lithologyDesc = {
            id: 'lithology',
            image: 'granit.png',
            name: 'Lithologie',
            desc: 'Das Thema Lithologie umfasst Locker- und Festgesteine, die nach ihrer modalen Zusammensetzung bzw. deren Korngr&ouml;&szlig;en klassifiziert werden. Die Klassifikation von magmatischen und polygenetischen Gesteinen, Metamorphiten und St&ouml;rungsgesteinen ist stark an die IUGS-Empfehlungen der Subkommission f&uuml;r die Systematik von magmatischen bzw. metamorphen Gesteinen angepasst; f&uuml;r sediment&auml;re Locker- und Festgesteine wurde auf g&auml;ngige internationale Standards zur&uuml;ckgegriffen.'
        };
        this.tectonicunitDesc = {
            id: 'tectonicunit',
            image: 'tektonik.png',
            name: 'Lithotektonische Einheiten',
            desc: 'Das Thema &quot;Lithotektonische Einheiten&quot; umfasst derzeit Konzeptschemen f&uuml;r eine formale Klassifikation lithotektonischer Einheiten und f&uuml;r lithotektonische Einheiten, wie sie zum Teil auch in Karten und Publikationen der Geologischen Bundesanstalt verwendet werden. Somit liegt der Schwerpunkt auf dem Bereich der Ostalpen bzw. deren Umgebung. Die Beschreibung der lithotektonischen Einheiten in &Ouml;sterreich bzw. deren hierarchische Einordnung in dieses System unterliegt einer laufenden &Uuml;berarbeitung und Erweiterung. Zurzeit sind daher nur die Hierarchieebenen bis zum Deckensystem konsolidiert und die dazugeh&ouml;rigen Informationen nur teilweise in Englisch verf&uuml;gbar.'
        };
        this.mineralDesc = {
            id: 'mineral',
            image: 'quarz.png',
            name: 'Minerale',
            desc: 'Das Thema &quot;Minerale&quot; beinhaltet derzeit die wichtigsten gesteinsbildenden Minerale, welche f&uuml;r die Themenbereiche der Geologie, Petrologie und Rohstoffgeologie an der Geologischen Bundesanstalt von Bedeutung sind. Die Auswahl erfolgte auf Basis einer Liste von Mineralen und ihren Abk&uuml;rzungen lt. Empfehlung der &quot;Subcommission on the Systematics of Metamorphic Rocks&quot; - SCMR (Fettes & Desmons 2001) sowie auf Basis des Projektes &quot;Systematische Erhebung von Bergbauen und Bergbauhalden mineralischer Rohstoffe im Bundesgebiet&quot; (Schedl et al. 2009). Als Referenz dient zus&auml;tzlich die CNMNC Liste von Mineralnamen der International Mineralogical Association (IMA) mit Stand 2014. Die Systematik der Minerale ist angelehnt an Strunz & Nickel (2001) und bezieht sich auf die chemisch-strukturellen Charakteristika.'
        };
        this.minresDesc = {
            id: 'minres',
            image: 'gold.png',
            name: 'Rohstoffgeologie',
            desc: 'Das Vokabular zum Thema &quot;Rohstoffgeologie&quot; umfasst Begriffe mit Bezug zur geologischen Erforschung der Vorkommen und Lagerst&auml;tten mineralischer Rohstoffe in &Ouml;sterreich und wird zur Beschreibung bzw. Indizierung von Datens&auml;tzen verwendet. Die vorliegenden Begriffe wurden &uuml;berwiegend f&uuml;r das Projekt Min4EU zusammengestellt, im Interaktiven Rohstoff-Informations-System (IRIS) verwendet und enthalten jeweils auch einen Bezug zu den betreffenden INSPIRE Auswahllisten. Die Beitr&auml;ge zu den einzelnen Rohstoffvorkommen bzw. die Beschreibung der minerogenetischen Bezirke erfolgen in enger Zusammenarbeit mit den Mitgliedern des Fachausschusses f&uuml;r Lagerst&auml;ttenforschung des Bergm&auml;nnischen Verband &Ouml;sterreichs.'
        };
        this.DESC_DISCLAIMER = '<h1>Haftungsausschluss:</h1>Die Geologische Bundesanstalt (GBA) &uuml;bernimmt keine Verantwortung f&uuml;r die Richtigkeit der Inhalte bzw. keine Haftung irgendeiner Art f&uuml;r die zur Verf&uuml;gung gestellten Informationen oder Services und etwaiger Folgesch&auml;den die aus deren Verwendung resultieren. Obwohl versucht wird die Daten sorgf&auml;ltig zu &uuml;berpr&uuml;fen sind die Inhalte dieser Seite nicht notwendigerweise vollst&auml;ndig, aktuell oder fehlerfrei. Die zur Verf&uuml;gung gestellten Daten und Dienste stellen eine (wissenschaftliche) Kompilation dar die nicht notwendigerweise die offizielle Meinung der GBA widerspiegelt. Es wird versucht die Information fehlerfrei und so aktuell wie m&ouml;glich zu halten, dar&uuml;ber hinaus wird versucht berichtete Fehler wenn m&ouml;glich zu korrigieren. Diese Webseite beinhaltet Links zu externen Seiten &uuml;ber die die GBA keine Kontrolle hat und daher keine Verantwortung &uuml;bernimmt. Weder die GBA noch Personen die in ihrem Auftrag handeln, k&ouml;nnen f&uuml;r die Inhalte auf dieser Webseite noch auf deren Verwendung in irgendeiner Weise haftbar gemacht werden. Die GBA beh&auml;lt sich das Recht vor die Inhalte dieser Seite bzw. die Nutzungsbedingungen ohne vorherige Ank&uuml;ndigung zu &auml;ndern. Der Nutzer nimmt diesen Haftungsausschluss ausdr&uuml;cklich zur Kenntnis.<br><br>Die Website nutzt die Standards HTML5/ES16/JQuery und wurde f&uuml;r die Ansicht in Firefox, Chrome, Safari oder Edge optimiert. MS InternetExplorer11 oder &auml;lter wird deshalb nicht mehr unterst&uuml;tzt.';
    },
    en: function () {
        this.LABEL_LICENSE = 'Terms of use';
        this.LABEL_DISCLAIMER = 'Disclaimer';
        this.LABEL_SERVICES = 'Services';
        this.LABEL_CONTACT = 'Contact';
        this.LABEL_SEARCH = 'thesaurus';
        this.TIP_SEARCH = 'Search for...';
        this.TITLE_SEARCHRESULTS = 'Search results';
        this.HITS_SEARCHRESULTS = '0 results for ';
        this.LABEL_BIBLREF = 'bibliographic references';
        this.IMG_GBALOGO = 'gbaLogo50EN.png';
        this.APPS = 'Applications';
        this.TOPIC = 'subject';
        this.DB_QUERY = 'Database query (SPARQL)';
        this.EXAMPLE_QUERY = 'Example queries';
        this.SEM_REL = 'Concept relations';
        this.descriptions_H = 'Descriptions';
        this.scientificReferences_H = 'Scientific references';
        this.semanticRelations_H = 'Semantic relations';
        this.dataLinks_H = 'Downloads';
        this.visualization_H = 'Visualization';
        this.location_H = 'Location';
        this.creator_H = 'Editing';
        this.TITLE_THES_2 = 'a controlled vocabulary for geosciences';
        this.DESC_THESAURUS = '..bilingual in german and english as used in geoscientific text publications and geological maps of the Geological Survey of Austria<br>..designed as a knowledge representation of the geological survey, in contrast to national and international standards, classifications or dictionaries<br>..formatted as <a href="http://www.w3.org/2004/02/skos/" title="SKOS Simple Knowledge Organization System" target="_blank">SKOS</a> concepts (terms, including synonyms), each with their own web addresses &#8594; <a href="http://en.wikipedia.org/wiki/Uniform_Resource_Identifier" title="URI Uniform Resource Identifier" target="_blank">URIs</a><br>..specified by polyhierarchical relationships as broader, narrower, and related concepts within the domain including descriptions and &#8594; <a href="bibl_res.html" target="_blank">bibliographic references</a>';

        //************Description Objects**************
        this.DESC_INSPIRE = {
            id: 'inspire',
            image: 'INSPIRE.png',
            name: 'INSPIRE',
            desc: 'With the creation of semantic and technically interoperable geodata sets the Geological Survey implements the legal requirements of the EU directive 2007/2/EC (<a href="http://inspire.ec.europa.eu/registry/" title="INSPIRE Codes" target="_blank">INSPIRE</a>) or rather the Austrian Geodateninfrastrukturgesetz 2010 (<a href="http://www.parlament.gv.at/PAKT/VHG/XXIV/ME/ME_00055/index.shtml" title="Geodateninfrastrukturgesetz GeoDIG" target="_blank">GeoDIG</a>). Therefore the datasets of the Geological Survey are coded with thesaurus terms, while the thesaurus is linked to INSPIRE terminology (and other internationally standardized vocabularies) at the same time. The DataViewer (beta) extension provides a way for testing selected concepts applied to the harmonization of map data.'
        };
        this.DESC_LINKEDDATA = {
            id: 'linkedData',
            image: 'linkedData.png',
            name: 'Linked Data',
            desc: 'formatted as SKOS concepts (terms, including synonyms), each with their own web addresses &#8594; <a href="http://en.wikipedia.org/wiki/Uniform_Resource_Identifier" title="URI Uniform Resource Identifier" target="_blank">URIs</a> - specified by polyhierarchical relationships as broader, narrower, and related concepts within the domain including descriptions and bibliographic references - as <a href="http://en.wikipedia.org/wiki/Linked_Open_Data" title="Linked Data" target="_blank">Linked Data</a> resource semantically linked to other web resources &#8594; <a href="http://dbpedia.org/" title="DBpedia Knowledge Base" target="_blank">DBpedia</a>, <a href="http://inspire.ec.europa.eu/registry/" title="INSPIRE Codes" target="_blank">INSPIRE</a>, <a href="http://resource.geosciml.org/" title="Resources for Geosciences XML" target="_blank">GeoSciML</a> - machine-readable published using web services (endpoints) according to the standards of <a href="http://www.w3.org/2013/data/" title="The World Wide Web Consortium" target="_blank">W3C</a> &#8594; <a href="http://www.w3.org/RDF/" title="Resource Description Framework (RDF)" target="_blank">RDF</a>, <a href="http://www.w3.org/TR/rdf-sparql-query/" title="SPARQL Query Language for RDF" target="_blank">SparQL</a> - to be used in Linked Data web applications such as hyperlinks for online texts or as encoding for geospatial data harmonizing data, DataViewer'
        };
        this.GeologicUnitDesc = {
            id: 'GeologicUnit',
            image: 'profil.png',
            name: 'Geologic Units',
            desc: 'The theme Geological Units comprises various units and symbols which were formalised as points, linear or polygonal features on geological maps and covers lithostratigraphic units of the Austrian Stratigraphic Chart (Piller et al., 2004), lithogenetic, lithodemic units and geomorphologic units. Informal subdivisions of the &quot;Stratigraphic Chart of Austria&quot; - most of them are geographic names - are indicated by square brackets and must not be used for coding.'
        };
        this.structureDesc = {
            id: 'structure',
            image: 'falte.png',
            name: 'Geologic Structures',
            desc: 'The Theme Geologic Structures includes linear and planar predominantly deformation structures in geologic maps. Shear sense indicators and fold structures are also covered by this theme.'
        };
        this.GeologicTimeScaleDesc = {
            id: 'GeologicTimeScale',
            image: 'time.png',
            name: 'Geologic Time Scale ',
            desc: 'The theme Geologic Time Scale covers chronostratigraphic and geochronologic Units of the International Stratigraphic Chart with a German translation based on the use by the Austrian Stratigraphic Commission. In addition the stages of the Paratethys as well as informal Units are structured in historic and regional concept schemes. Next to a mono-hierarchical structuring of individual micro-thesauri, non-hierarchical association relations between concepts of individual micro-thesauri are formalized.'
        };
        this.lithologyDesc = {
            id: 'lithology',
            image: 'granit.png',
            name: 'Lithology',
            desc: 'The theme Lithology comprises loose- and bed-rock, that were classified according to their modal composition or their grain size, respectively. The classification of magmatic-, polygenetic-, metamorphic- and fault-rocks are based on the IUGS recommendations by the sub-commissions for magmatic and metamorphic rocks, respectively. For sedimentary rocks the classifications were reverted to international standards.'
        };
        this.tectonicunitDesc = {
            id: 'tectonicunit',
            image: 'tektonik.png',
            name: 'Lithotectonic Units',
            desc: 'The theme Lithotectonic Units contains concept schemes for a formal classification of lithotectonic units and lithotectonic entities for the purpose of the Geological Survey of Austria. Therefore, the focus lies on the lithotectionic Units of the Eastern Alps and its surrounding. The description of lithotectonic units is undergoing continuous review and expansion and thus only consolidated down to the hierarchy of the nappe-system. Accordingly, not all descriptions and labels are available in English.'
        };
        this.mineralDesc = {
            id: 'mineral',
            image: 'quarz.png',
            name: 'Minerals',
            desc: 'The theme &quot;minerals&quot; currently contains the most important rock-forming minerals for the thematic areas of geology, petrology and mineral resources at the Geological Survey of Austria. The selection is based on a list of minerals and their abbreviations as per recommendation of &quot;Subcommission on the Systematics of Metamorphic Rocks&quot; - SCMR (Fettes & Desmons 2001) and on the project &quot;Systematische Erhebung von Bergbauen und Bergbauhalden mineralischer Rohstoffe im Bundesgebiet&quot; (Schedl et al. 2009). As additional source we used the the official IMA-CNMNC List of Mineral Names 2014. The classification of minerals is based on Strunz & Nickel (2001) and refers to the chemical and structural characteristics.'
        };
        this.minresDesc = {
            id: 'minres',
            image: 'gold.png',
            name: 'Mineral resources',
            desc: 'The vocabulary on &quot;Mineral Resources&quot; includes concepts related to the geological investigation on occurrences and deposits of mineral resources in Austria and is used to describe or encode datasets. These terms were mainly compiled for the Min4EU project, used in the Interactive Resource Information System (IRIS) and also contain a reference to the according INSPIRE code lists. The contributions to the individual mineral deposits or the description of the mineralogenetic districts are made in close cooperation with the members of the expert committee for deposit research of the &quot;Bergm&auml;nnischer Verband &Ouml;sterreichs&quot;.'
        };

        this.DESC_DISCLAIMER = '<h1>Disclaimer:</h1>The Geological Survey of Austria takes no responsibility for the correctness of the contents and no liability (of any sorts) for the information and services provided and possible consequential damage resulting from the use of these. Although we try to scrutinise our data the information on this site is not necessarily complete, up to date or accurate. The provided data and services represent a scientific compilation that may not reflect the official opinion of the Geological Survey of Austria. We try to keep our data as accurate and up to date as possible and in addition we attempt to correct errors if they are reported to us. This website contains links to other external sites over which the Geological Survey of Austria has no control and therefore can take no responsibility. Neither the Geological Survey of Austria nor persons acting in their behalf can be held liable for the contents of this website or their use. The Geological Survey of Austria reserves its right to change the contents of this website and its terms of use without prior announcement. The user of this site takes note and approves this disclaimer.<br><br>The application uses standards like HTML5/ES16/JQuery and is best viewed with Firefox, Chrome, Safari or Edge. MS InternetExplorer11 and older versions are not supported.';
    },
    // current langId
    ID: null
};
