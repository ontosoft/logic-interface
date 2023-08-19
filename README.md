# Ontology for Ontology-based Ontology Population (OBOP)

Description
-------------

OBOP is an ontology used as a meta-model to design  user interfaces for population of knowledge graphs. OBOP terms are combined with terms of other target ontologies in order to create models for web applications or conversational agents, such as chatbots, which facilitate the population of knowledge graphs. The ontology can be found in the file ontology/obop.owl.  

Within this project, a prototype tool has been developed to run the models of web applications generated using OBOP ontology. The prototype tool for executing chatbots generated using models (generated using the OBOP as well) can be found in the repository <a href="https://github.com/ontosoft/ontochatbot" target="_blank">Ontology-based chatbots for Ontology population</a>
  

### Files

|Version|Filename|PURL Link|
|---|---|---|
|Developement|ontology/obop.owl|http://purl.org/net/obop.owl| 

## Example of the OBOP model for a web application 

An example of OBOP instance can be found in src/restaurant-example.owl. This model specifies an application to populate simple ontology with restaurant data.  

Requirements
-------------
The prototype is implemented in JavaScript as single page application using Node.js and framework React.js. In order to run the application, the user has to have Node.js  and NPM installed.

### Instructions

After cloning the project, it is started by running the script:

### `npm install`

In the project directory, you can run:

### `npm start`

This runs the app to show examples of interface generation.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The default example is loaded by clicking on "Load model" in the application opened in the browser.  


