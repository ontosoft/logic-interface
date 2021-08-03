import React, { Component } from "react";
import { FormToValidate } from "../forms/FormToValidate";
import { BrowserRouter as Router } from "react-router-dom"
import { withRouter } from 'react-router-dom';

class GForm extends Component {

    constructor(props) {
        super(props);
        this.defaultAttributes = { type: "text", required: true };
        this.formModel = this.props.formModel;
        this.activatedAction = null;
        this.processStage = null;
    }



    handleSubmit = (formData, activatedAction) => {
        const content = {
            insertedData: formData, processStage: this.processStage,
        }
        this.props.generalAction(content, activatedAction);
        this.props.history.push("/");
    }

    handleCancel = () => {
        this.props.history.push("/")
    }
    render() {
        return <Router>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-dark text-white">
                        <div className="navbar-brand">Restaurant</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col m-2">
                        <FormToValidate {... this.props} formModel={this.formModel}
                            action={this.activatedAction}
                            defaultAttrs={this.defaultAttrs}
                            submitCallback={this.handleSubmit}
                            cancelCallback={this.handleCancel}
                            submitText="Save"
                            cancelText="Cancel" />
                    </div>
                </div>
            </div >
        </Router>
    };

}
const componentClassWithHistory = withRouter(GForm);
export {componentClassWithHistory as GeneralForm};
