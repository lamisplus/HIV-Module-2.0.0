import React, { useState, useEffect } from "react";
import { Spinner, Form, FormGroup, Label, Input } from "reactstrap";
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
import CustomFormGroup from "./CustomFormGroup";
import CreateServiceForm from "./CreateServiceForm";
import EditServiceForm from "./EditServiceForm";

const ServiceForm = (props) => {
  return (
    <>
      {props?.activeContent?.actionType === "create" ? (
        <CreateServiceForm {...props} key={props?.activeContent?.actionType} />
      ) : (
        <EditServiceForm {...props} key={props?.activeContent?.actionType} />
      )}
    </>
  );
};

export default ServiceForm;
