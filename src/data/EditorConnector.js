import { connect } from "react-redux"
import { TEMPLATES, ITEMS } from "./dataTypes";
import { saveAndEndEditing } from "./MultiActionCreators";
import { endEditing, startEditingItem } from "./StateActions";

export const EditorConnector = (dataType, presentationComponent) => {

    const mapStateToProps = (storeData, ownProps) => ({
        editing: storeData.stateData.editing
            && storeData.stateData.selectedType === dataType,
        item: (storeData.modelData[ITEMS]
            .find(i => i.id === storeData.stateData.selectedId)) || {},
        template: (storeData.modelData[TEMPLATES]
            .find(s => s.id === storeData.stateData.selectedId)) || {}
    })

    const mapDispatchToProps = {
        cancelCallback: endEditing,
        saveCallback: (data) => saveAndEndEditing(data, dataType)

    }
    return connect(mapStateToProps, mapDispatchToProps)(presentationComponent);

}