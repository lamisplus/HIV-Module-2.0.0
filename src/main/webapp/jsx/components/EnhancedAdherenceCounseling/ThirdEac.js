import React, {useState, useEffect} from 'react';
import { Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import { Icon,Button, } from 'semantic-ui-react'
import FirstEAC from './EnhancedAdherenceCounseling';
import ContinueEAC from './SecondEac';

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
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: 'none'
    } 
}))

const EAC = (props) => {
    //const patientObj = props.patientObj;
    const classes = useStyles()
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true)
    const [objValues, setObjValues]=useState({
                                                dateOfEac1: null,
                                                dateOfEac2: null,
                                                dateOfEac3: null,
                                                dateOfLastViralLoad: "",
                                                lastViralLoad:"",
                                                note: "",
                                                personId: props.patientObj.id,
                                                status: "",
                                                visitId:""
                                            })
    useEffect(() => {
        EACHistory()
    }, [props.patientObj.id]);
    ///GET LIST OF EAC
    const EACHistory =()=>{
        setLoading(true)
        axios
            .get(`${baseUrl}observation/eac/person/current-eac/${props.patientObj.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
            setLoading(false)
            setObjValues(response.data)
            })
            .catch((error) => {
            //console.log(error);
            });    
    }
    const handleInputChange = e => {
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
    }          
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();        
          setSaving(true);
          objValues.status='Third'
          axios.post(`${baseUrl}observation/eac`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  props.setHideThird(false)
                  props.setHideFirst(false)                 
                  props.setEacObj(response.data)
                  toast.success(" Save successful");
                  props.setActiveContent({...props.activeContent, route:'recent-history'})

              })
              .catch(error => {
                setSaving(false);
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
              });
          
    }

  return (      
        <div>                   
            <Card >
                <CardBody>
                <form >
                    <div className="row">
                    <h2>Enhanced Adherence Counselling </h2>
                        <br/>
                        <br/>
                        <br/>
                        <h4>Second EAC Date {objValues.dateOfEac2}</h4>
                        <br/>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="">Date of Third EAC </Label>
                            <Input
                                type="date"
                                name="dateOfEac3"
                                id="dateOfEac3"
                                value={objValues.dateOfEac3}
                                onChange={handleInputChange}
                                min={objValues.dateOfEac2}
                                //max= {moment(new Date()).format("YYYY-MM-DD") }
                                style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                required
                            />
                            {errors.dateOfEac3 !=="" ? (
                                <span className={classes.error}>{errors.dateOfEac3}</span>
                            ) : "" }
                            </FormGroup>
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
                    disabled={objValues.dateOfEac3==="" ? true : false}
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

export default EAC;