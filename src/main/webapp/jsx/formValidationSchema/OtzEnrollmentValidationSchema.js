import { useFormik } from "formik";
import * as yup from "yup";

export const useServiceFormValidationSchema = (onSubmit, initialValues) => {
  const serviceFormInitialValues = {
    artStartDate: "",
    dateEnrolledIntoOtz: "",
    otzPlus: "",
    baselineViralLoadAtEnrollment: "",
    dateDone: "",
  };

  const mergedInitialValues = initialValues
    ? { ...serviceFormInitialValues, ...initialValues }
    : serviceFormInitialValues;

  const ServiceFormValidationSchema = yup.object({
    dateEnrolledIntoOtz: yup.date().required("This field is required"),
    otzPlus: yup.string(),
    dateDone: yup.date().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: mergedInitialValues,
    onSubmit,
    validationSchema: ServiceFormValidationSchema,
  });
  return { formik };
};
