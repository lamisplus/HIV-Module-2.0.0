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

const Eligibility = (props) => {
  const classes = useStyles();
  const [clientType, setClientType] = useState([]);
  const [pregnancyStatus, setPregnancyStatus] = useState([]);
  const [who, setWho] = useState([]);
  const [artStatus, setArtStatus] = useState([]);
  const handleEligibility = (e) => {
    props.setEligibility({
      ...props.eligibility,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    CHRONIC_CARE_CLIENT_TYPE();
    PREGNANCY_STATUS();
    ART_STATUS();
    WHO_STAGING_CRITERIA();
  }, []);
  const CHRONIC_CARE_CLIENT_TYPE = () => {
    axios
      .get(`${baseUrl}application-codesets/v2/CHRONIC_CARE_CLIENT_TYPE`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setClientType(response.data);
      })
      .catch((error) => {
      });
  };
  const ART_STATUS = () => {
    axios
      .get(`${baseUrl}application-codesets/v2/ART_STATUS`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setArtStatus(response.data);
      })
      .catch((error) => {
      });
  };
  const PREGNANCY_STATUS = () => {
    axios
      .get(`${baseUrl}application-codesets/v2/PREGNANCY_STATUS`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPregnancyStatus(response.data);
      })
      .catch((error) => {
      });
  };
  const WHO_STAGING_CRITERIA = () => {
    axios
      .get(`${baseUrl}application-codesets/v2/WHO_STAGING_CRITERIA`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWho(response.data);
      })
      .catch((error) => {
      });
  };
  const calculate_age = (dob) => {
    if (dob !== null && dob != "") {
      //Check if the DOB is not null or empty
      const today = new Date();
      const dateParts = dob.split("-");
      const birthDate = new Date(dob);

      // get the day, month and year of today
      let todayMonth = today.getMonth();
      let todayYear = today.getFullYear();
      let todayDate = today.getDate();

    
      let birthDateMonth = birthDate.getMonth();
      let birthDateYear = birthDate.getFullYear();
      let birthdateDate = birthDate.getDate();

      // substract birthdate year from today year  ie todayYear - birthdateYear which  will give  "AssumedAge" is the age  we assume the patient will clock this year

      let assumedAge = todayYear - birthDateYear;
      if (assumedAge > 0) {
        //Checking the month to confirm if the age has been cloocked

        let monthGap = todayMonth - birthDateMonth;
        

        // If 'monthGap'> 0, the age has been clocked, 'monthGap'< 0, the age has not been clocked, 'monthGap'= 0, we are in the month then check date to confirm clocked age

        if (monthGap > 0) {
          return assumedAge + " year(s)";
        } else if (monthGap < 0) {
          let confirmedAge = assumedAge - 1;
          return confirmedAge + " year(s)";
        } else if (monthGap === 0) {
          let dateGap = todayDate - birthdateDate;
         

          if (dateGap > 0) {
            return assumedAge + " year(s)";
          } else if (dateGap < 0) {
            let confirmedAge = assumedAge - 1;
            return confirmedAge + " year(s)";
          }
        }
      } else {
        let monthGap = todayMonth - birthDateMonth;
        let dateGap = todayDate - birthdateDate;

        let monthOld = monthGap > 0 ? monthGap : 0;
        let DayOld = dateGap > 0 ? dateGap : 0;

        let result = monthOld ? monthOld + "month(s)" : DayOld + "day(s)";
        return result;
      }
    }
  };
  const patientAge = calculate_age(props.patientObj.dateOfBirth);

  return (
    <>
      <Card className={classes.root}>
        <CardBody>
          <h2 style={{ color: "#000" }}>Eligibility Assessment</h2>
          <br />
          <form>
            <div className="row">
              <div className="form-group mb-3 col-md-8"></div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Type Of Client</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="typeOfClient"
                      id="typeOfClient"
                      onChange={handleEligibility}
                      value={props.eligibility.typeOfClient}
                    >
                      <option value="">Select</option>
                      {clientType.map((value) => (
                        <option key={value.id} value={value.display}>
                          {value.display}
                        </option>
                      ))}
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              {patientAge >= 10 && props.patientObj.sex === "Female" && (
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>Pregnancy/Breastfeeding Status</Label>
                    <InputGroup>
                      <Input
                        type="select"
                        name="pregnantStatus"
                        id="pregnantStatus"
                        onChange={handleEligibility}
                        value={props.eligibility.pregnantStatus}
                      >
                        <option value="">Select</option>
                        {pregnancyStatus.map((value) => (
                          <option key={value.id} value={value.display}>
                            {value.display}
                          </option>
                        ))}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                </div>
              )}
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>ART Status</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="artStatus"
                      id="artStatus"
                      onChange={handleEligibility}
                      value={props.eligibility.artStatus}
                    >
                      <option value="">Select</option>
                      {artStatus.map((value) => (
                        <option key={value.id} value={value.display}>
                          {value.display}
                        </option>
                      ))}
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Current Clinical Status(WHO Statging)</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      name="whoStaging"
                      id="whoStaging"
                      onChange={handleEligibility}
                      value={props.eligibility.whoStaging}
                    >
                      <option value="">Select</option>
                      {who.map((value) => (
                        <option key={value.id} value={value.display}>
                          {value.display}
                        </option>
                      ))}
                    </Input>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Last CD4 Result</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="lastCd4Result"
                      id="lastCd4Result"
                      value={props.eligibility.lastCd4Result}
                      onChange={handleEligibility}
                    />
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Last CD4 Result Date</Label>
                  <InputGroup>
                    <Input
                      type="date"
                      name="lastCd4ResultDate"
                      id="lastCd4ResultDate"
                      value={props.eligibility.lastCd4ResultDate}
                      min={props.encounterDate}
                      max={moment(new Date()).format("YYYY-MM-DD")}
                      onChange={handleEligibility}
                    />
                  </InputGroup>
                </FormGroup>
              </div>

              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Last Viral Load Result</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="lastViralLoadResult"
                      id="lastViralLoadResult"
                      value={props.eligibility.lastViralLoadResult}
                      onChange={handleEligibility}
                    />
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Last Viral Load Result Date</Label>
                  <InputGroup>
                    <Input
                      type="date"
                      name="lastViralLoadResultDate"
                      id="lastViralLoadResultDate"
                      value={props.eligibility.lastViralLoadResultDate}
                      min={props.encounterDate}
                      max={moment(new Date()).format("YYYY-MM-DD")}
                      onChange={handleEligibility}
                    />
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="form-group mb-3 col-md-6">
                <FormGroup>
                  <Label>Eligible for Viral Load</Label>
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
            <br />
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Eligibility;
