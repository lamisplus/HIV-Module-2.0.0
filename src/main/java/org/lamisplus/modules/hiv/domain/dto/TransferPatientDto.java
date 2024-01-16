package org.lamisplus.modules.hiv.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferPatientDto {

    private String Id;
    private Long patientId;
    private String personUuid;
    private Long facilityId;
    private String facilityName;
    private String lga;
    private String state;
    private Double weight;
    private Double height;
    private String pregnancyStatus;
    private String dateConfirmedHiv;
    private String dateEnrolledInCare;
    private String dateEnrolledInTreatment;
    private Integer adherenceLevel;
    private String currentWhoClinical;
    private Integer currentCD4Count;
    private Integer baselineCD4;
    private Integer viralLoad;
    private String currentRegimenLine;
    private String firstLineArtRegimen;
    private Long hivStatusId;
    private String hivStatus;
//    private List<MedicationInfo> currentMedication;
//    private List<LabReport> labReports;
}
