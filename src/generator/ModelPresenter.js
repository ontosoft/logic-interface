import React, { Component } from "react";
import { connect } from "react-redux";
import { CURRENTFORM, OUTPUTGRAPH , RDFGRAPH, TEMPLATES } from "../data/dataTypes";
import {startRunningTemplate}  from "../data/StateActions";
import * as ModelActions from "../data/modelActionCreators";
import {createInnerTemplateAndCreateCurrentForm} from "../data/MultiActionCreators";


const mapDispatchToProps = {
    ...ModelActions, 
    processQuery: () => createInnerTemplateAndCreateCurrentForm(RDFGRAPH),
    startRunningTemplate
}

export const ModelPresenter = connect(store => store, mapDispatchToProps)(
    class extends Component {

        constructor(props) {
            super(props);
            this.selectors = {
                //templates: (storeState) => storeState.modelData[TEMPLATES],
                output: (storeState) => storeState.modelData[OUTPUTGRAPH] ,
                //graph: (storeState) => storeState.modelData[RDFGRAPH],
                currentForm: (storeState) => storeState.modelData[CURRENTFORM],
                state: (storeState) => storeState.stateData
            }
            this.state = this.selectData();
        }

        // processQuery = () => {
        //     this.props.createInnerTemplateAndCreateCurrentForm(RDFGRAPH)
        //     //            this.props.processGraph(RDFGRAPH);
        //     //this.props.startRunningTemplate()
        //     //this.props.prepareFormData('-1');

        // }

        printState = () => {
            console.log("state");
            //debugger
            console.log(this.props.store.getState());
        }

        handleDataStoreChange (){
            let newData = this.selectData(); 
            Object.keys(this.selectors)
                .filter(key => this.state[key]!== newData[key])
                .forEach(key => this.setState({[key] : newData[key]}));
        }

        componentDidMount = () => {
            this.unsubscriber = this.props.store.subscribe( () => this.handleDataStoreChange());
        }

        componentWillUnmount() {
            this.unsubscriber();
        }

        selectData() {
            let storeState = this.props.store.getState();
            return Object.entries(this.selectors).map(([k, v]) => [k, v(storeState)])
                .reduce((result, [k, v]) => ({ ...result, [k]: v }), {});
        }

        render() {
            return <div className="row">
                <div className="col-2">
                    <button className="btn btn-primary m-2"
                        onClick={this.props.processQuery} >
                        Run model
            </button>
                    <button className="btn btn-secondary m-2"
                        onClick={this.printState} >
                        Export output file
            </button>

                </div>
                <div className="col">
                    <div className="bg-info">
                        <pre className="text-white">
                            {JSON.stringify(this.state, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        }
    })