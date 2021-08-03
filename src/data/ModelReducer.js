import { ActionProcessor } from "../owlprocessor/ActionProcessor";
import { TemplateFactory } from "../owlprocessor/TemplateFactory";
import { TEMPLATES } from "./dataTypes";
import { initialData } from "./initialData";
import { ModelActionTypes } from "./ModelActionTypes";

const owlTemplate = new TemplateFactory();
const owlProcessor = new ActionProcessor ();

export const ModelReducer = (storeData, action) => {
    switch (action.type) {
        case ModelActionTypes.DATA_LOAD:
            return {
                ...storeData,
                [action.dataType]: action.payload.data
            }
        case ModelActionTypes.STORE:
            return {
                ...storeData,
                [action.dataType]:
                    storeData[action.dataType].concat([action.payload])
            }
        case ModelActionTypes.DELETE:
            return {
                ...storeData,
                [action.dataType]:
                    storeData[action.dataType]
                        .filter(item => item.id !== action.payload)
            }
        //from an Rdf graph to a local Template object
        case ModelActionTypes.TRANSFER:
            return {
                ...storeData,
                [action.convertTo]: owlTemplate
                    .graph2Template(storeData[action.dataType])
            }
            break;
        // the current form is set up  
        case ModelActionTypes.READ:
            return {
                ...storeData,
                [action.dataType]: owlTemplate
                    .generateCurrentForm(action.payload)

            }
            break;
        case ModelActionTypes.CONNECTION:
            return {
                ...storeData,
                [action.dataType]: owlTemplate
                    .handleConnection(action.modelAction, action.payload)
            };
            break;
        default:
            return storeData || initialData.modelData;
    }
}