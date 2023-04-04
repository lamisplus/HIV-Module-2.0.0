
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
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [allergies, setAllergies]= useState([])
    useEffect(() => {
        PrepSideEffect();
      }, []);
        //Get list of PrepSideEffect
        const PrepSideEffect =()=>{
        axios
            .get(`${baseUrl}application-codesets/v2/PREP_SIDE_EFFECTS`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //console.log(response.data);
                setAllergies(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });
        
        }
    useEffect(() => { 
       
    }, []);
    const [visit, setVisit] = useState({visitDate:""})
    const [objValues, setobjValues] = useState({Nausea:"", 
                                                Nausea_fever:"",
                                                as_never_receive_arvs:"",
                                                chronic:"",
                                                chronic_duration:"",
                                                cough:"",
                                                cough_duration:"",
                                                drug_allergies:"",
                                                duration_of_care_from:"",
                                                early_arv_but_not_transfer_in:"",
                                                fever:"",
                                                fever_duration:"",
                                                genital:"",
                                                genital_duration :"",
                                                genital_score:"",
                                                genital_score_duration:"",
                                                headache:"",
                                                headache_duration:"",
                                                hospitalization:"",
                                                itching:"",
                                                itching_duration:"",
                                                name_of_the_facility:"",
                                                new_visual:"",
                                                new_visual_duration:"",
                                                night_duration:"",
                                                numbness:"",
                                                numbness_duration:"",
                                                pain:"",
                                                pain_duration:"",
                                                past_medical_history:"",
                                                previous_arv_exposure:"",
                                                rash:"",
                                                rash_duration:"",
                                                recent:"",
                                                recent_duration:"",
                                                relevant_family_history:"",
                                                screen_for_tb:"",
                                                shortness_of_breath:"",
                                                shortness_of_breath_duration:"",
                                                duration_of_care_to:"",
                                                disclosureNoOne:"",  
                                                familyMember:"", 
                                                friend:"", 
                                                spouse:"", 
                                                spiritualLeader:"", 
                                                disclosureOthers:"", 
                                                HivStatusCanBeDiscussed:"",
                                                CurrentMedicationNone :"",
                                                currentART :"",
                                                currentCTX:"", 
                                                currentAntiTbDdrugs :"",
                                                currentOthers:"",
                                                childMotherAlive:"", 
                                                motherName:"", 
                                                motherAddress:"", 
                                                childFatherAlive:"", 
                                                immunisationComplete:"",
                                                fatherName:"", 
                                                fatherAddress:"", 
                                                parentChildMarriageStatus:"",  
                                                howManySibiling:"", 
                                                immunisationComplete:"",
                                                modeOfInfantFeeding:""
                                                });
    let temp = { ...errors }
    const [hideOtherPatientDisclosure, setHideOtherPatientDisclosure]=useState(false)
    const [hideOtherCurrentMedication, setHideOtherCurrentMedication]=useState(false)
    //Handle CheckBox 
    const handleMedicalHistory =e =>{
        setErrors({...errors, [e.target.name]: ""}) 
        if(e.target.name==='disclosureNoOne'){
            if(e.target.checked){
            setHideOtherPatientDisclosure(true)
                }else{
                    setHideOtherPatientDisclosure(false)
                }
        }
        if(e.target.name==='CurrentMedicationNone'){
            if(e.target.checked){
                setHideOtherCurrentMedication(true)

                }else{
                    setHideOtherCurrentMedication(false)
                }
        }        
        setobjValues({...objValues, [e.target.name]: e.target.value})
    }
    const handleInputChangeobjValues = e => { 
        setErrors({...errors, [e.target.name]: ""})           
        setVisit ({...visit,  [e.target.name]: e.target.value});
    }
    const handleItemClick =(page, completedMenu)=>{
        props.handleItemClick(page)
        if(props.completed.includes(completedMenu)) {

        }else{
            props.setCompleted([...props.completed, completedMenu])
        }
    } 
    //Validations of the forms
  const validate = () => {        
    temp.screen_for_tb = objValues.screen_for_tb ? "" : "This field is required"
    temp.past_medical_history = objValues.past_medical_history ? "" : "This field is required"
    temp.relevant_family_history = objValues.relevant_family_history ? "" : "This field is required"
    temp.drug_allergies = objValues.drug_allergies ? "" : "This field is required"
    temp.visitDate = visit.visitDate ? "" : "This field is required"

    setErrors({
        ...temp
    })
    return Object.values(temp).every(x => x == "")
  } 
     /**** Submit Button Processing  */
     const handleSubmit = (e) => { 
        e.preventDefault(); 
        if(validate()){
            props.observation.dateOfObservation= visit.visitDate 
            props.observation.data.medicalHistory=objValues   
            //toast.success("Medical history save successful");
            handleItemClick('past-arv', 'medical-history' ) 
        }else{
            toast.error("All fields are required");
        }                 
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
                                        type="select"
                                        name="typeOfClient"
                                        id="typeOfClient"
                                        onChange={handleMedicalHistory} 
                                        //value={objValues.typeOfClient} 
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
                            <Label >TB Symptoms (cough, fever, night sweats, weight loss,
contacts)</Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="pregnantStatus"
                                    id="pregnantStatus"
                                    onChange={handleMedicalHistory} 
                                    //value={objValues.pregnantStatus} 
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
                            <Label >Hepatitis Symptoms (Abdominal pain, nausea, vomiting, abnormal LFTs, Children: persistent irritability, yellowish
                            urine and eyes)
                            </Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="pregnantStatus"
                                    id="pregnantStatus"
                                    onChange={handleMedicalHistory} 
                                    //value={objValues.pregnantStatus} 
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
                            <Label >Neurologic Symptoms (Numbness, tingling,
                            paresthesias)
                            </Label>
                            <InputGroup> 
                                <Input 
                                    type="select"
                                    name="pregnantStatus"
                                    id="pregnantStatus"
                                    onChange={handleMedicalHistory} 
                                    //value={objValues.pregnantStatus} 
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
                                    name="pregnantStatus"
                                    id="pregnantStatus"
                                    onChange={handleMedicalHistory} 
                                    //value={objValues.pregnantStatus} 
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
                                    name="pregnantStatus"
                                    id="pregnantStatus"
                                    onChange={handleMedicalHistory} 
                                    //value={objValues.pregnantStatus} 
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
                                    name="pregnantStatus"
                                    id="pregnantStatus"
                                    onChange={handleMedicalHistory} 
                                    //value={objValues.pregnantStatus} 
                                >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Uncertain">Uncertain</option>
                                </Input>
                            </InputGroup>
                            </FormGroup>
                        </div>

                        <br/>
                        <h2>Outcome TPT:</h2>
                        
                    </div>
                    
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default Eligibility