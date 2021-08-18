# Ontology for Ontology-based Ontology Population (OBOP)

Description
-------------

OBOP is an ontology used as a meta-model to design grapical user interfaces for population of ontology instances. OBOP terms are combined with terms of other target ontologies in order to create models for web applications to populate ontology instances (knowledge graphs). The ontology can be found in the file ontology/obop.owl. This project contains a prototype of tool used to run models generated using OBOP ontology.

## Example of the OBOP model 

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


