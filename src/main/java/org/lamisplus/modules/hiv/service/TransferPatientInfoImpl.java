package org.lamisplus.modules.hiv.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.TransferPatientInfo;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferPatientInfoImpl implements TransferPatientInfo {
    private Long patientId;
    private String personUuid;
    private Long facilityId;
    private String facilityName;
    private String lga;
    private String state;
    private Double weight;
    private Double height;
    private String pregnancyStatus;
    private LocalDate dateConfirmedHiv;
    private LocalDate dateEnrolledInCare;
    private LocalDate dateEnrolledInTreatment;
    private Integer adherenceLevel;
    private String currentWhoClinical;
    private Integer currentCD4Count;
    private Integer baselineCD4;
    private Integer viralLoad;
    private String currentRegimenLine;
    private String firstLineArtRegimen;

}
