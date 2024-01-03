package org.lamisplus.modules.hiv.service;

import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.hiv.domain.dto.*;
import org.lamisplus.modules.hiv.domain.entity.PatientInfoProjection;
import org.lamisplus.modules.hiv.repositories.ObservationRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TreatmentTransferService {

    private final ObservationRepository observationRepository;

    public PatientInfoProjection retrieveTransferPatientInfo(String patientUuid, Long facilityId) {
        try {
            if (patientUuid != null && facilityId != null) {
                return observationRepository.getTransferPatientTreatmentInfo(facilityId, patientUuid)
                        .orElseThrow(() -> new NoRecordFoundException("Patient record not found"));
            } else {
                throw new IllegalArgumentException("patientUuid and facilityId cannot be null");
            }
        } catch (Exception e) {
            log.info("Error while retrieving transfer patient info", e);
            throw new NoRecordFoundException("Error while retrieving transfer patient info: " + e.getMessage());
        }
    }

    public TransferPatientInfo getTransferPatientInfo(String patientUuid) {
        try {
            if (patientUuid != null) {
                return observationRepository.getTransferPatientInfo(patientUuid)
                        .orElseThrow(() -> new NoRecordFoundException("Patient record not found"));
            } else {
                throw new IllegalArgumentException("patientUuid and facilityId cannot be null");
            }
        } catch (Exception e) {
            log.info("Error while retrieving transfer patient info", e);
            throw new NoRecordFoundException("Error while retrieving transfer patient info: " + e.getMessage());
        }
    }

    public List<LabReport> retrieveTransferPatientLabResult(Long facilityId, String uuid) {
        try {
            if (uuid != null && facilityId != null) {
                return observationRepository.getPatientLabResults(facilityId, uuid);
            } else {
                throw new IllegalArgumentException("Transfer patient uuid or facility id can not be null");
            }
        } catch (Exception e) {
            // Log the exception for troubleshooting
            log.info("Error while retrieving transfer patient lab results", e);
            throw new NoRecordFoundException("Error while retrieving transfer patient lab result: " + e.getMessage());
        }
    }

    public List<MedicationInfo> getCurrentMedication(String personUuid) {
        try {
            if (personUuid != null) {
              return observationRepository.getTransferPatientTreatmentMedication(personUuid);
            } else {
                throw new IllegalArgumentException("Person uuid can not be null");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while retrieving patients  current medication: " + e.getCause());
        }
    }

    public PatientCurrentCD4 getPatientCurrentCD4(String patientUuid, Long facilityId) {
        try {
            if (patientUuid != null && facilityId != null) {
                Optional<PatientCurrentCD4> result = observationRepository.getPatientCurrentCD4(patientUuid, facilityId);
                return result.orElse(null);
            }else {
                throw new IllegalArgumentException("Patient uuid or facility id can not be null");
            }
        } catch (Exception e) {
            throw new NoRecordFoundException("Error while retrieving patients current cd4: " + e.getMessage());
        }
    }

}