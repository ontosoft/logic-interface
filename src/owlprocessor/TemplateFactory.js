import { graph, sym, match, lit, Namespace, term, quad } from "rdflib";
import { Form } from "./Form";
import { Element } from "./Element";
import { Action } from "./Action";
import { Template } from "./Template";
import {
    XSD, ILOGIC, RDF_TYPE_NODE, BLOCK_TYPE, CONTAINS_DATATYPE_NODE,
    BUTTON_TYPE, FIELD_TYPE, LABEL_TYPE, BLOCK_NODE, ACTION_NODE,
    CONNECTION_TYPE, BELONGS_TO, MODEL_BELONGS_TO_NODE, ACTIVATES_ACTION_NODE,
    HAS_SOURCE_NODE, HAS_DESTINATION_NODE, IS_RELATED_TO_TARGET_INSTANCE_NODE,
    GENERATED_ACCORDING_TO_MODEL_NODE, NAMED_INDIVIDUAL_TYPE, NAMED_INDIVIDUAL_NODE

} from "./InterfaceOntologyTypes";
import {
    isRdfType, isHasLabel, isFieldType, isButtonType, isLabelType, isHasConnection,
    isConnection, isElementOfFieldType, isElementOfButtonType, isValidDomainOntologyPredicate,
    generateHashCode
} from "./TemplateUtilities";


// This class contains a set of functions to extract a template for  
// forms and application logic out of the rdf graph which has been 
// already loaded to the store  
// The implementation is complex partially due to the lack of the rdflib 
// store to provide execution of SPARQL queries
export class TemplateFactory {
    constructor() {
        this.outputStore = null; //RDF store as a result of user maniputaltion with application forms
        this.rdfGraph = null;
        this.template = null;
        this.currentForm = null;
    }

    graph2Template = (rdfGraph) => {
        this.template = new Template();
        // Template part for all forms
        this.rdfGraph = rdfGraph;
        //Forms are at first populated
        this.readAllForms();
        //Adding Html elements to forms
        this.readBelongingElementsToForms();
        this.readElementProperties();
        this.readActions();
        this.updateElementsWithActions()
        this.setUpFirstForm();
        this.outputStore = graph();
        return this.template;
    }

    readAllForms = () => {
        this.template.forms = this.rdfGraph.match(null, RDF_TYPE_NODE, BLOCK_NODE, null)
            .map(triple => new Form(triple.subject));
        //Reading positions of forms in the overall application workflow
        //that value is particularly important for the starting form and it is 
        //represented by value 1 
        this.template.forms.forEach(form => {
            let hasPosition = ILOGIC("hasPositionNumber");
            let quads = this.rdfGraph.match(form.node, hasPosition, null, null)
            quads.forEach(q => { form.position = q.object.value })
            this.readModelPart(form);

        })

    }
    /**
     * 
     * This function reads a part of the model which corresponds to a given form.
     * That part of the model is considered as an implant which has to be populated
     * with corresponding data properties and inserted in the output knowledge graph 
     *
     */

    readModelPart = (form) => {
        let quads1 = this.rdfGraph.match(null, MODEL_BELONGS_TO_NODE, form.node, null)
        quads1.forEach(q1 => {
            let formModelImplantGraph = graph();
            //Copying all triples where the current model instance is a subject or an object 
            let quadsModelNodeSubject = this.rdfGraph.match(q1.subject, null, null, null);
            quadsModelNodeSubject.forEach(ql => {
                if (isValidDomainOntologyPredicate(ql.predicate)) {
                    //                    this.rdfGraph.match(ql.object, MODEL_BELONGS_TO_NODE, form.node, null).length > 0)
                    if (formModelImplantGraph.match(ql.subject, ql.predicate, ql.object).length === 0)
                        //duplicates are removed
                        formModelImplantGraph.add(ql);
                }
            });
            let quadsModelNodeObject = this.rdfGraph.match(null, null, q1.subject, null);
            quadsModelNodeObject.forEach(qr => {
                if (isValidDomainOntologyPredicate(qr.predicate)) {
                    if (formModelImplantGraph.match(qr.subject, qr.predicate, qr.object).length === 0)
                        //duplicates are removed
                        formModelImplantGraph.add(qr);
                }
            });
            form.model = formModelImplantGraph;
        })
    }

