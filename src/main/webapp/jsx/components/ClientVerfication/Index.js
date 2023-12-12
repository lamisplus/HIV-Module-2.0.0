import React, {useState, useEffect} from 'react';
import { Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { Table  } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import {Icon, List, Label as LabelSui} from 'semantic-ui-react'
import DualListBox from "react-dual-listbox";
import 'react-dual-listbox/lib/react-dual-listbox.css';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
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
        }
    },
    input: {
        display: 'none'
    } ,
    error: {
        color: "#f85032",
        fontSize: "11px",
      },
}))

const Tracking = (props) =>{
    const patientObj = props.patientObj;
    console.log(props)
    const [errors, setErrors] = useState({});
    let temp = { ...errors }
    const classes = useStyles()
    const [dateOfDiscontinuation, setDateOfDiscontinuation] = useState(false);
    const [dateReturnedToCare, setDateReturnedToCare] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selected, setSelected] = useState([]);
    const [optionsForCallOutCome, setOptionsForCallOutCome] = useState([]);
    const [observation, setObservation]=useState({
        data: {},
        dateOfObservation: "",
        facilityId: null,
        personId: 0,
        type: "Client Verification",
        visitId: null
    })
    const [attempt, setAttempt] = useState({  
            // dateOfVerfication:"",
            dateOfAttempt:"",
            verificationAttempts:"",
            verificationStatus:"",
            outcome:"",
            comment:"",
    });
    const [clientVerificationObj, setClientVerificationObj] = useState({  
        attempt:"",
        dateOfVerification:"",
        dateOfDiscontinuation:"",
        discontinuation:"",
        dateReturnedToCare:"",
        referredTo:"",
        serialEnrollmentNo:""
    });
    // console.log(clientVerificationObj)
    const [attemptList, setAttemptList] = useState([]);
    const indicationForClientVerification = [
        { value: "No initial biometric capture", label: "No initial biometric capture" },
        { value: "Duplicated demographic and clinical variables", label: "Duplicated demographic and clinical variables" },
        { value: "No biometrics recapture", label: "No biometrics recapture"  },
        { value: "Last clinical visit is over 15 months prior", label:"Last clinical visit is over 15 months prior"  },
        { value: "Incomplete visit data on the care card or pharmacy forms or EMz ", label: "Incomplete visit data on the care card or pharmacy forms or EMz "},
        { value: "Records of repeated clinical encounters, with no fingerprint recapture.", label: "Records of repeated clinical encounters, with no fingerprint recapture." },
        { value: "Long intervals between ARV pick-ups (pick-ups more than one year apart in the same facility)", label:"Long intervals between ARV pick-ups (pick-ups more than one year apart in the same facility)"  },
        { value: "Same sex, DOB and ART start date", label: "Same sex, DOB and ART start date"},
        { value: "Consistently had drug pickup by proxy without viral load sample collection for two quarters" , label: "Consistently had drug pickup by proxy without viral load sample collection for two quarters"},
        { value: "Others", label: "Others"},
      ];

      useEffect(() => {
          if(props.activeContent.actionType==="update" || props.activeContent.actionType==="view"){
              GetFormDetail(props.activeContent.id) ;
          }
    }, [props.activeContent]);
    //Get Client Verification Form Object
    const GetFormDetail =(id)=>{
        axios
            .get(`${baseUrl}observation/${id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then(response => {
                const Obj= response
                setObservation({...Obj})
                clientVerificationObj.dateOfVerification=Obj.data.dateOfObservation
                //setClientVerificationObj({...Obj.data})
                setAttemptList(Obj.data)
            })
            .catch((error) => {
            //console.log(error);
            });
    }
    console.log(clientVerificationObj)
    const handleInputChangeAttempt = e => {
        // console.log('checking for date',e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setAttempt ({...attempt,  [e.target.name]: e.target.value});
        if(e.target.name === 'discontinuation'){
            setClientVerificationObj({...clientVerificationObj, [e.target.name]: e.target.value }) 

        }
    }

    const handleInputChange = e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setAttempt ({...attempt,  [e.target.name]: e.target.value});
        
    }
    const handleInputChangeDiscontinuation = e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setClientVerificationObj ({...clientVerificationObj,  [e.target.name]: e.target.value});
       
    }

    //Validations of the forms
    const validateAttempt = () => {
        temp.dateOfAttempt = attempt.dateOfAttempt ? "" : "This field is required"
        temp.verificationAttempts = attempt.verificationAttempts? "" : "This field is required"
        temp.verificationStatus = attempt.verificationStatus ? "" : "This field is required"
        temp.outcome = attempt.outcome ? "" : "This field is required"
        temp.comment = attempt.comment ? "" : "This field is required"

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }
    const validateClientverificationObj = () => {
        temp.dateOfVerification = clientVerificationObj.dateOfVerification ? "" : "This field is required"
        temp.discontinuation = clientVerificationObj.discontinuation? "" : "This field is required"
        temp.serialEnrollmentNo = clientVerificationObj.serialEnrollmentNo ? "" : "This field is required"
        // temp.outcome = clientVerificationObj.outcome ? "" : "This field is required"
        // temp.comment = clientVerificationObj.comment ? "" : "This field is required"

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }
    const addAttempt = e => {
        //attempt.anyOfTheFollowing=selected
        if(validateAttempt()){ 
            setAttemptList([...attemptList, attempt])
            setAttempt({
            // dateOfVerfication:"",
            dateOfAttempt:"",
            verificationAttempts:"",
            verificationStatus:"",
            outcome:"",
            comment:"",
            dateOfDiscontinuation:"",
            dateOfReturnedToCare:"",
            returnedToCare:"",
            referredTo:"",
           

            })
        }else{
            toast.error("Please fill the required fields");
        }
      }
    //   console.log(errors)
    /* Remove ADR  function **/
    const removeAttempt = index => {       
        attemptList.splice(index, 1);
        setAttemptList([...attemptList]);        
    }; 
    
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();
        observation.dateOfObservation=clientVerificationObj.dateOfVerification
        
        //assigning the verifcation date to date of observation Object
        clientVerificationObj.attempt=attemptList // Assgining all the attempted list to the ClientVerifiction Object 
        observation.data=clientVerificationObj

            if(attemptList.length >0){
                if(validateClientverificationObj()){
                    observation.dateOfObservation= observation.dateOfObservation !=="" ? observation.dateOfObservation : moment(new Date()).format("YYYY-MM-DD")
                    observation.personId =patientObj.id
                    observation.data=attemptList
                    setSaving(true);
                    axios.post(`${baseUrl}observation`,observation,
                        { headers: {"Authorization" : `Bearer ${token}`}},

                    )
                        .then(response => {
                            setSaving(false);
                            toast.success("Client Verfication form Save successful", {position: toast.POSITION.BOTTOM_CENTER});
                            props.setActiveContent({...props.activeContent, route:'recent-history'})
                            //props.setActiveContent('recent-history')

                        })
                        .catch(error => {
                            setSaving(false);
                            if(error.response && error.response.data){
                                let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                                if(error.response.data.apierror && error.response.data.apierror.message!=="" && error.response.data.apierror && error.response.data.apierror.subErrors[0].message!==""){
                                    toast.error(error.response.data.apierror.message + " : " + error.response.data.apierror.subErrors[0].field + " " + error.response.data.apierror.subErrors[0].message, {position: toast.POSITION.BOTTOM_CENTER});
                                }else{
                                    toast.error(errorMessage, {position: toast.POSITION.BOTTOM_CENTER});
                                }
                            }
                            else{
                                toast.error("Something went wrong. Please try again...", {position: toast.POSITION.BOTTOM_CENTER});
                                console.log(error)}
                        });
                }else{
                    toast.error("All field are required", {position: toast.POSITION.BOTTOM_CENTER});
                }
                }else{

                    toast.error("Attempt to Contact can not be empty", {position: toast.POSITION.BOTTOM_CENTER});
                }

       
    }

  return (      
        <div>                   
            <Card className={classes.root}>
                <CardBody>
                <form >
                    
                    <div className="row d-flex">
                        <h2>Client Verfication Form</h2>
                        <br/>
                        <br/>
                        <div className="row">
                        <div className="form-group mb-3 col-md-4">        
                            <FormGroup>
                                <Label > Date Of Verfication <span style={{ color:"red"}}> *</span></Label>
                                <Input
                                    type="date"
                                    name="dateOfVerification"
                                    value={clientVerificationObj.dateOfVerification}
                                    // min={enrollDate}
                                    onChange={handleInputChangeDiscontinuation}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    max= {moment(new Date()).format("YYYY-MM-DD") } 
                                   > 
                                </Input>
                                {errors.dateOfVerification !=="" ? (
                                    <span className={classes.error}>{errors.dateOfVerification}</span>
                                ) : "" }
                             </FormGroup> 
                        </div>
                       
                        <div className="form-group mb-3 col-md-4">        
                            <FormGroup>
                                <Label >Serial Enrollment No <span style={{ color:"red"}}> *</span></Label>
                                <Input
                                    type="text"
                                    name="serialEnrollmentNo"
                                    id="serialEnrollmentNo"
                                    value={clientVerificationObj.serialEnrollmentNo}
                                    onChange={handleInputChangeDiscontinuation}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    > 
                                </Input>
                                {errors.serialEnrollmentNo !=="" ? (
                                    <span className={classes.error}>{errors.serialEnrollmentNo}</span>
                                ) : "" }
                             </FormGroup> 
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <hr/>
                        <h3>Indication For Client Verification</h3>    
                            <div className="form-group mb-3 col-md-12">
                                <FormGroup>
                                <Label >Indication For Client Verification <span style={{ color:"red"}}> *</span></Label>
                                <DualListBox
                                //canFilter
                                    options={indicationForClientVerification}
                                    onChange={(value) => setSelected(value)}
                                    selected={selected}
                                /> 
                                {errors.indicationForClientVerification !=="" ? (
                                    <span className={classes.error}>{errors.indicationForClientVerification}</span>
                                ) : "" }   
                                </FormGroup>
                            </div>

                            <div className="row">
                                <hr/>
                                <h3> Verfication Attempts </h3>
                                <div className="form-group mb-3 col-md-4">
                                    <FormGroup>
                                    <Label > Date Of Attempt <span style={{ color:"red"}}> *</span></Label>
                                    <Input
                                         type="date"
                                         name="dateOfAttempt"
                                         id="dateOfAttempt"
                                         value={attempt.dateOfAttempt}
                                        //  min={enrollDate}
                                         onChange={handleInputChangeAttempt}
                                         style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                         max= {moment(new Date()).format("YYYY-MM-DD") }  
                                    />
                                    {errors.dateOfAttempt !=="" ? (
                                        <span className={classes.error}>{errors.dateOfAttempt}</span>
                                    ) : "" }   
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-4">
                                    <FormGroup>
                                    <Label > Verification Attempts<span style={{ color:"red"}}> *</span></Label>
                                    <Input
                                        type="select"
                                        name="verificationAttempts"
                                        id="verificationAttempts"
                                        value={attempt.verificationAttempts}
                                        onChange={handleInputChangeAttempt}
                                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}                                      
                                    >
                                      <option value=""> Select</option>
                                        <option value="physicalDocumentAuditedFolderReview"> Physical document audited-Folder/register review</option>
                                        <option value="ClientContacted"> Client contacted(Phone)</option>
                                        <option value="1stBiometricCapture "> 1st Biometric capture 	</option>
                                        <option value="biometricRecapture"> Biometric recapture</option>
                                        <option value = "facilityVisit">Facility Visit</option>
                                        {optionsForCallOutCome.map((value) => (
                                        <option key={value.code} value={value.display}>
                                            {value.display}
                                        </option>
                                         ))}
                                        </Input>

                                    {errors.verificationAttempts !=="" ? (
                                    <span className={classes.error}>{errors.verificationAttempts}</span>
                                    ) : "" }
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-4">
                                <FormGroup>
                                <Label for=""> Verification Status <span style={{ color:"red"}}> *</span></Label>

                                    <Input 
                                        type="select"
                                        name="verificationStatus"
                                        id="verificationnStatus"
                                        onChange={handleInputChangeAttempt}
                                        value={attempt.verificationStatus}  
                                    >
                                        <option value=""> Select</option>
                                        <option value="verificationOngoing">Verification ongoing </option>
                                        <option value="recordsDiscontinuedArchived"> Records Discontinued & Archived	</option>
                                        <option value="recordsVerified">Records Verified</option>
                                        {optionsForCallOutCome.map((value) => (
                                        <option key={value.code} value={value.display}>
                                            {value.display}
                                        </option>
                                        
                                    ))}
                                    </Input>
                                    {errors.verificationStatus !=="" ? (
                                    <span className={classes.error}>{errors.verificationStatus}</span>
                                    ) : "" }
                                </FormGroup>
                                </div>
                            </div>
                            <div className="form-group mb-3 col-md-4">
                                <FormGroup>
                                <Label > Outcome <span style={{ color:"red"}}> *</span></Label>
                                <Input
                                    type="select"
                                    name="outcome"
                                    id="outcome"
                                    value={attempt.outcome}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                        <option value=""> Select </option>
                                        <option value="valid"> Valid </option>
                                        <option value="invalid"> invalid</option>  
                                        {optionsForCallOutCome.map((value) => (
                                        <option key={value.code} value={value.display}>
                                            {value.display}
                                        </option>
                                        
                                    ))}
                                    </Input>
                                {errors.outcome !=="" ? (
                                <span className={classes.error}>{errors.outcome}</span>
                                ) : "" }
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-4">
                                <FormGroup>
                                <Label > Comment <span style={{ color:"red"}}> *</span></Label>
                                <Input
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    value={attempt.comment}
                                    onChange={handleInputChangeAttempt}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                />
                
                                {errors.comment !=="" ? (
                                <span className={classes.error}>{errors.comment}</span>
                                ) : "" }
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-2 float-end">
                            <LabelSui as='a' color='black'  onClick={addAttempt}  size='tiny' style={{ marginTop:35}}>
                                <Icon name='plus' /> Add
                            </LabelSui>
                            </div>

                            {attemptList.length >0 
                            ?
                                <List>
                                <Table  striped responsive>
                                    <thead >
                                        <tr>
                                            <th>Date of Attempt</th>
                                            <th>Verfication Attempt</th>
                                            <th>Verfication Status</th>
                                            <th>Outcome</th>
                                            <th>comment</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {attemptList.map((attemptObj, index) => (

                                    <AttemptedLists
                                        key={index}
                                        index={index}
                                        attemptObj={attemptObj}
                                        removeAttempt={removeAttempt}
                                    />
                                    ))}
                                    </tbody>
                                </Table>
                                </List>
                                :
                                ""
                            }       
                        <hr/>
                        </div>

                        <div>
                        <hr/>
                        <div className="row">
                            <div className="form-group mb-3 col-md-4">
                                <FormGroup>
                                <Label > Patient Care in Facility Discontinued? <span style={{ color:"red"}}> *</span></Label>
                                <Input
                                    type="select"
                                    name="discontinuation"
                                    id="discontinuation"
                                    value={clientVerificationObj.discontinuation}
                                    onChange={handleInputChangeDiscontinuation}
                                    style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                    
                                >
                                        <option value=""> Select </option>
                                        <option value="Yes"> Yes </option>
                                        <option value="No"> No </option>
                                        
                                        {optionsForCallOutCome.map((value) => (
                                        <option key={value.code} value={value.display}>
                                            {value.display}
                                        </option>
                                    ))}
                                    </Input>
                
                                {errors.discontinuation !=="" ? (
                                <span className={classes.error}>{errors.discontinuation}</span>
                                ) : "" }
                       
                                </FormGroup >
                            </div>
                            
                                {clientVerificationObj.discontinuation === 'Yes' && (
                                    <div className="form-group mb-3 col-md-4">
                                        <label>Date of Discontinuation </label>
                                        <Input
                                            type="date"
                                            name="dateOfDiscontinuation"
                                            id="dateOfDiscontinuation"
                                            value={clientVerificationObj.dateOfDiscontinuation}                                          //  min={enrollDate}
                                            onChange={handleInputChangeDiscontinuation}
                                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                            max= {moment(new Date()).format("YYYY-MM-DD") }
                                        />
                                    </div>
                                )}

                                {clientVerificationObj.discontinuation ==='No' && (
                                    <>
                                     <div className="form-group mb-3 col-md-4">
                                        <label>Date Return to Care </label>
                                        <Input
                                            type="date"
                                            name="dateReturnedToCare"
                                            id="dateReturnedToCare"
                                            value={clientVerificationObj.dateReturnedToCare}
                                            //  min={enrollDate}
                                            onChange={handleInputChangeDiscontinuation}
                                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                            max= {moment(new Date()).format("YYYY-MM-DD") }
                                            
                                        />
                                      </div>
                                   
                                        <div className="form-group mb-3 col-md-4">
                                            <label>Refer To</label>
                                            <Input
                                            type="select"
                                            name="referredTo"
                                            id="referredTo"
                                            value={attempt.referredTo}
                                            onChange={handleInputChangeDiscontinuation}
                                            style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                            
                                            >
                                            <option value=""> Select </option>
                                            <option value="vl"> VL </option>
                                            <option value="adherenceCounselling"> Adherence Counselling</option>
                                            <option value="tbscreen"> TB scrren </option>
                                            <option value="others"> Others </option>
                                            {optionsForCallOutCome.map((value) => (
                                            <option key={value.code} value={value.display}>
                                                {value.display}
                                            </option>
                                            ))}
                                            </Input>
                                        </div>
                                    </>  
                                )}         
                            </div>
                            </div>

                    
                    {saving ? <Spinner /> : ""}
                    <br />
                
                    <MatButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    style={{backgroundColor:"#014d88"}}
                    disabled={attemptList.length <=0 && !saving ? true : false}
                    >
                    {!saving ? (
                    <span style={{ textTransform: "capitalize" }}>Save</span>
                    ) : (
                    <span style={{ textTransform: "capitalize" }}>Saving...</span>
                    )}
                    </MatButton>
                
                    </form>
                </CardBody>
            </Card>                    
        </div>
        
  );
}

function AttemptedLists({
    attemptObj,
    index,
    removeAttempt,
  }) {
   
    return (
            <tr>
                <th>{attemptObj.dateOfAttempt}</th>
                <th>{attemptObj.verificationAttempts}</th>
                <th>{attemptObj.verificationStatus}</th>
                <th>{attemptObj.outcome}</th>
                <th>{attemptObj.comment}</th>
                
                <th></th>
                <th >
                    <IconButton aria-label="delete" size="small" color="error" onClick={() =>removeAttempt(index)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    
                </th>
            </tr> 
    );
  }
export default Tracking;
