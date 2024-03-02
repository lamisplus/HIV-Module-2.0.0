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
  InputGroupText,
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
// import AddIcon from "@material-ui/icons/Add";
// import CancelIcon from "@material-ui/icons/Cancel";
import { ToastContainer, toast } from "react-toastify";
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
    maxWidth: 752,
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

const ChronicConditions = (props) => {
  const classes = useStyles();
  //const history = useHistory();
  const [errors, setErrors] = useState({});
  let temp = { ...errors };

  useEffect(() => {}, []);

  const handleInputChange = (e) => {
    props.setChronicConditions({
      ...props.chronicConditions,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Card>
        <CardBody>
          <h2 style={{ color: "#000" }}>
            Screening for Chronic Conditions(Hypertension & Diabetics)
          </h2>
          <br />
          <form>
            {/* Medical History form inputs */}
            <div className="row">
                    <div className="form-group mb-3 col-md-8"></div>   
                    {props.isHypertensive !="" && props.isHypertensive === true?

                      (<>
                         <div className="row">
                      
                    
                      <div className="form-group mb-3 col-md-6">                                    
                              <FormGroup>
                              <Label>First time identified within the programme?</Label>
                                      <Input 
                                          type="select"
                                          name="firstTimeHypertensive"
                                          id="firstTimeHypertensive"
                                          onChange={handleInputChange} 
                                          value={props.chronicConditions.firstTimeHypertensive}
                                      >
                                      <option value="">Select</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                      </Input>
  
                              </FormGroup>
                      </div>
                      <div className="row">
                      <div className="form-group mb-3 col-md-12">
                          <FormGroup>
                          <Label >Blood Pressure</Label>
                          <InputGroup>
                          <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                  systolic(mmHg)
                          </InputGroupText> 
                              <Input 
                                  type="number"
                                  name="systolic"
                                  id="systolic"
                                  min="90"
                                  max="2240"
                                  onChange={handleInputChange}
                                  value={props.chronicConditions.systolic}
                                  //onKeyUp={handleInputValueCheckSystolic}
                                  style={{border: "1px solid #014D88", borderRadius:"0rem"}} 
                              />
                              <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                              diastolic(mmHg)
                              </InputGroupText>
                                  <Input 
                                  type="number"
                                  name="diastolic"
                                  id="diastolic"
                                  min={0}
                                  max={140}
                                  onChange={handleInputChange}
                                  value={props.chronicConditions.diastolic}
                                  //onKeyUp={handleInputValueCheckDiastolic} 
                                  style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                  />
                              
                              
                          </InputGroup>
                                  
                          </FormGroup>
                      </div>
                      </div>
                      <div className="form-group mb-3 col-md-6">                                    
                              <FormGroup>
                              <Label>BP above 14080mmHg?</Label>
                                      <Input 
                                          type="select"
                                          name="bp"
                                          id="bp"
                                          onChange={handleInputChange} 
                                          value={props.chronicConditions.bp}
                                      >
                                      <option value="">Select</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                      </Input>
  
                              </FormGroup>
                      </div>
  
                  </div>
                            
                      </>) : 
                      (<> 
                 
                    <div className="row">
                      
                    <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>Known Hypertensive </Label>
                                    <Input 
                                        type="select"
                                        name="hypertensive"
                                        id="hypertensive"
                                        onChange={handleInputChange} 
                                        value={props.chronicConditions.hypertensive} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>First time identified within the programme?</Label>
                                    <Input 
                                        type="select"
                                        name="firstTimeHypertensive"
                                        id="firstTimeHypertensive"
                                        onChange={handleInputChange} 
                                        value={props.chronicConditions.firstTimeHypertensive}
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                    </div>
                    <div className="row">
                    <div className="form-group mb-3 col-md-12">
                        <FormGroup>
                        <Label >Blood Pressure</Label>
                        <InputGroup>
                        <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                systolic(mmHg)
                        </InputGroupText> 
                            <Input 
                                type="number"
                                name="systolic"
                                id="systolic"
                                min="90"
                                max="2240"
                                onChange={handleInputChange}
                                value={props.chronicConditions.systolic}
                                //onKeyUp={handleInputValueCheckSystolic}
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}} 
                            />
                            <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                            diastolic(mmHg)
                            </InputGroupText>
                                <Input 
                                type="number"
                                name="diastolic"
                                id="diastolic"
                                min={0}
                                max={140}
                                onChange={handleInputChange}
                                value={props.chronicConditions.diastolic}
                                //onKeyUp={handleInputValueCheckDiastolic} 
                                style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                />
                            
                            
                        </InputGroup>
                                
                        </FormGroup>
                    </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>BP above 14080mmHg?</Label>
                                    <Input 
                                        type="select"
                                        name="bp"
                                        id="bp"
                                        onChange={handleInputChange} 
                                        value={props.chronicConditions.bp}
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                    </div>

                </div>
                </>)}      

            
              <div className="row">
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>Know diabetic?</Label>
                    <Input
                      type="select"
                      name="diabetic"
                      id="diabetic"
                      onChange={handleInputChange}
                      value={props.chronicConditions.diabetic}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>First time identified within the programme?</Label>
                    <Input
                      type="select"
                      name="firstTimeDiabetic"
                      id="firstTimeDiabetic"
                      onChange={handleInputChange}
                      value={props.chronicConditions.firstTimeDiabetic}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>Increased frequency of urination</Label>
                    <Input
                      type="select"
                      name="frequencyUrination"
                      id="frequencyUrination"
                      onChange={handleInputChange}
                      value={props.chronicConditions.frequencyUrination}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>Increased water(fluid) intake?</Label>
                    <Input
                      type="select"
                      name="increaseWater"
                      id="increaseWater"
                      onChange={handleInputChange}
                      value={props.chronicConditions.increaseWater}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>Increased food intake (without weight gain)</Label>
                    <Input
                      type="select"
                      name="increaseFood"
                      id="increaseFood"
                      onChange={handleInputChange}
                      value={props.chronicConditions.increaseFood}
                      disabled={props.action === "view" ? true : false}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default ChronicConditions;
