import { graph, parse, sym, match } from "rdflib";

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
        const rdfFile = await this.readFile(fileName);
        let rdfGraph = graph();
        let doc = sym("http://example.org/logicinterface/restaurant");
        //       let contentType = "text/turtle";
        let contentType1 = "application/rdf+xml";
        let rdfParse = parse(rdfFile, rdfGraph, doc.uri, contentType1);
        return rdfGraph;
    }

}