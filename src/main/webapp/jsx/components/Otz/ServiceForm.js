import React, { useState, useEffect } from "react";
import { Spinner, Form, FormGroup, Label, InputGroup, Input } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { FaPlus } from "react-icons/fa";
import { useServiceFormValidationSchema } from "../../formValidationSchema/ServiceFormValidationSchema";
import { Collapse, IconButton } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import MatButton from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import moment from "moment";
import axios from "axios";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";

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
    "& > *": {
      margin: theme.spacing(1),
    },
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
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const ServiceForm = (props) => {
  
  const [saving, setSavings] = useState(false);

  const submitNewRecord = (values) => {
    const observation = {
      data: values,
      dateOfObservation: moment(new Date()).format("YYYY-MM-DD"),
      facilityId: null,
      personId: props.patientObj.id,
      type: "Service OTZ",
      visitId: null,
    };
    axios
      .post(`${baseUrl}observation`, observation, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSavings(false);
        // props.patientObj.mentalHealth = true;
        toast.success("Service OTZ screening save successful.");
      })
      .catch((error) => {
        setSavings(false);
        let errorMessage =
          error.response.data && error.response.data.apierror.message !== ""
            ? error.response.data.apierror.message
            : "Something went wrong, please try again";
        toast.error(errorMessage);
      });
  };

  const updateOldRecord = (values) => {
    const observation = {
      data: values,
      dateOfObservation: moment(new Date()).format("YYYY-MM-DD"),
      facilityId: null,
      personId: props.patientObj.id,
      type: "Service OTZ",
      visitId: null,
    };
    axios
      .put(`${baseUrl}observation/${props.activeContent.id}`, observation, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSavings(false);
        toast.success("Service OTZ screening save successful.");
      })
      .catch((error) => {
        setSavings(false);
        let errorMessage =
          error.response.data && error.response.data.apierror.message !== ""
            ? error.response.data.apierror.message
            : "Something went wrong, please try again";
        toast.error(errorMessage);
      });
  };

  const handleSubmit = (values) => {
    if (props?.activeContent?.id) {
      updateOldRecord(values);
      return;
    }
    submitNewRecord(values);
  };

  const { formik } = useServiceFormValidationSchema(handleSubmit);

  const getOldRecordIfExists = () => {
    axios
      .get(`${baseUrl}observation/${props?.activeContent?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const patientDTO = response.data.data
        formik.setValues(patientDTO)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (props.activeContent.id) {
      getOldRecordIfExists()
    }
  }, [])
  
  const classes = useStyles();
  
  const [isDropdownsOpen, setIsDropdownsOpen] = useState({
    monthOneAdherenceCounselling: true,
    monthTwoAdherenceCounselling: true,
    monthThreeAdherenceCounselling: true,
    monthOneViralLoad: true,
    monthTwoViralLoad: true,
    monthThreeViralLoad: true,

    monthOneModulesActivities: true,
    monthTwoModulesActivities: true,
    monthThreeModulesActivities: true,

    sixMonthsPEVLM: true,
    twelveMonthsPEVLM: true,
    eighteenMonthsPEVLM: true,
    twentyFourMonthsPEVLM: true,
    thirtyMonthsPEVLM: true,
    thirtySixMonthsPEVLM: true,
  });

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar />
      <div
        className="row page-titles mx-0"
        style={{ marginTop: "0px", marginBottom: "-10px" }}
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <h2> OTZ Service Form</h2>
          </li>
        </ol>
      </div>

      <Card className={classes.root}>
        <CardContent>
          <div className="col-xl-12 col-lg-12">
            <Form>
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    General Information
                  </h5>

                  <>
                    <span className="float-end" style={{ cursor: "pointer" }}>
                      <FaPlus />
                    </span>
                  </>
                </div>

                <div className="row p-4">
                  {/* <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Facility Name</Label>

                      <Input
                        type="text"
                        name="facilityName"
                        id="facilityName"
                        value={formik.values.facilityName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.facilityName !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.facilityName}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>LGA</Label>

                      <Input
                        type="text"
                        name="lga"
                        id="lga"
                        value={formik.values.lga}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.lga !== "" ? (
                      <span className={classes.error}>{formik.errors.lga}</span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>State</Label>
                      <Input
                        name="state"
                        id="state"
                        type="text"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.state !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.state}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Client Name (Surname first)</Label>

                      <Input
                        type="text"
                        name="clientName"
                        id="clientName"
                        value={formik.values.clientName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.clientName !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.clientName}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Patient ID</Label>
                      <Input
                        name="patientId"
                        id="patientId"
                        type="text"
                        value={formik.values.patientId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.patientId !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.patientId}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Sex</Label>
                      <Input
                        name="sex"
                        id="sex"
                        type="select"
                        value={formik.values.sex}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Input>
                    </FormGroup>
                    {formik.errors.sex !== "" ? (
                      <span className={classes.error}>{formik.errors.sex}</span>
                    ) : (
                      ""
                    )}
                  </div> */}

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>ART start date</Label>
                      <Input
                        name="artStartDate"
                        id="artStartDate"
                        type="date"
                        value={formik.values.artStartDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                    </FormGroup>
                    {formik.errors.artStartDate !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.artStartDate}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Age at ART start (In years)</Label>
                      <Input
                        name="ageAtArtStart"
                        id="ageAtArtStart"
                        type="date"
                        value={formik.values.ageAtArtStart}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.ageAtArtStart !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.ageAtArtStart}
                      </span>
                    ) : (
                      ""
                    )}
                  </div> */}

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Age at ART start (In years)</Label>
                      <Input
                        name="ageAtArtStart"
                        id="ageAtArtStart"
                        type="date"
                        value={formik.values.ageAtArtStart}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.ageAtArtStart !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.ageAtArtStart}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Telephone</Label>
                      <Input
                        name="telephone"
                        id="telephone"
                        type="text"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.telephone !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.telephone}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Date enrolled into OTZ</Label>
                      <Input
                        name="dateEnrolledIntoOtz"
                        id="dateEnrolledIntoOtz"
                        type="date"
                        value={formik.values.dateEnrolledIntoOtz}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.dateEnrolledIntoOtz !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.dateEnrolledIntoOtz}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>OTZ plus</Label>
                      <Input
                        name="OtzPlus"
                        id="OtzPlus"
                        type="select"
                        value={formik.values.OtzPlus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                    {formik.errors.OtzPlus !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.OtzPlus}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>
                        Baseline Viral Load At Enrollment into OTZ (copies/ml)
                      </Label>
                      <Input
                        name="baselineViralLoadAtEnrollment"
                        id="baselineViralLoadAtEnrollment"
                        type="text"
                        value={formik.values.baselineViralLoadAtEnrollment}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.baselineViralLoadAtEnrollment !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.baselineViralLoadAtEnrollment}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label>Date Done</Label>
                      <Input
                        name="dateDone"
                        id="dateDone"
                        type="date"
                        value={formik.values.dateDone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      ></Input>
                    </FormGroup>
                    {formik.errors.dateDone !== "" ? (
                      <span className={classes.error}>
                        {formik.errors.dateDone}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    Adherence Counselling
                  </h5>

                  <>
                    <span className="float-end" style={{ cursor: "pointer" }}>
                      <FaPlus />
                    </span>
                  </>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Month one
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            monthOneAdherenceCounselling:
                              !prevState.monthOneAdherenceCounselling,
                          };
                        })
                      }
                      aria-expanded={
                        isDropdownsOpen.monthOneAdherenceCounselling
                      }
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.monthOneAdherenceCounselling}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth1EacDate1">
                                EAC 1 date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="acMonth1EacDate1"
                                id="acMonth1EacDate1"
                                value={formik.values.acMonth1EacDate1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.acMonth1EacDate1 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth1EacDate1}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth1EacDate2">
                                EAC 2 date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="acMonth1EacDate2"
                                id="acMonth1EacDate2"
                                value={formik.values.acMonth1EacDate2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.acMonth1EacDate2 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth1EacDate2}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth1EacDate3">EAC 3 date</Label>
                              <Input
                                type="date"
                                className="form-control"
                                name="acMonth1EacDate3"
                                id="acMonth1EacDate3"
                                value={formik.values.acMonth1EacDate3}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.acMonth1EacDate3 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth1EacDate3}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Month two
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            monthTwoAdherenceCounselling:
                              !prevState.monthTwoAdherenceCounselling,
                          };
                        })
                      }
                      aria-expanded={
                        isDropdownsOpen.monthTwoAdherenceCounselling
                      }
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.monthTwoAdherenceCounselling}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth2EacDate1">
                                EAC 1 date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="acMonth2EacDate1"
                                id="acMonth2EacDate1"
                                value={formik.values.acMonth2EacDate1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.acMonth2EacDate1 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth2EacDate1}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth2EacDate2">
                                EAC 2 date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="acMonth2EacDate2"
                                id="acMonth2EacDate2"
                                value={formik.values.acMonth2EacDate2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.acMonth2EacDate2 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth2EacDate2}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth2EacDate3">EAC 3 date</Label>
                              <Input
                                type="date"
                                className="form-control"
                                name="acMonth2EacDate3"
                                id="acMonth2EacDate3"
                                value={formik.values.acMonth2EacDate3}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.acMonth2EacDate3 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth2EacDate3}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Month three
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            monthThreeAdherenceCounselling:
                              !prevState.monthThreeAdherenceCounselling,
                          };
                        })
                      }
                      aria-expanded={
                        isDropdownsOpen.monthThreeAdherenceCounselling
                      }
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse
                      in={isDropdownsOpen.monthThreeAdherenceCounselling}
                    >
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth3EacDate1">
                                EAC 1 date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="acMonth3EacDate1"
                                id="acMonth3EacDate1"
                                value={formik.values.acMonth3EacDate1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.acMonth3EacDate1 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth3EacDate1}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth3EacDate2">
                                EAC 2 date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="acMonth3EacDate2"
                                id="acMonth3EacDate2"
                                value={formik.values.acMonth3EacDate2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.acMonth3EacDate2 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth3EacDate2}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="acMonth3EacDate3">EAC 3 date</Label>
                              <Input
                                type="date"
                                className="form-control"
                                name="acMonth3EacDate3"
                                id="acMonth3EacDate3"
                                value={formik.values.acMonth3EacDate3}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.acMonth3EacDate3 !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.acMonth3EacDate3}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    Modules activity/date of completion
                  </h5>

                  <>
                    <span className="float-end" style={{ cursor: "pointer" }}>
                      <FaPlus />
                    </span>
                  </>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Month one
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            monthOneModulesActivities:
                              !prevState.monthOneModulesActivities,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.monthOneModulesActivities}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.monthOneModulesActivities}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth1PositiveLivingChoice">
                                Positive Living
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth1PositiveLivingChoice"
                                id="maMonth1PositiveLivingChoice"
                                value={
                                  formik.values.maMonth1PositiveLivingChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth1PositiveLivingChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth1PositiveLivingChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                          {formik.values.maMonth1PositiveLivingChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth1PositiveLivingDate">
                                  Date for positive living
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth1PositiveLivingDate"
                                  id="maMonth1PositiveLivingDate"
                                  value={
                                    formik.values.maMonth1PositiveLivingDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth1PositiveLivingDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth1PositiveLivingDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth1LiteracyTreatmentChoice">
                                Literacy Treatment
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth1LiteracyTreatmentChoice"
                                id="maMonth1LiteracyTreatmentChoice"
                                value={
                                  formik.values.maMonth1LiteracyTreatmentChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth1LiteracyTreatmentChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth1LiteracyTreatmentChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth1LiteracyTreatmentChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth1LiteracyTreatmentDate">
                                  Date for literacy training
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth1LiteracyTreatmentDate"
                                  id="maMonth1LiteracyTreatmentDate"
                                  value={
                                    formik.values.maMonth1LiteracyTreatmentDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth1LiteracyTreatmentDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth1LiteracyTreatmentDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth1AdolescentsParticipationChoice">
                                Adolescents Participation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth1AdolescentsParticipationChoice"
                                id="maMonth1AdolescentsParticipationChoice"
                                value={
                                  formik.values
                                    .maMonth1AdolescentsParticipationChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth1AdolescentsParticipationChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth1AdolescentsParticipationChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values
                            .maMonth1AdolescentsParticipationChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth1AdolescentsParticipationDate">
                                  Date for adolescent participation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth1AdolescentsParticipationDate"
                                  id="maMonth1AdolescentsParticipationDate"
                                  value={
                                    formik.values
                                      .maMonth1AdolescentsParticipationDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth1AdolescentsParticipationDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth1AdolescentsParticipationDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth1leadershipTrainingChoice">
                                Leadership participation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth1leadershipTrainingChoice"
                                id="maMonth1leadershipTrainingChoice"
                                value={
                                  formik.values.maMonth1leadershipTrainingChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth1leadershipTrainingChoice !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth1leadershipTrainingChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth1leadershipTrainingChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth1leadershipTrainingDate">
                                  Date for adolescent participation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth1leadershipTrainingDate"
                                  id="maMonth1leadershipTrainingDate"
                                  value={
                                    formik.values.maMonth1leadershipTrainingDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth1leadershipTrainingDate !== "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth1leadershipTrainingDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth1PeerToPeerChoice">
                                Peer to Peer Mentorship
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth1PeerToPeerChoice"
                                id="maMonth1PeerToPeerChoice"
                                value={formik.values.maMonth1PeerToPeerChoice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth1PeerToPeerChoice !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth1PeerToPeerChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth1PeerToPeerChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth1PeerToPeerDate">
                                  Date for peer to peer mentorship
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth1PeerToPeerDate"
                                  id="maMonth1PeerToPeerDate"
                                  value={formik.values.maMonth1PeerToPeerDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth1PeerToPeerDate !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth1PeerToPeerDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth1RoleOfOtzChoice">
                                Role of OTZ in 95-95-95
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth1RoleOfOtzChoice"
                                id="maMonth1RoleOfOtzChoice"
                                value={formik.values.maMonth1RoleOfOtzChoice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth1RoleOfOtzChoice !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth1RoleOfOtzChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth1RoleOfOtzChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth1RoleOfOtzDate">
                                  Date for role of OTZ in 95-95-95
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth1RoleOfOtzDate"
                                  id="maMonth1RoleOfOtzDate"
                                  value={formik.values.maMonth1RoleOfOtzDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth1RoleOfOtzDate !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth1RoleOfOtzDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth1OtzChampionOrientationDate">
                                OTZ champion orientation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth1OtzChampionOrientationDate"
                                id="maMonth1OtzChampionOrientationDate"
                                value={
                                  formik.values
                                    .maMonth1OtzChampionOrientationDate
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth1OtzChampionOrientationDate !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth1OtzChampionOrientationDate
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth1OtzChampionOrientationDate ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth1OtzChampionOrientationChoice">
                                  Date for OTZ Champion Orientation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth1OtzChampionOrientationChoice"
                                  id="maMonth1OtzChampionOrientationChoice"
                                  value={
                                    formik.values
                                      .maMonth1OtzChampionOrientationChoice
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth1OtzChampionOrientationChoice !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth1OtzChampionOrientationChoice
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Month two
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            monthTwoModulesActivities:
                              !prevState.monthTwoModulesActivities,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.monthTwoModulesActivities}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.monthTwoModulesActivities}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth2PositiveLivingChoice">
                                Positive Living
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth2PositiveLivingChoice"
                                id="maMonth2PositiveLivingChoice"
                                value={
                                  formik.values.maMonth2PositiveLivingChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth2PositiveLivingChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth2PositiveLivingChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                          {formik.values.maMonth2PositiveLivingChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth2PositiveLivingDate">
                                  Date for positive living
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth2PositiveLivingDate"
                                  id="maMonth2PositiveLivingDate"
                                  value={
                                    formik.values.maMonth2PositiveLivingDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth2PositiveLivingDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth2PositiveLivingDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth2LiteracyTreatmentChoice">
                                Literacy Treatment
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth2LiteracyTreatmentChoice"
                                id="maMonth2LiteracyTreatmentChoice"
                                value={
                                  formik.values.maMonth2LiteracyTreatmentChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth2LiteracyTreatmentChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth2LiteracyTreatmentChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth2LiteracyTreatmentChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth2LiteracyTreatmentDate">
                                  Date for literacy training
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth2LiteracyTreatmentDate"
                                  id="maMonth2LiteracyTreatmentDate"
                                  value={
                                    formik.values.maMonth2LiteracyTreatmentDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth2LiteracyTreatmentDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth2LiteracyTreatmentDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth2AdolescentsParticipationChoice">
                                Adolescents Participation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth2AdolescentsParticipationChoice"
                                id="maMonth2AdolescentsParticipationChoice"
                                value={
                                  formik.values
                                    .maMonth2AdolescentsParticipationChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth2AdolescentsParticipationChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth2AdolescentsParticipationChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values
                            .maMonth2AdolescentsParticipationChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth2AdolescentsParticipationDate">
                                  Date for adolescent participation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth2AdolescentsParticipationDate"
                                  id="maMonth2AdolescentsParticipationDate"
                                  value={
                                    formik.values
                                      .maMonth2AdolescentsParticipationDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth2AdolescentsParticipationDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth2AdolescentsParticipationDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth2leadershipTrainingChoice">
                                Leadership participation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth2leadershipTrainingChoice"
                                id="maMonth2leadershipTrainingChoice"
                                value={
                                  formik.values.maMonth2leadershipTrainingChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth2leadershipTrainingChoice !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth2leadershipTrainingChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth2leadershipTrainingChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth2leadershipTrainingDate">
                                  Date for adolescent participation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth2leadershipTrainingDate"
                                  id="maMonth2leadershipTrainingDate"
                                  value={
                                    formik.values.maMonth2leadershipTrainingDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth2leadershipTrainingDate !== "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth2leadershipTrainingDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth2PeerToPeerChoice">
                                Peer to Peer Mentorship
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth2PeerToPeerChoice"
                                id="maMonth2PeerToPeerChoice"
                                value={formik.values.maMonth2PeerToPeerChoice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth2PeerToPeerChoice !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth2PeerToPeerChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth2PeerToPeerChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth2PeerToPeerDate">
                                  Date for peer to peer mentorship
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth2PeerToPeerDate"
                                  id="maMonth2PeerToPeerDate"
                                  value={formik.values.maMonth2PeerToPeerDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth2PeerToPeerDate !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth2PeerToPeerDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth2RoleOfOtzChoice">
                                Role of OTZ in 95-95-95
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth2RoleOfOtzChoice"
                                id="maMonth2RoleOfOtzChoice"
                                value={formik.values.maMonth2RoleOfOtzChoice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth2RoleOfOtzChoice !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth2RoleOfOtzChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth2RoleOfOtzChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth2RoleOfOtzDate">
                                  Date for role of OTZ in 95-95-95
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth2RoleOfOtzDate"
                                  id="maMonth2RoleOfOtzDate"
                                  value={formik.values.maMonth2RoleOfOtzDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth2RoleOfOtzDate !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth2RoleOfOtzDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth2OtzChampionOrientationChoice">
                                OTZ champion orientation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth2OtzChampionOrientationChoice"
                                id="maMonth2OtzChampionOrientationChoice"
                                value={
                                  formik.values
                                    .maMonth2OtzChampionOrientationChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth2OtzChampionOrientationChoice !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth2OtzChampionOrientationChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values
                            .maMonth2OtzChampionOrientationChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth2OtzChampionOrientationChoice">
                                  Date for OTZ Champion Orientation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth2OtzChampionOrientationChoice"
                                  id="maMonth2OtzChampionOrientationChoice"
                                  value={
                                    formik.values
                                      .maMonth2OtzChampionOrientationChoice
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth2OtzChampionOrientationChoice !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth2OtzChampionOrientationChoice
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Month three
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            monthThreeModulesActivities:
                              !prevState.monthThreeModulesActivities,
                          };
                        })
                      }
                      aria-expanded={
                        isDropdownsOpen.monthThreeModulesActivities
                      }
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.monthThreeModulesActivities}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3PositiveLivingChoice">
                                Positive Living
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth3PositiveLivingChoice"
                                id="maMonth3PositiveLivingChoice"
                                value={
                                  formik.values.maMonth3PositiveLivingChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth3PositiveLivingChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth3PositiveLivingChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                          {formik.values.maMonth3PositiveLivingChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth3PositiveLivingDate">
                                  Date for positive living
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth3PositiveLivingDate"
                                  id="maMonth3PositiveLivingDate"
                                  value={
                                    formik.values.maMonth3PositiveLivingDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth3PositiveLivingDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth3PositiveLivingDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3LiteracyTreatmentChoice">
                                Literacy Treatment
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth3LiteracyTreatmentChoice"
                                id="maMonth3LiteracyTreatmentChoice"
                                value={
                                  formik.values.maMonth3LiteracyTreatmentChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth3LiteracyTreatmentChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth3LiteracyTreatmentChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth3LiteracyTreatmentChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth3LiteracyTreatmentDate">
                                  Date for literacy training
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth3LiteracyTreatmentDate"
                                  id="maMonth3LiteracyTreatmentDate"
                                  value={
                                    formik.values.maMonth3LiteracyTreatmentDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth3LiteracyTreatmentDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth3LiteracyTreatmentDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3AdolescentsParticipationChoice">
                                Adolescents Participation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth3AdolescentsParticipationChoice"
                                id="maMonth3AdolescentsParticipationChoice"
                                value={
                                  formik.values
                                    .maMonth3AdolescentsParticipationChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth3AdolescentsParticipationChoice !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth3AdolescentsParticipationChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values
                            .maMonth3AdolescentsParticipationChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth3AdolescentsParticipationDate">
                                  Date for adolescent participation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth3AdolescentsParticipationDate"
                                  id="maMonth3AdolescentsParticipationDate"
                                  value={
                                    formik.values
                                      .maMonth3AdolescentsParticipationDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth3AdolescentsParticipationDate !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth3AdolescentsParticipationDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3leadershipTrainingChoice">
                                Leadership participation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth3leadershipTrainingChoice"
                                id="maMonth3leadershipTrainingChoice"
                                value={
                                  formik.values.maMonth3leadershipTrainingChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth3leadershipTrainingChoice !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth3leadershipTrainingChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth3leadershipTrainingChoice ===
                            "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth3leadershipTrainingDate">
                                  Date for adolescent participation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth3leadershipTrainingDate"
                                  id="maMonth3leadershipTrainingDate"
                                  value={
                                    formik.values.maMonth3leadershipTrainingDate
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth3leadershipTrainingDate !== "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth3leadershipTrainingDate
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3PeerToPeerChoice">
                                Peer to Peer Mentorship
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth3PeerToPeerChoice"
                                id="maMonth3PeerToPeerChoice"
                                value={formik.values.maMonth3PeerToPeerChoice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth3PeerToPeerChoice !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth3PeerToPeerChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth3PeerToPeerChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth3PeerToPeerDate">
                                  Date for peer to peer mentorship
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth3PeerToPeerDate"
                                  id="maMonth3PeerToPeerDate"
                                  value={formik.values.maMonth3PeerToPeerDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth3PeerToPeerDate !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth3PeerToPeerDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3RoleOfOtzChoice">
                                Role of OTZ in 95-95-95
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth3RoleOfOtzChoice"
                                id="maMonth3RoleOfOtzChoice"
                                value={formik.values.maMonth3RoleOfOtzChoice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors.maMonth3RoleOfOtzChoice !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.maMonth3RoleOfOtzChoice}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.maMonth3RoleOfOtzChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth3RoleOfOtzDate">
                                  Date for role of OTZ in 95-95-95
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth3RoleOfOtzDate"
                                  id="maMonth3RoleOfOtzDate"
                                  value={formik.values.maMonth3RoleOfOtzDate}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.maMonth3RoleOfOtzDate !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.maMonth3RoleOfOtzDate}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3OtzChampionOrientationChoice">
                                OTZ champion orientation
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="maMonth3OtzChampionOrientationChoice"
                                id="maMonth3OtzChampionOrientationChoice"
                                value={
                                  formik.values
                                    .maMonth3OtzChampionOrientationChoice
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                              {formik.errors
                                .maMonth3OtzChampionOrientationChoice !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .maMonth3OtzChampionOrientationChoice
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values
                            .maMonth3OtzChampionOrientationChoice === "yes" && (
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="maMonth3OtzChampionOrientationChoice">
                                  Date for OTZ Champion Orientation
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="maMonth3OtzChampionOrientationChoice"
                                  id="maMonth3OtzChampionOrientationChoice"
                                  value={
                                    formik.values
                                      .maMonth3OtzChampionOrientationChoice
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors
                                  .maMonth3OtzChampionOrientationChoice !==
                                "" ? (
                                  <span className={classes.error}>
                                    {
                                      formik.errors
                                        .maMonth3OtzChampionOrientationChoice
                                    }
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    Post Enrolment Viral Load Monitoring
                  </h5>

                  <>
                    <span className="float-end" style={{ cursor: "pointer" }}>
                      <FaPlus />
                    </span>
                  </>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      6 months
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            sixMonthsPEVLM: !prevState.sixMonthsPEVLM,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.sixMonthsPEVLM}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.sixMonthsPEVLM}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="sixMonthsResult">
                                Result
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="sixMonthsResult"
                                id="sixMonthsResult"
                                value={formik.values.sixMonthsResult}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.sixMonthsResult !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.sixMonthsResult}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="sixMonthsDate">
                                Date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="sixMonthsDate"
                                id="sixMonthsDate"
                                value={formik.values.sixMonthsDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.sixMonthsDate !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.sixMonthsDate}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      12 months
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            twelveMonthsPEVLM: !prevState.twelveMonthsPEVLM,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.twelveMonthsPEVLM}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.twelveMonthsPEVLM}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="twelveMonthsResult">
                                Result
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="twelveMonthsResult"
                                id="twelveMonthsResult"
                                value={formik.values.twelveMonthsResult}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.twelveMonthsResult !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.twelveMonthsResult}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="twelveMonthsDate">
                                Date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="twelveMonthsDate"
                                id="twelveMonthsDate"
                                value={formik.values.twelveMonthsDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.twelveMonthsDate !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.twelveMonthsDate}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      18 months
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            eighteenMonthsPEVLM: !prevState.eighteenMonthsPEVLM,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.eighteenMonthsPEVLM}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.eighteenMonthsPEVLM}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="eighteenMonthsResult">
                                Result
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="eighteenMonthsResult"
                                id="eighteenMonthsResult"
                                value={formik.values.eighteenMonthsResult}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.eighteenMonthsResult !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.eighteenMonthsResult}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="eighteenMonthsDate">
                                Date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="date"
                                name="eighteenMonthsDate"
                                id="eighteenMonthsDate"
                                value={formik.values.eighteenMonthsDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.eighteenMonthsDate !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.eighteenMonthsDate}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      24 months
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            twentyFourMonthsPEVLM:
                              !prevState.twentyFourMonthsPEVLM,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.twentyFourMonthsPEVLM}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.twentyFourMonthsPEVLM}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="twentyFourMonthsResult">
                                Result
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="twentyFourMonthsResult"
                                id="twentyFourMonthsResult"
                                value={formik.values.twentyFourMonthsResult}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.twentyFourMonthsResult !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.twentyFourMonthsResult}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="maMonth3LiteracyTreatmentChoice">
                                Date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="date"
                                name="twentyFourMonthsDate"
                                id="twentyFourMonthsDate"
                                value={formik.values.twentyFourMonthsDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.twentyFourMonthsDate !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.twentyFourMonthsDate}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      30 months
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            thirtyMonthsPEVLM: !prevState.thirtyMonthsPEVLM,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.thirtyMonthsPEVLM}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.thirtyMonthsPEVLM}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="thirtyMonthsResult">
                                Result
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="thirtyMonthsResult"
                                id="thirtyMonthsResult"
                                value={formik.values.thirtyMonthsResult}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.thirtyMonthsResult !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.thirtyMonthsResult}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="thirtyMonthsDate">
                                Date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="date"
                                name="thirtyMonthsDate"
                                id="thirtyMonthsDate"
                                value={formik.values.thirtyMonthsDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.thirtyMonthsDate !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.thirtyMonthsDate}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      36 months
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            thirtySixMonthsPEVLM:
                              !prevState.thirtySixMonthsPEVLM,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.thirtySixMonthsPEVLM}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.thirtySixMonthsPEVLM}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="thirtySixMonthsResult">
                                Result
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="thirtySixMonthsResult"
                                id="thirtySixMonthsResult"
                                value={formik.values.thirtySixMonthsResult}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.thirtySixMonthsResult !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.thirtySixMonthsResult}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="thirtySixMonthsDate">
                                Date
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <Input
                                className="form-control"
                                type="select"
                                name="thirtySixMonthsDate"
                                id="thirtySixMonthsDate"
                                value={formik.values.thirtySixMonthsDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              ></Input>
                              {formik.errors.thirtySixMonthsDate !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.thirtySixMonthsDate}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    Outcome
                  </h5>

                  <>
                    <span className="float-end" style={{ cursor: "pointer" }}>
                      <FaPlus />
                    </span>
                  </>
                </div>

                <div
                  className="basic-form"
                  style={{ padding: "0 50px 0 50px" }}
                >
                  <div className="row">
                    <div className="form-group mb-3 col-md-4 p-4">
                      <div className="form-check custom-checkbox ml-1 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="activeTb"
                          id="activeTb"
                          // value={props.tbObj.activeTb}
                          // onChange={handleInputChangeContrain}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                        >
                          Transferred out
                        </label>
                      </div>
                      <div className="form-check custom-checkbox ml-1 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="activeTb"
                          id="activeTb"
                          // value={props.tbObj.activeTb}
                          // onChange={handleInputChangeContrain}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                        >
                          LTFU
                        </label>
                      </div>
                      <div className="form-check custom-checkbox ml-1 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="activeTb"
                          id="activeTb"
                          // value={props.tbObj.activeTb}
                          // onChange={handleInputChangeContrain}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                        >
                          Dead
                        </label>
                      </div>
                      <div className="form-check custom-checkbox ml-1 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="activeTb"
                          id="activeTb"
                          // value={props.tbObj.activeTb}
                          // onChange={handleInputChangeContrain}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                        >
                          Opt-out
                        </label>
                      </div>
                      <div className="form-check custom-checkbox ml-1 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="activeTb"
                          id="activeTb"
                          // value={props.tbObj.activeTb}
                          // onChange={handleInputChangeContrain}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                        >
                          Transitioned to adult care
                        </label>
                      </div>
                      <div className="form-check custom-checkbox ml-1 ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="activeTb"
                          id="activeTb"
                          // value={props.tbObj.activeTb}
                          // onChange={handleInputChangeContrain}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                        >
                          Exited OTZ
                        </label>
                      </div>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="exitedOtz">
                          Exited OTZ
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="select"
                          name="exitedOtz"
                          id="exitedOtz"
                          value={formik.values.exitedOtz}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Input>
                        {formik.errors.exitedOtz !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.exitedOtz}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="transitionDate">
                          Transition Date
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="date"
                          name="transitionDate"
                          id="transitionDate"
                          value={formik.values.transitionDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.transitionDate !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.transitionDate}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="viralLoadOnOtzExit">
                          Viral load on OTZ exit
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="viralLoadOnOtzExit"
                          id="viralLoadOnOtzExit"
                          value={formik.values.viralLoadOnOtzExit}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.viralLoadOnOtzExit !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.viralLoadOnOtzExit}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="dateOfAssessmentDone">
                          Viral load assessment date
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="date"
                          name="dateOfAssessmentDone"
                          id="dateOfAssessmentDone"
                          value={formik.values.dateOfAssessmentDone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.dateOfAssessmentDone !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.dateOfAssessmentDone}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="exitedByName">
                          Exited by (Name)
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="exitedByName"
                          id="exitedByName"
                          value={formik.values.exitedByName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.exitedByName !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.exitedByName}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="exitedByDesignation">
                          Exited by (Designation)
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="exitedByDesignation"
                          id="exitedByDesignation"
                          value={formik.values.exitedByDesignation}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.exitedByDesignation !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.exitedByDesignation}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="exitedByDate">
                          Exited by (Date)
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="date"
                          name="exitedByDate"
                          id="exitedByDate"
                          value={formik.values.exitedByDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.exitedByDate !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.exitedByDate}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="exitedBySignature">
                          Exited by (Signature)
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="exitedBySignature"
                          id="exitedBySignature"
                          value={formik.values.exitedBySignature}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.exitedBySignature !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.exitedBySignature}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <MatButton
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ backgroundColor: "#014d88" }}
                  startIcon={<SaveIcon />}
                  disabled={saving}
                  onClick={() => handleSubmit(formik.values)}
                >
                  {!saving ? (
                    <span style={{ textTransform: "capitalize" }}>Submit</span>
                  ) : (
                    <span style={{ textTransform: "capitalize" }}>
                      Submitting...
                    </span>
                  )}
                </MatButton>
              </div>

              {saving && <Spinner />}
              <br />
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceForm;
