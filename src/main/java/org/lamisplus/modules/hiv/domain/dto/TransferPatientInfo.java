package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;

public interface TransferPatientInfo {
    String getPersonUuid();
    String getFacilityName();
    String getLga();
    String getState();
    Double getWeight();
    Double getHeight();
    String getPregnancyStatus();
    LocalDate getDateConfirmedHiv();
    LocalDate getDateEnrolledInCare();
    LocalDate getDateEnrolledInTreatment();
    Integer getAdherenceLevel();
    String getCurrentWhoClinical();
    Integer getCurrentCD4Count();
    Integer getBaselineCD4();
    Integer getViralLoad();
    String getCurrentRegimenLine();
    String getFirstLineArtRegimen();
}

