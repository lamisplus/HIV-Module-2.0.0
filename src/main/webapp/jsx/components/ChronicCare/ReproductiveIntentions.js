
import React, { useEffect, useState} from "react";
import axios from "axios";
import {FormGroup, Label , CardBody, Spinner,Input,Form, InputGroup,
    InputGroupText,

} from "reactstrap";
import * as moment from 'moment';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
// import AddIcon from "@material-ui/icons/Add";
// import CancelIcon from "@material-ui/icons/Cancel";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { useHistory, } from "react-router-dom";
// import {TiArrowBack} from 'react-icons/ti'
import {token, url as baseUrl } from "../../../api";
import 'react-phone-input-2/lib/style.css'
import 'semantic-ui-css/semantic.min.css';
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button} from 'semantic-ui-react'
import {  Modal } from "react-bootstrap";


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
        maxWidth: 752,
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


const ReproductiveIntentions = (props) => {

    const [errors, setErrors] = useState({});
    let temp = { ...errors } 
    useEffect(() => { 
        if(props.observation.data ){
            setAssesment(props.observation.data.assesment) 
            setWho(props.observation.data.who)             
        }
    }, [props.observation.data]);  
    const [who, setWho] = useState({stage:"", stage1Value:"",stage2Value:"", stage3Value:"",stage4Value:""});

    const [assesment, setAssesment] = useState({assessment:""});
    const handleAssessment =e =>{
        setAssesment({...assesment, [e.target.name]: e.target.value})
        
    }

    const handleItemClick =(page, completedMenu)=>{
        props.handleItemClick(page)
        if(props.completed.includes(completedMenu)) {

        }else{
            props.setCompleted([...props.completed, completedMenu])
        }
    }  
    /**** Submit Button Processing  */
    const handleSubmit = (e) => { 
        e.preventDefault();  
        props.observation.data.assesment = assesment
        props.observation.data.who=who  
        toast.success("Record save successful");
        handleItemClick('plan', 'who' )                  
    }
        
return (
        <>  
        
            <Card >
                <CardBody>   
                <h2 style={{color:'#000'}}>Reproductive Intentions</h2>
                <br/>
                    <form >
                    {/* Medical History form inputs */}
                    <div className="row">
                        <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>Have you been screened for cervical cancer in the last one year?</Label>
                                    <Input 
                                        type="select"
                                        name="assessment"
                                        id="assessment"
                                        onChange={handleAssessment} 
                                        value={assesment.assessment} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                   
                                    </Input>

                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>Do you intend to get pregnant within the next one year?</Label>
                                    <Input 
                                        type="select"
                                        name="assessment"
                                        id="assessment"
                                        onChange={handleAssessment} 
                                        value={assesment.assessment} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">                                    
                            <FormGroup>
                            <Label>Are you currently using a contraceptive?</Label>
                                    <Input 
                                        type="select"
                                        name="assessment"
                                        id="assessment"
                                        onChange={handleAssessment} 
                                        value={assesment.assessment} 
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    </Input>

                            </FormGroup>
                        </div>
                    </div>
                    <br/>
                    <Button content='Back' icon='left arrow' labelPosition='left' style={{backgroundColor:"#992E62", color:'#fff'}} onClick={()=>handleItemClick('appearance', 'appearance')}/>
                    <Button content='Next' type="submit" icon='right arrow' labelPosition='right' style={{backgroundColor:"#014d88", color:'#fff'}} onClick={handleSubmit}/>
                    
                    </form>
                    
                </CardBody>
            </Card> 
                                     
        </>
    );
};

export default ReproductiveIntentions