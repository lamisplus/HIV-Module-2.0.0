import { useFormik } from "formik";
import * as yup from "yup";

export const usePeadiatricFormValidationSchema = (onSubmit) => {
  const peadiatricFormIntialValues = {
    facilityName: "",
    childName: "",
    dob: "",
    caregiverName: "",
    sex: "",
    cccNumber: "",

    dateTask1Executed: "",
    task1HCW: "",
    task1Comments: "",
    task1ChildMetCriteria: "",
    task1ChildAndCaregiverKnowledgeable: "",
    task1CaregiverWilling: "",

    dateTask2Executed: "",
    task2HCW: "",
    task2Comments: "",
    task2FreeFromPhysicalIllness: "",
    task2ChildConsisitentFamilyPeer: "",
    task2ChildDemostrateInEnvAndPlaying: "",
    task2AssessedWhatChildAlreadyKnows: "",
    taskAssessedFunctionalSchoolEngagement: "",
    task2assessedCaregiverReadinessForDisclosureToChild: "",
    task2AssessedCaregiverCommunicatedToChild: "",
    task2DiscussedManagementOfConfidentiality: "",

    dateTask3Executed:"",
    task3HCW:"",
    task3Comments:"",
    task3ReassuredTheCaregiverAndChild: "",
    task3AssessedChildAndCaregiverComfort: "",
    task3AssessedSafety: "",
    task3AssessedTheDepthOfChildKnowledge: "",
    task3SupportedCaregiverToDisclose: "",
    task3ObservedTheImmediateReactionOfChildAndCaregiver: "",
    task3InvitedQuestionsFromChild: "",
    task3RevistedBenefitsOfDisclosureWithChild: "",
    task3ExplainedCareOptionsAvailable: "",
    task3ConcludedSessionWithReassurance: "",
  };

  const PeadiatricFormInitialSchema = yup.object({
    facilityName: yup.string(),
    childName: yup.string(),
    dob: yup.string(),
    caregiverName: yup.string(),
    sex: yup.string(),
    cccNumber: yup.string(),

    dateTask1Executed: yup.date(),
    task1HCW: yup.string(),
    task1Comments: yup.string(),
    task1ChildMetCriteria: yup.string(),
    task1ChildAndCaregiverKnowledgeable: yup.string(),
    task1CaregiverWilling: yup.string(),

    dateTask2Executed: yup.date(),
    task2HCW: yup.string(),
    task2Comments: yup.string(),
    task2FreeFromPhysicalIllness: yup.string(),
    task2ChildConsisitentFamilyPeer: yup.string(),
    task2ChildDemostrateInEnvAndPlaying: yup.string(),
    task2AssessedWhatChildAlreadyKnows: yup.string(),
    taskAssessedFunctionalSchoolEngagement: yup.string(),
    task2assessedCaregiverReadinessForDisclosureToChild: yup.string(),
    task2AssessedCaregiverCommunicatedToChild: yup.string(),
    task2DiscussedManagementOfConfidentiality: yup.string(),

    dateTask3Executed: yup.string(),
    task3HCW: yup.string(),
    task3Comments: yup.string(),
    task3ReassuredTheCaregiverAndChild: yup.string(),
    task3AssessedChildAndCaregiverComfort: yup.string(),
    task3AssessedSafety: yup.string(),
    task3AssessedTheDepthOfChildKnowledge: yup.string(),
    task3SupportedCaregiverToDisclose: yup.string(),
    task3ObservedTheImmediateReactionOfChildAndCaregiver: yup.string(),
    task3InvitedQuestionsFromChild: yup.string(),
    task3RevistedBenefitsOfDisclosureWithChild: yup.string(),
    task3ExplainedCareOptionsAvailable: yup.string(),
    task3ConcludedSessionWithReassurance: yup.string(),

    
  });

  const formik = useFormik({
    initialValues: peadiatricFormIntialValues,
    onSubmit,
    validationSchema: PeadiatricFormInitialSchema,
  });
   return { formik };;
};



