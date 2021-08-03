import { STATE_START_EDITING, STATE_END_EDITING, STATE_START_CREATING, STATE_START_RUNNING } 
    from "./StateActions";
import { initialData } from "./initialData";

export const StateReducer = (storeData, action) => {
    switch(action.type) {

        case STATE_START_RUNNING:
            return {
                ...storeData,
                running: true
            }
            break;
        case STATE_START_EDITING:
        case STATE_START_CREATING: 
            return {
                ...storeData,
                editing: true,
                selectedId: action.type === STATE_START_EDITING
                    ? action.payload.id: -1,
                selectedType: action.dataType
            }
            break;
        case STATE_END_EDITING:
            return {
                ...storeData,
                editing: false
            }
            break;
        default: 
            return storeData || initialData.stateData;
    }
}