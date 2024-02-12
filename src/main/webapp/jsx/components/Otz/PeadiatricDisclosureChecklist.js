import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import CreatePeadiatricDisclosureChecklist from "./CreatePeadiatricDisclosureChecklist";
import EditAndViewPeadiatricDisclosureChecklist from "./EditAndViewPaediatricDisclosureChecklist";

const PeadiatricDisclosureChecklist = (props) => {
  const actionType = props.activeContent.actionType;
  return (
    <>
      {actionType === "create" ? (
        <CreatePeadiatricDisclosureChecklist {...props} key={actionType} />
      ) : (
        <EditAndViewPeadiatricDisclosureChecklist {...props} key={actionType} />
      )}
    </>
  );
};

export default PeadiatricDisclosureChecklist;