    readBelongingElementsToForms = () => {
        this.template.forms.forEach((form) => {
            let foundElements = this.rdfGraph.match(null, BELONGS_TO, form.node, null);
            form.elements = foundElements.map(e => { return new Element(e.subject) });
        });
    }

    readElementProperties = () => {
        this.template.forms.forEach(form => form.elements.forEach((element) => {
            // get all quads where this element is the subject  
            let quadsElementSubject = this.rdfGraph.match(element.node, null, null, null);
            quadsElementSubject.forEach(quad => {
                if (isRdfType(quad.predicate)) {
                    if (isButtonType(quad.object)) {
                        element.type = BUTTON_TYPE;
                    } else if (isLabelType(quad.object)) {
                        //this is the case when label is independently defined 
                        element.type = LABEL_TYPE;
                    } else if (isFieldType(quad.object)) {
                        element.type = FIELD_TYPE;
                        this.readConnectedModelElement(element);
                    }
                } else if (isHasLabel(quad.predicate)) {
                    // setting up the label for any element
                    element.label = quad.object.value;
                }
            });
        }));
    }
    /** 
     * 
      Connecting the element field to a model instance of the domain ontology 
     * 
    */
    readConnectedModelElement = (element) => {
        let quadsDataPropertyType = this.rdfGraph.match(element.node, CONTAINS_DATATYPE_NODE,
            null, null);
        quadsDataPropertyType.forEach(q => { element.valueType = q.object });
        let modelInstances = this.rdfGraph.match(element.node, IS_RELATED_TO_TARGET_INSTANCE_NODE, null, null);
        if (!(modelInstances.length === 1)) {
            console.log("Field corresponding to the node " + element.node +
                " does not have proper number of model instances");
        } else {
            element.modelInstance = modelInstances[0].object;
        }
    }

    /**
     * Reading actions into the internal representation from the loaded file (rdfGraph)
     */

    readActions = () => {
        this.template.actions = this.rdfGraph.match(null, RDF_TYPE_NODE, ACTION_NODE, null)
            .map(triple => new Action(triple.subject));
        // get all properties of actions
        this.template.actions.forEach((action) => {
            // get all quads where this action is is the subject  
            let quadsActionSubject = this.rdfGraph.match(action.node, null, null, null);
            quadsActionSubject.forEach(quad => {
                if (isHasConnection(quad.predicate)) {
                    this.rdfGraph.match(quad.object, null, null, null).forEach(quad1 => {
                        if (isRdfType(quad1.predicate) && isConnection(quad1.object)) {
                            action.type = CONNECTION_TYPE;
                            let source, destination = null;
                            this.rdfGraph.match(quad.object, HAS_SOURCE_NODE, null, null)
                                .forEach(sQuad => { source = sQuad.object });
                            this.rdfGraph.match(quad.object, HAS_DESTINATION_NODE, null, null)
                                .forEach(dQuad => { destination = dQuad.object });
                            action.activity = {
                                connection: {
                                    source: source,
                                    destination: destination
                                }
                            }
                        }
                    })
                }
            });
        });
    }

    /* Each element of the template that activates an action is related to that action */
    updateElementsWithActions = () => {
        this.rdfGraph.match(null, ACTIVATES_ACTION_NODE, null, null)
            .forEach(quad => {
                this.template.forms.forEach((form) => {
                    form.elements.filter(e => e.node.value === quad.subject.value)
                        .forEach(e => e.action = this.template.actions
                            .find(a => a.node.value === quad.object.value));
                }
                );
            });
    }

    setUpFirstForm = () => {
        this.template.firstForm = this.template.forms.find((form) => {
            let hasPosition = ILOGIC("hasPositionNumber");
            let start = lit('1', undefined, XSD('int'));
            return this.rdfGraph.match(form.node, hasPosition, start, null).length > 0;
        });
    }

