import { OUTPUTGRAPH, TEMPLATES, RDFGRAPH, CURRENTFORM } from "./dataTypes";

export const initialData = {
    modelData: {
        [RDFGRAPH]: null,
        [TEMPLATES]: [],
        [CURRENTFORM]: {
                formFields: null
                },
        [OUTPUTGRAPH]: null

    },
    stateData: {
        running: false,
        editing: false,
        formCode: -1
    },

    newKnowledgeBase: []
}