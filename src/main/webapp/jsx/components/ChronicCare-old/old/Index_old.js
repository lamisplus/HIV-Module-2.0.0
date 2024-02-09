import React, { useCallback, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Card, CardBody } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Link, useLocation } from "react-router-dom";
//import {TiArrowBack} from 'react-icons/ti'
//import {token, url as baseUrl } from "../../../api";
import "react-phone-input-2/lib/style.css";
import { Icon, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ChronicConditions from "./ChronicConditions";
import NutritionalStatus from "./NutritionalStatus";
import PositiveHealthDignity from "./PositiveHealthDignity";
import GenderBase from "./GenderBase";
import ReproductiveIntentions from "./ReproductiveIntentions";
import Eligibilty from "./Eligibilty";
import moment from "moment";

const ChronicCare = (props) => {
  //const classes = useStyles();
  const location = useLocation();
  const locationState = location.state;
  const [saving, setSaving] = useState(false);
  const [activeItem, setactiveItem] = useState("eligibility");
  const [completed, setCompleted] = useState([]);
  const [patientObj, setPatientObj] = useState("");
  const [observation, setObservation] = useState({
    data: {
      medicalHistory: "",
      currentMedical: "",
      patientDisclosure: "",
      pastArvMedical: "",
      physicalExamination: "",
      generalApperance: "",
      skin: "",
      eye: "",
      breast: "",
      cardiovascular: "",
      genitalia: "",
      respiratory: "",
      gastrointestinal: "",
      assesment: "",
      who: "",
      plan: "",
      regimen: "",
      enroll: "",
      planArt: "",
      nextAppointment: "",
      neurological: "",
      mentalstatus: "",
      visitDate: "",
    },
    dateOfObservation: null,
    facilityId: null,
    personId: patientObj.id,
    type: "Clinical evaluation",
    visitId: null,
  });
  const handleItemClick = (activeItem) => {
    setactiveItem(activeItem);
    //setCompleted({...completed, ...completedMenu})
  };
  useEffect(() => {
    if (locationState && locationState.patientObj) {
      setPatientObj(locationState.patientObj);
    }
  }, []);
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

      

      // get the day, month and year from date of birth
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
  const patientAge = calculate_age(patientObj.dateOfBirth);

  return (
    <>
      <Card>
        <CardBody>
          <div className="row">
            <h2>Chronic Care </h2>

            <br />
            <br />
            <form>
              <div className="col-md-3 float-start">
                <Menu
                  size="large"
                  vertical
                  style={{ backgroundColor: "#014D88" }}
                >
                  <Menu.Item
                    name="inbox"
                    active={activeItem === "eligibility"}
                    onClick={() => handleItemClick("eligibility")}
                    style={{
                      backgroundColor:
                        activeItem === "eligibility" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'past-arv' ? true : false}
                  >
                    <span style={{ color: "#fff" }}>
                      Eligibility Assessment
                      {completed.includes("eligibility") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>

                    {/* <Label color='teal'>3</Label> */}
                  </Menu.Item>
                  <Menu.Item
                    name="spam"
                    active={activeItem === "nutrition"}
                    onClick={() => handleItemClick("nutrition")}
                    style={{
                      backgroundColor: activeItem === "nutrition" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'appearance' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Nutritional Status Assessment
                      {completed.includes("nutrition") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    name="spam"
                    active={activeItem === "gender-base"}
                    onClick={() => handleItemClick("gender-base")}
                    style={{
                      backgroundColor:
                        activeItem === "gender-base" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'who' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Gender Based Violence Screening
                      {completed.includes("gender-base") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    name="spam"
                    active={activeItem === "chronic-conditions"}
                    onClick={() => handleItemClick("chronic-conditions")}
                    style={{
                      backgroundColor:
                        activeItem === "chronic-conditions" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'plan' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Screening for Chronic Conditions
                      {completed.includes("chronic-conditions") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    name="spam"
                    active={activeItem === "positive-health"}
                    onClick={() => handleItemClick("positive-health")}
                    style={{
                      backgroundColor:
                        activeItem === "positive-health" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'regimen' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Positive Health Dignity and Prevention(PHDP)
                      {completed.includes("positive-health") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    name="spam"
                    active={activeItem === "reproductive"}
                    onClick={() => handleItemClick("reproductive")}
                    style={{
                      backgroundColor:
                        activeItem === "reproductive" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'regimen' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Reproductive Intentions
                      {completed.includes("reproductive") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>
                </Menu>
              </div>
              <div
                className="col-md-9 float-end"
                style={{ backgroundColor: "#fff" }}
              >
                {activeItem === "nutrition" && (
                  <NutritionalStatus
                    handleItemClick={handleItemClick}
                    setCompleted={setCompleted}
                    completed={completed}
                    setPatientObj={setPatientObj}
                    patientObj={patientObj}
                    setObservation={setObservation}
                    observation={observation}
                    patientAge={patientAge}
                  />
                )}
                {activeItem === "positive-health" && (
                  <PositiveHealthDignity
                    handleItemClick={handleItemClick}
                    setCompleted={setCompleted}
                    completed={completed}
                    setPatientObj={setPatientObj}
                    patientObj={patientObj}
                    setObservation={setObservation}
                    observation={observation}
                    patientAge={patientAge}
                  />
                )}
                {activeItem === "chronic-conditions" && (
                  <ChronicConditions
                    handleItemClick={handleItemClick}
                    setCompleted={setCompleted}
                    completed={completed}
                    setPatientObj={setPatientObj}
                    patientObj={patientObj}
                    setObservation={setObservation}
                    observation={observation}
                    patientAge={patientAge}
                  />
                )}
                {activeItem === "gender-base" && (
                  <GenderBase
                    handleItemClick={handleItemClick}
                    setCompleted={setCompleted}
                    completed={completed}
                    setPatientObj={setPatientObj}
                    patientObj={patientObj}
                    setObservation={setObservation}
                    observation={observation}
                    patientAge={patientAge}
                  />
                )}
                {activeItem === "reproductive" && (
                  <ReproductiveIntentions
                    handleItemClick={handleItemClick}
                    setCompleted={setCompleted}
                    completed={completed}
                    setPatientObj={setPatientObj}
                    patientObj={patientObj}
                    setObservation={setObservation}
                    observation={observation}
                    patientAge={patientAge}
                  />
                )}
                {activeItem === "eligibility" && (
                  <Eligibilty
                    handleItemClick={handleItemClick}
                    setCompleted={setCompleted}
                    completed={completed}
                    setPatientObj={setPatientObj}
                    patientObj={patientObj}
                    setObservation={setObservation}
                    observation={observation}
                    patientAge={patientAge}
                  />
                )}
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ChronicCare;
