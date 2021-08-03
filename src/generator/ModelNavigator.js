import React, { Component } from "react";
import { connect } from "react-redux";
import { RDFGRAPH  } from "../data/dataTypes";
import * as  ModelActions  from "../data/modelActionCreators";
import fileName from '../restaurant-example.owl';

const mapDispatchToProps = {...ModelActions}

// Chose a model to load 
export const ModelNavigator = connect(store => store, mapDispatchToProps )(
        class extends Component{

    getData = () => {
        this.props.loadTemplate(RDFGRAPH,fileName);
    }

    render(){
        return (<div>
            <button className="btn btn-primary m-2"
                onClick={this.getData} >
                Load model
            </button>
        </div>)
    }
});