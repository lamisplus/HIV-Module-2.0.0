import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormGroup,
  Label,
  CardBody,
  Spinner,
  Input,
  Form,
  InputGroup,
} from "reactstrap";
import * as moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { useHistory } from "react-router-dom";
// import {TiArrowBack} from 'react-icons/ti'
import { token, url as baseUrl } from "../../../api";
import "react-phone-input-2/lib/style.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import { Button } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    "& .card-title": {
      color: "#fff",
      fontWeight: "bold",
    },
    "& .form-control": {
      borderRadius: "0.25rem",
      height: "41px",
    },
    "& .card-header:first-child": {
      borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0",
    },
    "& .dropdown-toggle::after": {
      display: " block !important",
    },
    "& select": {
      "-webkit-appearance": "listbox !important",
    },
    "& p": {
      color: "red",
    },
    "& label": {
      fontSize: "14px",
      color: "#014d88",
      fontWeight: "bold",
    },
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
  error: {
    color: "#f85032",
    fontSize: "12.8px",
  },
}));

const TPT = (props) => {
  const classes = useStyles();
  //const [errors, setErrors] = useState({});
  const [adherence, setAdherence] = useState([]);
  const [tbTreatmentType, setTbTreatmentType] = useState([]);
    const [tbTreatmentOutCome, setTbTreatmentOutCome] = useState([]);
  
    const TB_TREATMENT_TYPE = () => {
      axios
        .get(`${baseUrl}application-codesets/v2/TB_TREATMENT_TYPE`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTbTreatmentType(response.data);
        })
        .catch((error) => {});
    };
    const TB_TREATMENT_OUTCOME = () => {
      axios
        .get(`${baseUrl}application-codesets/v2/TB_TREATMENT_OUTCOME`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTbTreatmentOutCome(response.data);
        })
        .catch((error) => {});
    };
  useEffect(() => {
    TB_TREATMENT_TYPE();
    TB_TREATMENT_OUTCOME();
    CLINIC_VISIT_LEVEL_OF_ADHERENCE();
  }, []);
  // TPT Logic
  useEffect(() => {

    if (props.tpt.everCompletedTpt === "Yes") {
      props.setTpt({
        ...props.tpt,
        eligibilityTpt: "No",
        tptPreventionOutcome: "TPT Completed",
      });
    }
    else if (props.tpt.everCompletedTpt === "No" && props.tpt.currentlyOnTpt ==='Yes') {
      props.setTpt({
        ...props.tpt,
        eligibilityTpt: "No",
        tptPreventionOutcome: "Currently on TPT",
      });
    }
    else if((props.tpt.everCompletedTpt === "No" && props.tpt.currentlyOnTpt ==='No' && props.tpt.contractionForTpt==='Yes' &&
        ( props.tpt.liverSymptoms==="Yes" || props.tpt.neurologicSymptoms==='Yes' || props.tpt.chronicAlcohol==='Yes' || props.tpt.rash==='Yes'))){
      props.setTpt({
        ...props.tpt,
        eligibilityTpt: "No",
        tptPreventionOutcome: "",
      });
    }
        // if((props.tpt.everCompletedTpt === "No" && props.tpt.currentlyOnTpt ==='No' &&
        //     ( props.tpt.liverSymptoms==="Yes" || props.tpt.neurologicSymptoms==='Yes' || props.tpt.chronicAlcohol==='Yes' || props.tpt.rash==='Yes'))){
        //   if(props.tpt.contractionForTpt==='Yes'){
        //     props.setTpt({
        //       ...props.tpt,
        //       eligibilityTpt: "Yes",
        //       tptPreventionOutcome: "",
        //     });
        //   } else {
        //     props.setTpt({
        //       ...props.tpt,
        //       eligibilityTpt: "No",
        //       tptPreventionOutcome: "",
        //     });
        //   }
    // }
    else if((props.tpt.everCompletedTpt === "No" && props.tpt.currentlyOnTpt ==='No' && props.tpt.contractionForTpt==='Yes' &&
        ( props.tpt.liverSymptoms==="No" || props.tpt.neurologicSymptoms==='No' || props.tpt.chronicAlcohol==='No' || props.tpt.rash==='No'))){
      props.setTpt({
        ...props.tpt,
        eligibilityTpt: "No",
        tptPreventionOutcome: "",
      });
    }

    // if(props.tpt.everCompletedTpt === "Yes") {
    //   props.setTpt({
    //     ...props.tpt,
    //     eligibilityTpt: "No",
    //     tptPreventionOutcome: "",
    //   });
    // }
    // if(props.tpt.everCompletedTpt === "No") {
    //   props.setTpt({
    //     ...props.tpt,
    //     eligibilityTpt: "Yes",
    //     tptPreventionOutcome: "",
    //   });
    // }

  }, [props.tpt.eligibilityTpt, props.tpt.tptPreventionOutcome, props.tpt.tbTreatment, props.tpt.currentlyOnTpt,
    props.tpt.liverSymptoms, props.tpt.neurologicSymptoms, props.tpt.chronicAlcohol,
    props.tpt.neurologicSymptoms,  props.tpt.rash, props.tpt.endedTpt,
    props.tpt.treatmentOutcome, props.tpt.treatmentCompletionStatus,
    props.tpt.everCompletedTpt, props.tpt.contractionForTpt  ]);


 
  //Get list of CLINIC_VISIT_LEVEL_OF_ADHERENCE
  const CLINIC_VISIT_LEVEL_OF_ADHERENCE = () => {
    axios
      .get(
        `${baseUrl}application-codesets/v2/CLINIC_VISIT_LEVEL_OF_ADHERENCE`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setAdherence(response.data);
      })
      .catch((error) => {});
  };
  //let temp = { ...errors }

  //Handle CheckBox
  // const handleTpt = (e) => {
  //   props.setErrors({ ...props.errors, [e.target.name]: "" });
  //   props.setTpt({ ...props.tpt, [e.target.name]: e.target.value });
  //   //making the field to be empty once the selection logic is apply(skip logic)
  // };


  console.log("TPT OBJECT IN TPT COMPONENT", props.tpt)

  const handleTpt  = (e) => {
    const {name, value} = e.target;
    if(name === 'tbTreatment' || value === ''  ){
      props.setTpt({
        ...props.tpt,
        [name]: value,
        completionDate: '',
        completedTbTreatment:'',
        treatmentOutcome: '',
      });
    }
    else if(name === 'everCompletedTpt'){
      if(value === "Yes"){
        props.setTpt({
          ...props.tpt,
          [name]: value,
          currentlyOnTpt:'',
        });
      }
      else {
        props.setTpt({
          ...props.tpt,
          [name]: value,
          dateOfTptCompleted:'',
        });
      }
    }
    else if(name === 'currentlyOnTpt' || value === ''){
      props.setTpt({
        ...props.tpt,
        [name]: value,
        hepatitisSymptoms: "",
        liverSymptoms: "",
        neurologicSymptoms: "",
        rash:'',
        contractionForTpt:'',
        chronicAlcohol:''
      });
    }
    else if(name === 'ontractionForTpt' || value === ''){
      props.setTpt({
        ...props.tpt,
        [name]: value,
        weight: "",
        dateTptStarted: "",
        tptRegimen: ""
      });
    }
    else if(name === 'endedTpt' || value === ''){
      props.setTpt({
        ...props.tpt,
        [name]: value,
        outComeOfIpt: "",
        dateTptEnded: ""
      });
    }
    else{
      props.setTpt({ ...props.tpt, [e.target.name]: e.target.value });
    }
  }
  return (
    <>
      <Card className={classes.root}>
        <CardBody>
          <h2 style={{ color: "#000" }}>TB/TPT Monitoring</h2>
          <br />
          <form>
            <div className="row">
              
              <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>
                      Have you completed TB Treatment?{" "}
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <InputGroup>
                      <Input
                        type="select"
                        name="tbTreatment"
                        id="tbTreatment"
                        onChange={handleTpt}
                        value={props.tpt.tbTreatment}
                        disabled={props.action === "view" ? true : false}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  {props.errors.tbTreatment !== "" ? (
                    <span className={classes.error}>
                      {props.errors.tbTreatment}
                    </span>
                  ) : (
                    ""
                  )}
              </div>
              {props.tpt.tbTreatment === "Yes"  && (
                <>
                  <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label>
                        TB Treatment Completion Date{" "}
                        <span style={{ color: "red" }}> *</span>
                      </Label>
                      <InputGroup>
                        <Input
                          type="date"
                          name="completionDate"
                          id="completionDate"
                          onChange={handleTpt}
                          value={props.tpt.completionDate}
                          // min={props.encounterDate}
                          disabled={
                            props.action === "view" ? true : false
                          }
                          max={moment(new Date()).format("YYYY-MM-DD")}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                    {props.errors.completionDate !== "" ? (
                      <span className={classes.error}>
                        {props.errors.completionDate}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label>
                          Treatment Outcome{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="select"
                            name="treatmentOutcome"
                            id="treatmentOutcome"
                            onChange={handleTpt}
                            value={props.tpt.treatmentOutcome}
                            disabled={props.action === "view" ? true : false}
                          >
                            <option value="">Select</option>
                            {tbTreatmentOutCome.map((value) => (
                              <option key={value.id} value={value.display}>
                                {value.display}
                              </option>
                            ))}
                          </Input>
                        </InputGroup>
                      </FormGroup>
                      {props.errors.treatmentOutcome !== "" ? (
                        <span className={classes.error}>
                          {props.errors.treatmentOutcome}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label>TB Treatment Completion Status</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="treatmentCompletionStatus"
                          id="treatmentCompletionStatus"
                          onChange={handleTpt}
                          disabled
                          value={(props.tpt.treatmentOutcome==='Cured' || props.tpt.treatmentOutcome==='Treatment completed')?"Treatment success" : ""}
                        >
                          
                          
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    {props.errors.treatmentCompletionStatus !== "" ? (
                      <span className={classes.error}>
                        {props.errors.treatmentCompletionStatus}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
              {props.tpt.tbTreatment === "Yes" && (
                  <>
                    {/* <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label>
                          TB treatment start date{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="date"
                            name="tbTreatmentStartDate"
                            id="tbTreatmentStartDate"
                            onChange={handleTpt}
                            value={props.tpt.tbTreatmentStartDate}
                            // min={props.encounterDate}
                            max={moment(new Date()).format("YYYY-MM-DD")}
                            disabled={props.action === "view" ? true : false}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </div> */}

                    {/* <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label>
                          Treatment Type{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Label>
                        <InputGroup>
                          <Input
                            type="select"
                            name="treatmentType"
                            id="treatmentType"
                            onChange={handleTpt}
                            value={props.tpt.treatmentType}
                            disabled={props.action === "view" ? true : false}
                          >
                            <option value="">Select</option>
                            {tbTreatmentType.map((value) => (
                              <option key={value.id} value={value.display}>
                                {value.display}
                              </option>
                            ))}
                          </Input>
                        </InputGroup>
                      </FormGroup>
                      {props.errors.treatmentType !== "" ? (
                        <span className={classes.error}>
                          {props.errors.treatmentType}
                        </span>
                      ) : (
                        ""
                      )}
                    </div> */}



                   
                  </>
                )}

              <br/>
              <hr/>
              <br/>
              <h3>TPT Prevention Section</h3>
              <h2>TPT Status</h2>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>
                  Ever completed a course of TPT {props.tpt.eligibilityTpt}
                  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="everCompletedTpt"
                      id="everCompletedTpt"
                      onChange={handleTpt}
                      value={props.tpt.everCompletedTpt}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              {props.tpt.everCompletedTpt==='Yes' && (<>
                <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>
                     Date of TPT Completed
                  </Label>
                  <InputGroup>
                    <Input
                      type="date"
                      name="dateOfTptCompleted"
                      id="dateOfTptCompleted"
                      onChange={handleTpt}
                      value={props.tpt.dateOfTptCompleted}
                      disabled={props.action === "view" ? true : false}
                    >
                      
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              </>)}
              {props.tpt.everCompletedTpt==='No' && (<>
                <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>
                     Are you currently on TPT
                  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="currentlyOnTpt"
                      id="currentlyOnTpt"
                      onChange={handleTpt}
                      value={props.tpt.currentlyOnTpt}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              
                {props.tpt.currentlyOnTpt==='No' && (<>
                <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>
                  liver disease  (Abdominal pain, nausea, vomiting, abnormal Liver function tests, Children: persistent irritability, yellowish urine and eyes)
                  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="liverSymptoms"
                      id="liverSymptoms"
                      onChange={handleTpt}
                      disabled={props.action === "view" ? true : false}
                      value={props.tpt.liverSymptoms}
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
                  <Label>
                    Neurologic Symptoms (Numbness, tingling, paresthesias)
                  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="neurologicSymptoms"
                      id="neurologicSymptoms"
                      onChange={handleTpt}
                      disabled={props.action === "view" ? true : false}
                      value={props.tpt.neurologicSymptoms}
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
                  <Label>Chronic alcohol consumption  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="chronicAlcohol"
                      id="chronicAlcohol"
                      onChange={handleTpt}
                      value={props.tpt.chronicAlcohol}
                      disabled={props.action === "view" ? true : false}
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
                  <Label>Rash </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="rash"
                      id="rash"
                      onChange={handleTpt}
                      value={props.tpt.rash}
                      disabled={props.action === "view" ? true : false}
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
                  <Label>
                  Contraindications For TPT 
                  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="contractionForTpt"
                      id="contractionForTpt"
                      onChange={handleTpt}
                      value={props.tpt.contractionForTpt}
                      
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                </div>
              </>)}
               
                
              </>)}
              {(props.tpt.contractionForTpt === "No" && props.tpt.everCompletedTpt==='No') && (<>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Weight</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="weight"
                      id="weight"
                      onChange={handleTpt}
                      value={props.tpt.weight}
                      disabled={props.action === "view" ? true : false}
                    ></Input>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Date TPT started </Label>
                  <InputGroup>
                    <Input
                      type="date"
                      name="dateTptStarted"
                      id="dateTptStarted"
                      onChange={handleTpt}
                      value={props.tpt.dateTptStarted}
                      disabled={props.action === "view" ? true : false}
                    ></Input>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Type of TPT Regimen  </Label>
                  <InputGroup>
                  <Input
                      type="select"
                      name="tptRegimen"
                      id="tptRegimen"
                      onChange={handleTpt}
                      value={props.tpt.tptRegimen}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="6H">6H</option>
                      <option value="3HP">3HP </option>
                      <option value="1HP">1HP </option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              </>)}
              {/* <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>
                    TB Symptoms (cough, fever, night sweats, weight
                    loss,contacts)
                  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="tbSymptoms"
                      id="tbSymptoms"
                      onChange={handleTpt}
                      value={props.tpt.tbSymptoms}
                      disabled={props.action === "view" ? true : false}
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
                  <Label>
                    Hepatitis Symptoms (Abdominal pain, nausea, vomiting,
                    abnormal LFTs, Children: persistent irritability, yellowish
                    urine and eyes)
                  </Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="hepatitisSymptoms"
                      id="hepatitisSymptoms"
                      onChange={handleTpt}
                      disabled={props.action === "view" ? true : false}
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
                  <Label>Referred for further services</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="referredForServices"
                      id="referredForServices"
                      onChange={handleTpt}
                      value={props.tpt.referredForServices}
                      disabled={props.action === "view" ? true : false}
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
                  <Label>Outcome of IPT</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="outComeOfIpt"
                      id="outComeOfIpt"
                      onChange={handleTpt}
                      value={props.tpt.outComeOfIpt}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="IPT Completed">IPT Completed</option>
                      <option value="Developed active TB">
                        Developed active TB
                      </option>
                      <option value="Died">Died </option>
                      <option value="Transferred out">Transferred out </option>
                      <option value="Stopped IPT">Stopped IPT</option>
                      <option value="Lost to follow up">
                        Lost to follow up{" "}
                      </option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              {props.tpt.outComeOfIpt !== "" && (
                <div className="form-group mb-3 col-md-4">
                  <FormGroup>
                    <Label>Outcome Date </Label>
                    <InputGroup>
                      <Input
                        type="date"
                        name="date"
                        id="date"
                        value={props.tpt.date}
                        onChange={handleTpt}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                        // min={props.encounterDate}
                        max={moment(new Date()).format("YYYY-MM-DD")}
                        disabled={props.action === "view" ? true : false}
                      ></Input>
                    </InputGroup>
                  </FormGroup>
                  {props.errors.outcomeDate !== "" ? (
                    <span className={classes.error}>
                      {props.errors.outcomeDate}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              )}
              {props.tpt.outComeOfIpt === "Stopped IPT" && (
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>Reasons for stopping IPT</Label>
                    <InputGroup>
                      <Input
                        type="text"
                        name="resonForStoppingIpt"
                        id="resonForStoppingIpt"
                        onChange={handleTpt}
                        value={props.tpt.resonForStoppingIpt}
                        disabled={props.action === "view" ? true : false}
                      >
                        <option value="">Select</option>
                        <option value="Developed symptoms of hepatitis">
                          Developed symptoms of hepatitis
                        </option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                </div>
              )} */}

              <p style={{ color: "black" }}>
                 Eligibility For TPT:
                <b>
                  {" " + props.tpt.eligibilityTpt === "undefined"
                    ? ""
                    : props.tpt.eligibilityTpt}
                </b>
              </p>
             <br/>
             <p style={{ color: "black" }}>
                TPT Prevention Outcome Status:
                <b>
                  {" " + props.tpt.tptPreventionOutcome === "undefined"
                    ? ""
                    : props.tpt.tptPreventionOutcome}
                </b>
              </p>
              <br/>
              <hr/>
              <br/>
              <h3>TPT Monitoring</h3>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Have you ended TPT</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="endedTpt"
                      id="endedTpt"
                      onChange={handleTpt}
                      value={props.tpt.endedTpt}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              {props.tpt.endedTpt ==='Yes' && (<>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Outcome of IPT</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="outComeOfIpt"
                      id="outComeOfIpt"
                      onChange={handleTpt}
                      value={props.tpt.outComeOfIpt}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="IPT Completed">TPT Completed</option>
                      <option value="Developed active TB">
                        Developed active TB
                      </option>
                      <option value="Died">Died </option>
                      <option value="Transferred out">Transferred out </option>
                      <option value="Stopped IPT">Stopped IPT</option>
                      <option value="Lost to follow up">
                        Lost to follow up(IIT)
                      </option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Date TPT Ended </Label>
                  <InputGroup>
                    <Input
                      type="date"
                      name="dateTptEnded"
                      id="dateTptEnded"
                      onChange={handleTpt}
                      value={props.tpt.dateTptEnded}
                      disabled={props.action === "view" ? true : false}
                    ></Input>
                  </InputGroup>
                </FormGroup>
              </div>
              </>)}
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default TPT;
