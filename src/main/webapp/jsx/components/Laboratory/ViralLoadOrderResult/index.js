import React, {useState, Fragment, useEffect } from "react";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import ViralLoadOrder from './ViralLoadOrder';
import ViralLoadOrderResult from './ViralLoadOrderResult';
import ViralLoadOrderResultHistory from "./ViralLoadOrderResultHistory";
//import LaboratoryRDE from "./LaboratoryRDE";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const LaboratoryModule = (props) => {
    const [key, setKey] = useState('home');
    const patientObj = props.patientObj
    useEffect ( () => {
      setKey(props.activeContent.activeTab)
    }, [props.activeContent.id]);


  return (
    <Fragment>  
      <Row>       
        <Col xl={12}>
          <Card style={divStyle}>            
            <Card.Body>
              {/* <!-- Nav tabs --> */}
              <div className="custom-tab-1">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                  {/* <Tab eventKey="checked-in" title="Checked In Patients">                   
                    <CheckedInPatients />
                  </Tab> */}
                  <Tab eventKey="home" title="VIRAL LOAD ORDER">                   
                    <ViralLoadOrder patientObj={patientObj} setActiveContent={props.setActiveContent}/>
                  </Tab>
                  <Tab eventKey="viralLoad" title="VIRAL LOAD ORDER & RESULT">                   
                    <ViralLoadOrderResult patientObj={patientObj} setActiveContent={props.setActiveContent}/>
                  </Tab>
                  <Tab eventKey="history" title=" HISTORY">                   
                    <ViralLoadOrderResultHistory patientObj={patientObj} setActiveContent={props.setActiveContent}/>
                  </Tab>                   
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Fragment>
  );
};

export default LaboratoryModule;
