import React, { Component } from "react";
import { ValidationError } from "./ValidationError";
import { GetMessages } from "./ValidationMessages";

export class FormToValidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationErrors: {}
        }
        this.formElements = {};
    }


    handleSubmit = (event) => {
        this.setState(state => {
            const newState = {
                ...state, validationErrors: {},
            };
            Object.values(this.formElements).forEach(elem => {
                if (!elem.checkValidity()) {
                    newState.validationErrors[elem.name] = GetMessages(elem);
                }
            })
            return newState;
        },  () => {
            if (Object.keys(this.state.validationErrors).length === 0) {
                const data = Object.entries(this.formElements)
                    .map(e => ({ id : e[1].id , value : e[1].value }));
                const activatedAction = {
                    type: "connection",
                    name: event.target.id
                };
                this.props.submitCallback(data, activatedAction);
            }
        });
    }

    registerRef = (element) => {
        if (element !== null) {
            this.formElements[element.name] = element;
        }
    }

    renderElement = (modelItem) => {
        const name = modelItem.name || modelItem.label.toLowerCase();
        return <div className="form-group" key={modelItem.label}>
            <label>{modelItem.label}</label>
            <ValidationError errors={this.state.validationErrors[name]} />
            <input className="form-control" name={name} ref={this.registerRef} 
                id = {modelItem.id}
                {...this.props.defaultAttrs} {...modelItem.attrs} />
        </div>
    }
    renderAction = (modelItem) => {
        return <div className="text-center">
            <button className="btn btn-secondary m-1"
                onClick={this.props.cancelCallback}>
                {this.props.cancelText || "Cancel"}
            </button>
            <button className="btn btn-primary m-1" id = {modelItem.button.action}
                onClick={this.handleSubmit}>
                {this.props.submitText || "Submit"}
            </button>
        </div>
    }

    render() {
        return <React.Fragment>
            {this.props.formModel.map(m => this.renderElement(m))}
            {this.props.formButtons.map(m => this.renderAction(m))}
        </React.Fragment>
    }
}