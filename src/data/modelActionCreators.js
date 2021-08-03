import { CURRENTFORM, ITEMS, OUTPUTGRAPH, TEMPLATES } from "./dataTypes";
import { ModelActionTypes } from "./ModelActionTypes";
import { TemplateDataSource } from "../owlprocessor/TemplateDataSource";

let idCounter = 1;
const dataSource = new TemplateDataSource();

// Load a template (RDF file with the model of a graph) from a file 
export const loadTemplate = (dataType, fileName) => ({
    type: ModelActionTypes.DATA_LOAD,
    dataType: dataType,
    payload: dataSource.getData(dataType, fileName)
        .then(response =>
        ({
            data: response
        }))
})
// Transform the RDF graph into an inner template
export const processGraph = (dataType) => {
    return {
        type: ModelActionTypes.TRANSFER,
        convertTo: TEMPLATES,
        dataType: dataType
    }
}

export const prepareFormData = (formCode) => {
    return {
        type: ModelActionTypes.READ,
        dataType: CURRENTFORM,
        payload: formCode
    }
}

export const saveTemplate = (template) => {
    return createSaveEvent(TEMPLATES, template);
}

/** Creating actions for all action types defined in the logicinterface ontology
 */
export const generalAction = (data, action) => {
    return {
        type: action.type,
        dataType: OUTPUTGRAPH,
        modelAction: action.name,
        payload: data
    }
}

export const saveItem = (item) => {
    return createSaveEvent(ITEMS, item);
}

const createSaveEvent = (dataType, payload) => {
    if (!payload.id) {
        return {
            type: ModelActionTypes.STORE,
            dataType: dataType,
            payload: { ...payload, id: idCounter++ }
        }
    } else {
        return {
            type: ModelActionTypes.UPDATE,
            dataType: dataType,
            payload: payload
        }
    }
}


