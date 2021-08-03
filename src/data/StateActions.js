import { TEMPLATES, ITEMS } from "./dataTypes";

export const STATE_START_EDITING = "state_start_editing";
export const STATE_START_CREATING = "state_start_creating";
export const STATE_END_EDITING = "state_end_editing";
export const STATE_START_RUNNING = "state_start_running";

export const startEditingItem = (item) => ({
    type: STATE_START_EDITING,
    dataType: ITEMS,
    payload: item
})

export const startRunningTemplate = () => ({
    type: STATE_START_RUNNING
})

export const endEditing = () => ({
    type: STATE_END_EDITING
})

