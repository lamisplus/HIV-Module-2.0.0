package org.lamisplus.modules.hiv.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final ObjectMapper objectMapper;

    public Optional<PatientInfoProjection> retrieveTransferPatientInfo(String patientUuid, Long facilityId) {
        try {
            if (patientUuid == null || facilityId == null) {
                throw new IllegalArgumentException("Transfer patient uuid or facility id can not be null");
            }
            return observationRepository.getTransferPatientTreatmentInfo(facilityId, patientUuid);
        } catch (Exception e) {
            throw new RuntimeException("Error why retrieving transfer patient info : " + e.getCause());
        }
    }

    public List<LabReport> retrieveTransferPatientLabResult(Long facilityId, String uuid) {
        try {
            if (uuid == null || facilityId == null) {
                throw new IllegalArgumentException("Transfer patient uuid or facility id can not be null");
            }
            return observationRepository.getPatientLabResults(facilityId, uuid);
        } catch (Exception e) {
            throw new RuntimeException("Error why retrieving : " + e.getCause());
        }
    }

    public List<MedicationInfo> getCurrentMedication(String personUuid) {
        try {
            if (personUuid == null) {
                throw new IllegalArgumentException("Person uuid can not be null");
            }
            return observationRepository.getTransferPatientTreatmentMedication(personUuid);
        } catch (Exception e) {
            throw new RuntimeException("Error why retrieving : " + e.getCause());
        }
    }
}