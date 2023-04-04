
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
    const [objValues, setobjValues] = useState({currentlyOnTuberculosis:"", 
                                                tbTreatment:"", 
                                                tbTreatmentStartDate:"",
                                                coughing:"", 
                                                fever:"", 
                                                losingWeight:"", 
                                                nightSweats:"", 
                                                poorWeightGain:"", 
                                                historyWithAdults:"",
                                                outcome:"",
                                                priorInh:"",
                                                highAlcohol:"",
                                                activeHepatitis:"",
                                                age1year:"",
                                                poorTreatmentAdherence:"",
                                                abnormalChest: "",
                                                activeTb:"",
                                                contraindications :"",
                                                eligibleForTPT:""
                                                });
    let temp = { ...errors }
    useEffect(() => {
        // Start of contraindications logic 
        if((objValues.priorInh!=="" && objValues.priorInh===true )
         || (objValues.highAlcohol!=="" && objValues.highAlcohol===true) 
         || (objValues.activeHepatitis!=="" && objValues.activeHepatitis===true)
         || (objValues.age1year!=="" && objValues.age1year===true)
         || (objValues.poorTreatmentAdherence!=="" && objValues.poorTreatmentAdherence===true)
         || (objValues.abnormalChest!=="" && objValues.abnormalChest===true)
         || (objValues.activeTb!=="" && objValues.activeTb===true))
         {
            //objValues.contraindications="Yes"
            setobjValues({...objValues, ['contraindications']: "Yes"})
        }else if((objValues.priorInh==="" || objValues.priorInh===false )
        && (objValues.highAlcohol==="" || objValues.highAlcohol===false) 
        && (objValues.activeHepatitis==="" || objValues.activeHepatitis===false)
        && (objValues.age1year==="" || objValues.age1year===false)
        && (objValues.poorTreatmentAdherence==="" || objValues.poorTreatmentAdherence===false)
        && (objValues.abnormalChest==="" || objValues.abnormalChest===false)
        && (objValues.activeTb==="" || objValues.activeTb===false)){
            setobjValues({...objValues, ['contraindications']: ""})
        
        }
        //End of contraindications logic

        // Start of Outcome logic 
        if((objValues.coughing!=="" && objValues.coughing==="Yes" )
         || (objValues.fever!=="" && objValues.fever==="Yes") 
         || (objValues.losingWeight!=="" && objValues.losingWeight==="Yes")
         || (objValues.nightSweats!=="" && objValues.nightSweats==="Yes")
         || (objValues.poorWeightGain!=="" && objValues.poorWeightGain==="Yes")
         || (objValues.historyWithAdults!=="" && objValues.historyWithAdults==="Yes")
          )
         {
            //objValues.contraindications="Yes"
            setobjValues({...objValues, ['outcome']: "Presumptive TB case (TB suspect)"})
        }else if((objValues.coughing==="" || objValues.coughing==="No") 
        && (objValues.fever==="" || objValues.fever==="No")
        && (objValues.losingWeight==="" || objValues.losingWeight==="No")
        && (objValues.nightSweats==="" || objValues.nightSweats==="No")
        && (objValues.poorWeightGain==="" || objValues.poorWeightGain==="No")
        && (objValues.historyWithAdults==="" || objValues.historyWithAdults==="No")){
            setobjValues({...objValues, ['outcome']: "No TB sign (not a suspect)"})
        }
        //End of Outcome logic
        //End of Eligible for TPT logic
        if(objValues.currentlyOnTuberculosis!=="" || objValues.currentlyOnTuberculosis==="No"){
            setobjValues({...objValues, ['eligibleForTPT']: "Yes"})
        }else if(objValues.currentlyOnTuberculosis!=="" || objValues.currentlyOnTuberculosis==="Yes"){
            setobjValues({...objValues, ['eligibleForTPT']: "No"})
        } 
        //End of Eligible for TPT logic
    }, [objValues.priorInh,objValues.highAlcohol,objValues.activeHepatitis,objValues.age1year,objValues.poorTreatmentAdherence,objValues.abnormalChest,objValues.activeTb,objValues.contraindications,
        objValues.coughing, 
        objValues.fever, 
        objValues.losingWeight, 
        objValues.nightSweats, 
        objValues.poorWeightGain, 
        objValues.historyWithAdults,
        objValues.outcome,
        objValues.eligibleForTPT,
        objValues.currentlyOnTuberculosis
    ]);
    
    const handleInputChange =e =>{
        setobjValues({...objValues, [e.target.name]: e.target.value})
        
        //making some fields to be empty once base on the business logic
        if(e.target.name==='currentlyOnTuberculosis' && e.target.value==='No'){
            objValues.tbTreatment=""
        }
        if(e.target.name==='tbTreatment' && e.target.value==='No'){
            objValues.tbTreatmentStartDate=""
        }
        
    }
    console.log(objValues)
    const handleInputChangeContrain =e =>{
       if(e.target.checked){ 
        setobjValues({...objValues, [e.target.name]: e.target.checked})
        }else{
            setobjValues({...objValues, [e.target.name]: false})
        }

    }
 //Validations of the forms
  const validate = () => {        
    //temp.screen_for_tb = objValues.screen_for_tb ? "" : "This field is required"

    setErrors({
        ...temp
    })
    return Object.values(temp).every(x => x === "")
  } 
     /**** Submit Button Processing  */
     const handleSubmit = (e) => { 
        e.preventDefault(); 
        if(validate()){
            // 
        }else{
            toast.error("All fields are required");
        }                 
    }


    return (
        <>  
        
            <Card className={classes.root}>
                <CardBody>   
                <h2 style={{color:'#000'}}>TB & IPT Screening </h2>
                <br/>
                    <form >
     
                    <div className="row">
                        <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Are you currently on Tuberculosis Preventive Therapy ( TPT )</Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="currentlyOnTuberculosis"
                                        id="currentlyOnTuberculosis"
                                        onChange={handleInputChange} 
                                        value={objValues.currentlyOnTuberculosis} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">YES</option>
                                    <option value="No">No</option>
                                    
                                    </Input>
                                </InputGroup>                    
                                </FormGroup>
                        </div>
                        {objValues.currentlyOnTuberculosis==='Yes' && (
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Are you currently on TB treatment?</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="tbTreatment"
                                    id="tbTreatment"
                                    onChange={handleInputChange} 
                                    value={objValues.tbTreatment} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div> 
                        )}
                        {objValues.tbTreatment==='Yes' && (
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >TB treatment start date </Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="tbTreatmentStartDate"
                                    id="tbTreatmentStartDate"
                                    onChange={handleInputChange} 
                                    value={objValues.tbTreatmentStartDate} 
                                >
                                
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                         )}
                        {(objValues.currentlyOnTuberculosis!=='' && objValues.currentlyOnTuberculosis==='No') || (objValues.tbTreatment!=='' && objValues.tbTreatment==='No') && (
                        <>
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Are you coughing currently? </Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="coughing"
                                        id="coughing"
                                        onChange={handleInputChange} 
                                        value={objValues.coughing} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </div> 
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Do you have fever for 2 weeks or more? (Unexplained fever) </Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="fever"
                                        id="fever"
                                        onChange={handleInputChange} 
                                        value={objValues.fever} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Are you losing weight? (Unplanned weight loss)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="losingWeight"
                                        id="losingWeight"
                                        onChange={handleInputChange} 
                                        value={objValues.losingWeight} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </div> 
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Are you having night sweats? (drenching or excessive night sweats)</Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="nightSweats"
                                        id="nightSweats"
                                        onChange={handleInputChange} 
                                        value={objValues.nightSweats} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Poor weight gain (Paediatrics clients {"<"}12 months) </Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="poorWeightGain"
                                        id="poorWeightGain"
                                        onChange={handleInputChange} 
                                        value={objValues.poorWeightGain} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </div> 
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >History of contacts with adults with TB (Paediatrics clients {"<"} months) </Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="historyWithAdults"
                                        id="historyWithAdults"
                                        onChange={handleInputChange} 
                                        value={objValues.historyWithAdults} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </div> 
                        </>)}
                        <br/>
                        <hr/>
                        <h3>Contraindications for TPT</h3>
                        <div className="form-group mb-3 col-md-12">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="activeTb"
                                    id="activeTb"
                                    value={objValues.activeTb}
                                    onChange={handleInputChangeContrain}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Active TB
                                    </label>
                                </div>
                        </div>
                        <div className="form-group mb-3 col-md-12">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="abnormalChest"
                                    id="abnormalChest"
                                    value={objValues.abnormalChest}
                                    onChange={handleInputChangeContrain}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Abnormal Chest X-Ray
                                    </label>
                                </div>
                        </div>
                        <div className="form-group mb-3 col-md-12">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="poorTreatmentAdherence"
                                    id="poorTreatmentAdherence"
                                    value={objValues.poorTreatmentAdherence}
                                    onChange={handleInputChangeContrain}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    History of poor treatment adherence
                                    </label>
                                </div>
                        </div> 
                        <div className="form-group mb-3 col-md-12">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="age1year"
                                    id="age1year"
                                    value={objValues.age1year}
                                    onChange={handleInputChangeContrain}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Age  {"<"}1 year without history of close contact with TB patient 
                                    </label>
                                </div>
                        </div>
                        <div className="form-group mb-3 col-md-12">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="activeHepatitis"
                                    id="activeHepatitis"
                                    value={objValues.activeHepatitis}
                                    onChange={handleInputChangeContrain}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Active hepatitis (clinical or lab)
                                    </label>
                                </div>
                        </div>
                        <div className="form-group mb-3 col-md-12">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="highAlcohol"
                                    id="highAlcohol"
                                    value={objValues.highAlcohol}
                                    onChange={handleInputChangeContrain}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    High alcohol consumption
                                    </label>
                                </div>
                        </div> 
                        <div className="form-group mb-3 col-md-12">                                    
                                <div className="form-check custom-checkbox ml-1 ">
                                    <input
                                    type="checkbox"
                                    className="form-check-input"                           
                                    name="priorInh"
                                    id="priorInh"
                                    value={objValues.priorInh}
                                    onChange={handleInputChangeContrain}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                    >
                                    Prior allergy to INH
                                    </label>
                                </div>
                        </div>
                        <h4>Contraindications for TPT : {objValues.contraindications}</h4>
                        <hr/>
                        <br/>
                        <h2>Outcome :{objValues.outcome}</h2>
                        <br/>
                        <h2>Eligible for IPT :{objValues.eligibleForTPT}</h2>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Date TPT start </Label>
                            <InputGroup> 
                                <Input 
                                    type="date"
                                    name="dateTPTStart"
                                    id="dateTPTStart"
                                    onChange={handleInputChange} 
                                    //value={objValues.dateTPTStart} 
                                >
                                
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Weight at start of TPT</Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="weightAtStartTPT"
                                    id="weightAtStartTPT"
                                    onChange={handleInputChange} 
                                    //value={objValues.weightAtStartTPT} 
                                >
                                
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >INH daily dose  </Label>
                            <InputGroup> 
                                <Input 
                                    type="text"
                                    name="inhDailyDose"
                                    id="inhDailyDose"
                                    onChange={handleInputChange} 
                                    //value={objValues.inhDailyDose} 
                                >
                                
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>
                    </div>
                    
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default Eligibility