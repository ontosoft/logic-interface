import { graph, parse, sym } from "rdflib";

export class TemplateDataSource {

    readFile = async(fileName) => {
        let fileContent = await fetch(fileName).then(response => response.text())
            .then(data => data)
            .catch((error) => {
                console.error('Error: Load file problems', error);
            });
        return fileContent;

    }

    getData = async(dataType, fileName) => {
        const rdffile = await this.readFile(fileName);
        let rdfgraph = graph();
        let doc = sym("http://example.org/logicinterface/restaurant");
        //       let contenttype2 = "text/turtle";
        let contenttype1 = "application/rdf+xml";
        let rdfparse = parse(rdffile, rdfgraph, doc.uri, contenttype1);
        return rdfgraph;
    }

}