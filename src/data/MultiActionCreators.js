import { ITEMS } from "./dataTypes";
import { saveItem, saveTemplate, processGraph, prepareFormData } from "./modelActionCreators";
import {startRunningTemplate} from "./StateActions";
import { endEditing } from "./StateActions";

export const saveAndEndEditing = (data, dataType) =>
    [dataType === ITEMS
        ? saveItem(data) : saveTemplate(data), endEditing]

export const createInnerTemplateAndCreateCurrentForm = (dataType) =>
    [ processGraph(dataType),
       prepareFormData('-1'), 
       startRunningTemplate()]