    generateCurrentForm = (formURI) => {
        if (formURI === "-1") {
            // the value "-1" denotes the starting form presented by the application
            this.currentForm = this.template.firstForm;
        } else {
            this.currentForm = this.template.forms.find(f => f.node.value === formURI)
        }
        this.currentForm.formFields = this.currentForm.elements.filter(element => {
            return (isElementOfFieldType(element) && element.label)
        }).map(element => {
            return {
                id: element.node.value,
                label: element.label,
                type: element.type
            }
        });
        //Read information about buttons into a separate list
        //TODO Should be change so that buttons go together with other elements 
        this.currentForm.formButtons = this.currentForm.elements.filter(element => {
            return (isElementOfButtonType(element) && element.action)
        })
            .map(element => {
                return {
                    button: {
                        label: element.label,
                        action: element.action.node.value
                    }
                }
            })
        return this.currentForm;
    }


    /** 
        Handling the case of storing connection 
     **/
    handleConnection = (modelAction, data) => {
        let temporaryGraph = graph();
        // going through the model implant one by one triplet (quadruplet in rdflib) is inserted into the
        // output graph with a new uniquely generated name/

        let namesToChange = {};
        this.currentForm.model.match(null, null, null, null).forEach(quad => {
            this.renameNamedIndividualsInImplant(temporaryGraph, namesToChange, quad);
        });

        // Insert the data from the HTML form into corresponding ontology data properties 
        data.insertedData.forEach(e => {
            //TODO: check whether the corresponding element is unique
            // Finding corresponding element in our internal representation of template 
            // and it's target ontology instance
            let element = this.currentForm.elements
                .find(formEl => {
                    return (typeof formEl.modelInstance !== 'undefined' &&
                        formEl.modelInstance !== null
                        && formEl.node.value === e.id)
                });
            let newSubject = JSON.parse(JSON.stringify(element.modelInstance));
            newSubject.value = namesToChange[element.modelInstance.value];
            temporaryGraph.add(newSubject, element.valueType,
                temporaryGraph.literal(e.value));
            // GENERATED_ACCORDING_TO_MODEL_NODE is a temporary property which is used during program execution
            temporaryGraph.add(newSubject, GENERATED_ACCORDING_TO_MODEL_NODE,
                element.modelInstance);
        });
        temporaryGraph.match(null, null, null, null).forEach(quad => {
            this.outputStore.add(quad);
        });

        console.log("New output graph");
        console.log(this.outputStore);
        
        console.log("All actions:")
        console.log(this.template.actions)
        let currentAction = this.template.actions.find( a => a.node.value === modelAction);
        console.log(currentAction);

        //this.generateCurrentForm();
        return this.outputStore;
    }

    /**
     * Each NameIndividual in the model implant has to be renamed to get a unique name by 
     * concatenating a random hash value to the URI of the original Implant individual
     */
    renameNamedIndividualsInImplant = (temporaryGraph, namesToChange, quad) => {
        //Generate for each NamedIndividual a new unique name 
        let newSubject = JSON.parse(JSON.stringify(quad.subject));
        let newObject = JSON.parse(JSON.stringify(quad.object));
        if (this.isNamedIndividual(quad.subject)) {
            if (!(quad.subject.value in namesToChange)) {
                namesToChange[quad.subject.value] = quad.subject.value + "_" + generateHashCode();
                newSubject.value = namesToChange[quad.subject.value];
            }
            else {
                newSubject.value = namesToChange[quad.subject.value];
            }
        }
        if (this.isNamedIndividual(quad.object)) {
            if (!(quad.object.value in namesToChange)) {
                namesToChange[quad.object.value] = quad.object.value + "_" + generateHashCode();
                newObject.value = namesToChange[quad.object.value];
            }
            else {
                newObject.value = namesToChange[quad.object.value];
            }
        }
        temporaryGraph.add(newSubject, quad.predicate, newObject);
    }

    isNamedIndividual = (element) => {
        let named = this.currentForm.model.match(element, RDF_TYPE_NODE, NAMED_INDIVIDUAL_NODE, null).length;
        if (named === 0) {
            return false;
        } else if (named > 1) {
            console.log('Named individual is specified multiple times.');
            return true;
        } else {
            return true;
        }
    }


}