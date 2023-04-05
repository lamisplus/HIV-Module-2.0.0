
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
    const [errors, setErrors] = useState({});
    useEffect(() => {
        //PrepSideEffect();
      }, []);
        //Get list of PrepSideEffect
        // const PrepSideEffect =()=>{
        // axios
        //     .get(`${baseUrl}application-codesets/v2/PREP_SIDE_EFFECTS`,
        //         { headers: {"Authorization" : `Bearer ${token}`} }
        //     )
        //     .then((response) => {
        //         //console.log(response.data);
        //         setAllergies(response.data);
        //     })
        //     .catch((error) => {
        //     //console.log(error);
        //     });
        
        // }

    
    let temp = { ...errors }

    //Handle CheckBox 
    const handleTpt =e =>{
        //setErrors({...errors, [e.target.name]: ""})            
        props.setTpt({...props.tpt, [e.target.name]: e.target.value})
    }


    return (
        <>  
        
            <Card className={classes.root}>
                <CardBody>   
                <h2 style={{color:'#000'}}>TPT Monitoring</h2>
                <br/>
                    <form >
     
                    <div className="row">
                        
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Weight</Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="weight"
                                        id="weight"
                                        onChange={handleTpt} 
                                        value={props.tpt.weight} 
                                    ></Input>
                                </InputGroup>                    
                                </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >TB Symptoms (cough, fever, night sweats, weight loss,contacts)</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="tbSymptoms"
                                    id="tbSymptoms"
                                    onChange={handleTpt} 
                                    value={props.tpt.pregnantStatus} 
                                ></Input>
                            </InputGroup>
                            </FormGroup>
                        </div>  
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Hepatitis Symptoms (Abdominal pain, nausea, vomiting, abnormal LFTs, Children: persistent irritability, yellowish
                            urine and eyes)
                            </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="hepatitisSymptoms"
                                    id="hepatitisSymptoms"
                                    onChange={handleTpt} 
                                    value={props.tpt.hepatitisSymptoms} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div> 
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Neurologic Symptoms (Numbness, tingling, paresthesias)
                            </Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="neurologicSymptoms"
                                    id="neurologicSymptoms"
                                    onChange={handleTpt} 
                                    value={props.tpt.neurologicSymptoms} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div> 
                        
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Rash </Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="rash"
                                    id="rash"
                                    onChange={handleTpt} 
                                    value={props.tpt.rash} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Adherence
                                ( {">"} 80% doses = Good
                                {"<"} 80% doses = bad
                                )
                            </Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="adherence"
                                    id="adherence"
                                    onChange={handleTpt} 
                                    value={props.tpt.adherence} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Referred for further services</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="referredForServices"
                                    id="referredForServices"
                                    onChange={handleTpt} 
                                    value={props.tpt.referredForServices} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div> 
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Outcome of IPT  
                            </Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="outComeOfIpt"
                                    id="outComeOfIpt"
                                    onChange={handleTpt} 
                                    value={props.tpt.outComeOfIpt} 
                                >
                                <option value="">Select</option>
                                <option value="IPT Completed">IPT Completed</option>
                                <option value="Developed active TB">Developed active TB</option>
                                <option value="Died">Died </option>
                                <option value="Transferred out">Transferred out </option>
                                <option value="Stopped IPT">Stopped IPT</option>
                                <option value="Lost to follow up">Lost to follow up </option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                        {props.tpt.outComeOfIpt!=="" && (
                        <div className="form-group mb-3 col-md-4">
                                    <FormGroup>
                                    <Label >Outcome Date </Label>
                                    <InputGroup> 
                                    <Input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={props.tpt.date}
                                    onChange={handleTpt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    max= {moment(new Date()).format("YYYY-MM-DD") }
                                    
                                    > 
                                </Input>
                               
                            </InputGroup>                                        
                            </FormGroup>   
                        </div>
                        )} 
                        {props.tpt.outComeOfIpt==="Stopped IPT" && (
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Reasons for stopping IPT  
                            </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="resonForStoppingIpt"
                                    id="resonForStoppingIpt"
                                    onChange={handleTpt} 
                                    value={props.tpt.resonForStoppingIpt} 
                                >
                                <option value="">Select</option>
                                <option value="Developed symptoms of hepatitis">Developed symptoms of hepatitis</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                        )} 
                    </div>
                    
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default Eligibility