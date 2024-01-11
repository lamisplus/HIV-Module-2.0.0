package org.lamisplus.modules.hiv.domain.entity;
import java.time.LocalDate;

public interface PatientInfoProjection {
    String getFacilityName();
    String getLga();
    String getState();
    LocalDate getDateConfirmed_Hiv();
    LocalDate getDateEnrolledInCare();
    LocalDate getDateEnrolledInTreatment();
    String getRegimenAtStart();
    LocalDate getDateOfEnrollment();
    String getRegimenLineAtStart();
    String getBaselineCD4Count();
    Double getLatestHeight();
    Double getLatestWeight();
    Double getViralLoad();
    String getAdherenceLevel();
}

