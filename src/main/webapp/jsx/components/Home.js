import React, { useState, Fragment, useEffect, lazy, Suspense } from "react";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import LoadingSpinner from "../../reuseables/Loading";
const Dashboard = lazy(() => import("./Patient/PatientList"));
const CheckedInPatients = lazy(() => import("./Patient/CheckedInPatients"));
const ArtPatients = lazy(() => import("./Patient/ArtPatients"));
const Ovc = lazy(() => import("./Ovc/Index"));

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = () => {
  const [key, setKey] = useState("checkedIn");
  const [activeTab, setActiveTab] = useState("checkedIn");

  const handleTabSelect = (k) => {
    setKey(k);
    setActiveTab(k);
  };

  return (
    <Fragment>
      <div
        className="row page-titles mx-0"
        style={{ marginTop: "0px", marginBottom: "-10px" }}
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <h4>ART</h4>
          </li>
        </ol>
      </div>
      <br />
      <br />
      <Row>
        <Col xl={12}>
          <Card style={divStyle}>
            <Card.Body>
              <div className="custom-tab-1">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={handleTabSelect}
                  className="mb-3"
                >
                  {/* <Tab eventKey="home" title="Find Patients">
                    <Suspense fallback={<LoadingSpinner />}>
                      {activeTab === "home" && <Dashboard />}
                    </Suspense>
                  </Tab> */}

                  <Tab eventKey="checkedIn" title="Checked-In Patients">
                    <Suspense fallback={<LoadingSpinner />}>
                      {activeTab === "checkedIn" && <CheckedInPatients />}
                    </Suspense>
                  </Tab>

                  <Tab eventKey="art-patients" title="ART Patients">
                    <Suspense fallback={<LoadingSpinner />}>
                      {activeTab === "art-patients" && <ArtPatients />}
                    </Suspense>
                  </Tab>

                  <Tab eventKey="list" title="OVC Linkage">
                    <Suspense fallback={<LoadingSpinner />}>
                      {activeTab === "list" && <Ovc />}
                    </Suspense>
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

export default Home;
