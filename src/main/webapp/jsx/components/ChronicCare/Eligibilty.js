
import React, { useEffect, useState} from "react";
import axios from "axios";
import {FormGroup, Label , CardBody, Spinner,Input,Form, InputGroup} from "reactstrap";
import * as moment from 'moment';
import {makeStyles} from "@material-ui/core/styles";
import {Card, } from "@material-ui/core";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { useHistory, } from "react-router-dom";
// import {TiArrowBack} from 'react-icons/ti'
import {token, url as baseUrl } from "../../../api";
import 'react-phone-input-2/lib/style.css'
import 'semantic-ui-css/semantic.min.css';
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import 'react-phone-input-2/lib/style.css'
import { Button} from 'semantic-ui-react'


const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardBottom: {
        marginBottom: 20,
    },
    Select: {
        height: 45,
        width: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        "& .card-title":{
            color:'#fff',
            fontWeight:'bold'
        },
        "& .form-control":{
            borderRadius:'0.25rem',
            height:'41px'
        },
        "& .card-header:first-child": {
            borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0"
        },
        "& .dropdown-toggle::after": {
            display: " block !important"
        },
        "& select":{
            "-webkit-appearance": "listbox !important"
        },
        "& p":{
            color:'red'
        },
        "& label":{
            fontSize:'14px',
            color:'#014d88',
            fontWeight:'bold'
        },
        
    },
    demo: {
        backgroundColor: theme.palette.background.default,
    },
    inline: {
        display: "inline",
    },
    error:{
        color: '#f85032',
        fontSize: '12.8px'
    }
}));


const Eligibility = (props) => {
    const classes = useStyles();
    const handleEligibility =e =>{
        props.setEligibility({...props.eligibility, [e.target.name]: e.target.value})        
    }

    return (
        <>  
        
            <Card className={classes.root}>
                <CardBody>   
                <h2 style={{color:'#000'}}>Eligibility Assessment</h2>
                <br/>
                    <form >
     
                    <div className="row">
                    <div className="form-group mb-3 col-md-8"></div>
                    <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label >Type Of Client</Label>
                        <InputGroup> 
                            <Input 
                                type="select"
                                name="typeOfClient"
                                id="typeOfClient"
                                onChange={handleEligibility} 
                                value={props.eligibility.typeOfClient} 
                            >
                            <option value="">Select</option>
                            <option value="PLHIV New enrolled into HIV Care & Treatment">PLHIV New enrolled into HIV Care & Treatment</option>
                            <option value="Registered PLHIV on follow up/subsequent visit this FY">Registered PLHIV on follow up/subsequent visit this FY</option>
                            <option value="Registered PLHIV on first time visit this FY">Registered PLHIV on first time visit this FY</option>
                            </Input>
                        </InputGroup>                    
                        </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label >Pregnancy/Breastfeeding Status</Label>
                        <InputGroup> 
                            <Input 
                                type="select"
                                name="pregnantStatus"
                                id="pregnantStatus"
                                onChange={handleEligibility} 
                                value={props.eligibility.pregnantStatus} 
                            >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Uncertain">Uncertain</option>
                            </Input>
                        </InputGroup>
                        </FormGroup>
                    </div> 
                    </div>
                    <div className="row">
                    <h3>ART Status : Pre-ART </h3>
                     <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Current Clinical Status(WHO Statging)</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="whoStaging"
                                    id="whoStaging"
                                    onChange={handleEligibility} 
                                    value={props.eligibility.whoStaging}  
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>

                            </InputGroup>
                        
                            </FormGroup>
                     </div>  
                     <div className="form-group mb-3 col-md-6"></div>
                     <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Last CD4 Result</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="lastCd4Result"
                                    id="lastCd4Result"
                                    value={props.eligibility.lastCd4Result} 
                                />
                            </InputGroup>
                        
                            </FormGroup>
                     </div>
                     <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Last Viral Load Result</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="lastViralLoadResult"
                                    id="lastViralLoadResult"
                                    value={props.eligibility.lastViralLoadResult}  
                                />
                            </InputGroup>
                            </FormGroup>
                     </div>
                     <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Eligible for Viral Load</Label>
                            <InputGroup> 
                                <Input 
                                type="select"
                                name="eligibleForViralLoad"
                                id="eligibleForViralLoad"
                                onChange={handleEligibility} 
                                value={props.eligibility.eligibleForViralLoad} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </Input>
                            </InputGroup>
                        
                            </FormGroup>
                     </div>
                     </div>
                    <br/>
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default Eligibility