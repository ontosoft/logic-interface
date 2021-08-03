import {Namespace } from "rdflib";

export const RDF = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
export const RDFS = Namespace("http://www.w3.org/2000/01/rdf-schema#");
export const XSD =  Namespace("http://www.w3.org/2001/XMLSchema#");
export const ILOGIC = Namespace("http://dms.org/logicinterface/");
export const OWL = Namespace("http://www.w3.org/2002/07/owl#");

const RDFPREFIX = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
const RDFSPREFIX = "http://www.w3.org/2000/01/rdf-schema#";
const ILOGICPREFIX = "http://dms.org/logicinterface/"; 
const OWLPREFIX = "http://www.w3.org/2002/07/owl#"; 

export const RDF_TYPE = RDFPREFIX+"type";
export const RDF_TYPE_NODE = RDF("type");
export const RDF_LABEL = RDFSPREFIX+"label";
export const RDF_LABEL_NODE = RDFS("label");

export const BLOCK_TYPE = ILOGICPREFIX+"Block";
export const BLOCK_NODE = ILOGIC("Block");

export const BUTTON_TYPE =  ILOGICPREFIX+"Button";
export const BUTTON_NODE = ILOGIC("Button");
export const LABEL_TYPE =  ILOGICPREFIX+"Label";
export const LABEL_NODE = ILOGIC("Label");
export const FIELD_TYPE =  ILOGICPREFIX+"Field";
export const FIELD_NODE = ILOGIC("Field");
export const NAMED_INDIVIDUAL_TYPE =  OWLPREFIX+"NamedIndividual";
export const NAMED_INDIVIDUAL_NODE =  OWL("NamedIndividual");
export const ACTION_TYPE = ILOGICPREFIX + "Action";
export const ACTION_NODE = ILOGIC("Action");
export const CONTAINS_DATATYPE_TYPE =  ILOGICPREFIX + "containsDatatype";
export const CONTAINS_DATATYPE_NODE = ILOGIC("containsDatatype");
export const BELONGS_TO = ILOGIC("belongsTo");
export const HAS_CONNECTION_NODE = ILOGIC("hasConnection");
export const HAS_CONNECTION_TYPE = ILOGICPREFIX+"hasConnection";
export const HAS_LABEL_NODE = ILOGIC("hasLabel");
export const HAS_LABEL_TYPE = ILOGICPREFIX+"hasLabel";
export const HAS_SOURCE_NODE = ILOGIC("hasSource");
export const HAS_SOURCE_TYPE = ILOGICPREFIX+"hasSource";
export const HAS_DESTINATION_NODE = ILOGIC("hasDestination");
export const HAS_DESTINATION_TYPE = ILOGICPREFIX+"hasDestination";

//model belongs to indicate block (form) to which this part of the 
//model ontology belongs
export const MODEL_BELONGS_TO_NODE = ILOGIC("modelBelongsTo");
export const MODEL_BELONGS_TO_TYPE = ILOGICPREFIX + "modelBelongsTo";
export const IS_RELATED_TO_TARGET_INSTANCE_NODE = ILOGIC("isRelatedToTargetOntologyInstance");
export const IS_RELATED_TO_TARGET_INSTANCE_TYPE = ILOGICPREFIX+"isRelatedToTargetOntologyInstance";
export const ACTIVATES_ACTION_NODE = ILOGIC("activatesAction");
export const ACTIVATES_ACTION__TYPE = ILOGICPREFIX+"activatesAction";
export const GENERATED_ACCORDING_TO_MODEL_NODE = ILOGIC("generatedAccordingToModel");
export const GENERATED_ACCORDING_TO_MODEL_TYPE = ILOGICPREFIX+"generatedAccordingToModel";


export const CONNECTION_TYPE = ILOGICPREFIX+"Connection";
