import React, { Component } from "react";
import { connect } from "react-redux";
import { CURRENTFORM } from "../data/dataTypes";
import { generalAction, prepareFormData } from "../data/modelActionCreators";
import { GeneralForm } from "./GeneralForm";


const mapStateToProps = (storeData) => {
    return ({
        running: storeData.stateData.running,
        selected: storeData.modelData.current_form,
        formData: storeData.modelData[CURRENTFORM],
        formFields: storeData.modelData[CURRENTFORM].formFields,
        formButtons: storeData.modelData[CURRENTFORM].formButtons 
    });
}

const mapDispatchToProps = {
    prepareForm: prepareFormData,
    generalAction: generalAction
}


const connectFunction = connect(mapStateToProps, mapDispatchToProps);
export const ItemDisplay = connectFunction(
    class extends Component {
        componentDidMount() {
        }

        render() {
            if (this.props.running) {
                return <GeneralForm { ... this.props} formModel = {this.props.formFields}/>
            } else {
                return <div className="m-2">
                    < div className="text-center" >
                        <pre>
                            Model is not yet loaded
                        </pre>
                    </div >
                </div >
            }
        }
    })