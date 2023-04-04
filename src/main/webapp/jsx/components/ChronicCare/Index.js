import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import MatButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import { Spinner,Form, } from "reactstrap";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee, faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons'
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import {FaPlus, FaAngleDown} from 'react-icons/fa'
import {token, url as baseUrl } from "../../../api";
import ChronicConditions from './ChronicConditions';
import Eligibilty from './Eligibilty';
import GenderBase from './GenderBase';
import NutritionalStatus from './NutritionalStatus';
import PositiveHealthDignity from './PositiveHealthDignity';
import ReproductiveIntentions from './ReproductiveIntentions';
import Tb from './Tb';
import Tpt from './Tpt';

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
        '& > *': {
            margin: theme.spacing(1)
        },
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
    demo: {
        backgroundColor: theme.palette.background.default,
    },
    inline: {
        display: "inline",
    },
    error:{
        color: '#f85032',
        fontSize: '12.8px'
    },  
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    },
}));


const UserRegistration = (props) => {
    const [saving, setSaving] = useState(false);
    const classes = useStyles();
    const [showEligibility, setShowEligibility] = useState(false);
    const [showNutrition, setShowNutrition] = useState(false);
    const [showGenderBase, setShowGenderBase] = useState(false);
    const [showChronicCondition, setShowChronicCondition] = useState(false);
    const [showPositiveHealth, setShowPositiveHealth] = useState(false);
    const [showReproductive, setShowReproductive] = useState(false);
    const [showTb, setShowTb] = useState(false);//Tpt
    const [showTpt, setShowTpt] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault(); 

    }

    const onClickEligibility =() =>{
        setShowEligibility(!showEligibility)
    }
    const onClickTb =() =>{
        setShowTb(!showTb)
    }
    const onClickNutrition =() =>{
        setShowNutrition(!showNutrition)
    }
    const onClickGenderBase =() =>{
        setShowGenderBase(!showGenderBase)
    }
    const onClickChronicCondition =() =>{
        setShowChronicCondition(!showChronicCondition)
    }
    const onClickPositiveHealth =() =>{
        setShowPositiveHealth(!showPositiveHealth)
    }
    const onClickReproductive =() =>{
        setShowReproductive(!showReproductive)
    }
    const onClickTpt =() =>{
        setShowTpt(!showTpt)
    }

    const handleCancel =()=>{
        //history.push({ pathname: '/' });
    }


    return (
        <>
        <ToastContainer autoClose={3000} hideProgressBar />
        <div className="row page-titles mx-0" style={{marginTop:"0px", marginBottom:"-10px"}}>
			<ol className="breadcrumb">
				<li className="breadcrumb-item active"><h2> Chronic Care</h2></li>
			</ol>
		  </div>

            <Card className={classes.root}>
                <CardContent>
                    
                    <div className="col-xl-12 col-lg-12">
                        <Form >
                            {/* Eligibility Assessment */}
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>TB & IPT Screening </h5>
                                    {showTb===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickTb}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickTb}><FaAngleDown /></span> </>)}
                                </div>
                                {showTb && (
                                    <Tb />  
                                )}
                            </div>
                            {/* End Eligibility Assessment */}
                             {/* TPT MONITORING */}
                             <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>TPT Monitoring</h5>
                                    {showTpt===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickTpt}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickTpt}><FaAngleDown /></span> </>)}
                                </div>
                                {showTpt && (
                                    <Tpt />  
                                )}
                            </div>
                            {/* End Eligibility Assessment */}
                             {/* Eligibility Assessment */}
                             <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Eligibility Assessment</h5>
                                    {showEligibility===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickEligibility}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickEligibility}><FaAngleDown /></span> </>)}
                                </div>
                                {showEligibility && (
                                    <Eligibilty /> 
                                )}
                            </div>
                            {/* End Eligibility Assessment */}
                            {/* End Nutritional Status Assessment */}
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Nutritional Status Assessment</h5>
                                    {showNutrition===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickNutrition}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickNutrition}><FaAngleDown /></span> </>)}
                                </div>
                                {showNutrition && (
                                  <NutritionalStatus />
                                )}
                            </div>
                            {/* End Nutritional Status Assessment */}
                            {/* Gender Based Violence Screening */}
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Gender Based Violence Screening </h5>
                                    {showGenderBase===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickGenderBase}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickGenderBase}><FaAngleDown /></span> </>)}
                                </div>
                                {showGenderBase && (
                                <div className="card-body">
                                    <div className="row">
                                       <GenderBase />
                                    </div>

                                </div>
                                )}
                            </div>
                            {/* End Gender Based Violence Screening */}
                            {/* End Screening for Chronic Conditions */}
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Screening for Chronic Conditions</h5>
                                    {showChronicCondition===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickChronicCondition}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickChronicCondition}><FaAngleDown /></span> </>)}
                                </div>
                                {showChronicCondition && (
                                <div className="card-body">
                                    <div className="row">
                                       <ChronicConditions />
                                    </div>

                                </div>
                                )}
                            </div>
                            {/* End Screening for Chronic Conditions */}
                            {/* Positive Health Dignity and Prevention */}
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Positive Health Dignity and Prevention(PHDP) </h5>
                                    {showPositiveHealth===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickPositiveHealth}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickPositiveHealth}><FaAngleDown /></span> </>)}
                                </div>
                                {showPositiveHealth && (
                                <div className="card-body">
                                    <div className="row">
                                       <PositiveHealthDignity />
                                    </div>

                                </div>
                                )}
                            </div>
                            {/* End Positive Health Dignity and Prevention */} 
                            {/* Reproductive Intentions */}
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Reproductive Intentions </h5>
                                    {showReproductive===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickReproductive}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickReproductive}><FaAngleDown /></span> </>)}
                                </div>
                                {showReproductive && (
                                <div className="card-body">
                                    <div className="row">
                                        <ReproductiveIntentions />
                                    </div>

                                </div>
                                )}
                            </div>
                            {/* End Reproductive Intentions */}
                            {saving ? <Spinner /> : ""}

                            <br />
                            <MatButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={handleSubmit}
                               
                                style={{backgroundColor:'#014d88',fontWeight:"bolder"}}
                            >
                                {!saving ? (
                                    <span style={{ textTransform: "capitalize" }}>Save</span>
                                ) : (
                                    <span style={{ textTransform: "capitalize" }}>Saving...</span>
                                )}
                            </MatButton>
    
                            <MatButton
                                variant="contained"
                                className={classes.button}
                                startIcon={<CancelIcon />}
                                style={{backgroundColor:'#992E62'}}
                                onClick={handleCancel}
                            >
                                <span style={{ textTransform: "capitalize", color:"#fff" }}>Cancel</span>
                            </MatButton>
                        </Form>
                    </div>
                </CardContent>
            </Card>
 
        </>
    );
};

export default UserRegistration