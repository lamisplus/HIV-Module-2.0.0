import React, { useEffect, useState } from "react";
//import { Button} from 'semantic-ui-react'
import { Card, CardBody } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
//import { toast} from "react-toastify";
import { url as baseUrl, token } from "../../../../api";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { useLocation } from "react-router-dom";
//import {TiArrowBack} from 'react-icons/ti'
//import {token, url as baseUrl } from "../../../api";
import "react-phone-input-2/lib/style.css";
import { Icon, Menu, Sticky } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import MedicalHistory from "./MedicalHistory";
import PastArv from "./PastArv";
import PhysicalExamination from "./PhysicalExamination";
import Appearance from "./Appearance";
import WhoStaging from "./WhoStaging";
import Plan from "./Plan";
import ChildRegimenNextAppointment from "./ChildRegimenNextAppointment";
import AdultRegimenNextAppointment from "./AdultRegimenNextAppointment";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "#f85032",
    fontSize: "12.8px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const UserRegistration = (props) => {
  //const classes = useStyles();
  const location = useLocation();
  const locationState = location.state;
  const [saving, setSaving] = useState(false);
  const [activeItem, setactiveItem] = useState("medical-history");
  const [completed, setCompleted] = useState([]);
  const [patientObj, setPatientObj] = useState(
    props && props.patientObj ? props.patientObj : ""
  );
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
    personId: props.patientObj.id,
    type: "Clinical evaluation",
    visitId: null,
  });
  const handleItemClick = (activeItem) => {
    setactiveItem(activeItem);
    //setCompleted({...completed, ...completedMenu})
  };
  useEffect(() => {
    GetInitialEvaluation();
  }, [props.activeContent.id]);
  const GetInitialEvaluation = () => {
    axios
      .get(`${baseUrl}observation/${props.activeContent.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //const newmedicalHistory=response.data.data.medicalHistory
        // observation.dateOfObservation =  response.data.dateOfObservation
        // observation.facilityId =  response.data.facilityId
        // observation.type =  response.data.type
        setObservation(response.data);
        //setPatientObj(response.data)
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

  const patientAge = calculate_age(
    moment(props.patientObj.dateOfBirth).format("DD-MM-YYYY")
  );
  

  return (
    <>
      <Card>
        <CardBody>
          <div className="row">
            {calculate_age(
              moment(props.patientObj.dateOfBirth).format("DD-MM-YYYY")
            ) <= 14 ? (
              <h2>Pediatric- Initial Clinical Evaluation ssd</h2>
            ) : (
              <h2>Adult- Initial Clinical Evaluation </h2>
            )}
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
                    active={activeItem === "medical-history"}
                    onClick={() => handleItemClick("medical-history")}
                    style={{
                      backgroundColor:
                        activeItem === "medical-history" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'medical-history' ? true : false}
                  >
                    <span style={{ color: "#fff" }}>
                      {" "}
                      Medical History
                      {completed.includes("medical-history") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    name="inbox"
                    active={activeItem === "past-arv"}
                    onClick={() => handleItemClick("past-arv")}
                    style={{
                      backgroundColor: activeItem === "past-arv" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'past-arv' ? true : false}
                  >
                    <span style={{ color: "#fff" }}>
                      Past/Current ARV
                      {completed.includes("past-arv") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>

                    {/* <Label color='teal'>3</Label> */}
                  </Menu.Item>
                  <Menu.Item
                    name="spam"
                    active={activeItem === "physical-examination"}
                    onClick={() => handleItemClick("physical-examination")}
                    style={{
                      backgroundColor:
                        activeItem === "physical-examination" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'physical-examination' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Physical Examination
                      {completed.includes("physical-examination") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    name="spam"
                    active={activeItem === "appearance"}
                    onClick={() => handleItemClick("appearance")}
                    style={{
                      backgroundColor:
                        activeItem === "appearance" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'appearance' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      General Appearance
                      {completed.includes("appearance") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    name="spam"
                    active={activeItem === "who"}
                    onClick={() => handleItemClick("who")}
                    style={{
                      backgroundColor: activeItem === "who" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'who' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Assessment & WHO
                      {completed.includes("who") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    name="spam"
                    active={activeItem === "plan"}
                    onClick={() => handleItemClick("plan")}
                    style={{
                      backgroundColor: activeItem === "plan" ? "#000" : "",
                    }}
                    //disabled={activeItem !== 'plan' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Plan & Enroll In
                      {completed.includes("plan") && (
                        <Icon name="check" color="green" />
                      )}
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    name="spam"
                    active={activeItem === "regimen"}
                    onClick={() => handleItemClick("regimen")}
                    style={{
                      backgroundColor: activeItem === "regimen" ? "#000" : "",
                    }}
                    // disabled={activeItem !== 'regimen' ? true : false}
                  >
                    {/* <Label>4</Label> */}
                    <span style={{ color: "#fff" }}>
                      Regimen & <br />
                      Next Appointment
                      {completed.includes("regimen") && (
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
                {activeItem === "medical-history" && (
                  <MedicalHistory
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
                {activeItem === "past-arv" && (
                  <PastArv
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
                {activeItem === "physical-examination" && (
                  <PhysicalExamination
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
                {activeItem === "appearance" && (
                  <Appearance
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
                {activeItem === "who" && (
                  <WhoStaging
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
                {activeItem === "plan" && (
                  <Plan
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
                {activeItem === "regimen" && (
                  <>
                    {calculate_age(
                      moment(props.patientObj.dateOfBirth).format("DD-MM-YYYY")
                    ) <= 14 ? (
                      <ChildRegimenNextAppointment
                        handleItemClick={handleItemClick}
                        setCompleted={setCompleted}
                        completed={completed}
                        setPatientObj={setPatientObj}
                        patientObj={patientObj}
                        setObservation={setObservation}
                        observation={observation}
                        activeContent={props.activeContent}
                        setActiveContent={props.setActiveContent}
                        patientAge={patientAge}
                      />
                    ) : (
                      <AdultRegimenNextAppointment
                        handleItemClick={handleItemClick}
                        setCompleted={setCompleted}
                        completed={completed}
                        setPatientObj={setPatientObj}
                        patientObj={patientObj}
                        setObservation={setObservation}
                        observation={observation}
                        activeContent={props.activeContent}
                        setActiveContent={props.setActiveContent}
                        patientAge={patientAge}
                      />
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserRegistration;
