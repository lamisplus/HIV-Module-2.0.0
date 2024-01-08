package org.lamisplus.modules.hiv.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.LocalDateTime;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.controller.exception.ApiError;
import org.lamisplus.modules.hiv.controller.exception.NoRecordFoundException;
import org.lamisplus.modules.hiv.domain.dto.*;
import org.lamisplus.modules.hiv.domain.entity.Observation;
import org.lamisplus.modules.hiv.domain.entity.PatientTracker;
import org.lamisplus.modules.hiv.repositories.ObservationRepository;
import org.lamisplus.modules.hiv.repositories.PatientTrackerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TreatmentTransferService {

    private final ObservationRepository observationRepository;
    private final ObservationService observationService;
    private final HIVStatusTrackerService hivStatusTrackerService;

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
            } else {
                throw new IllegalArgumentException("Patient uuid or facility id can not be null");
            }
        } catch (Exception e) {
            throw new NoRecordFoundException("Error while retrieving patients current cd4: " + e.getMessage());
        }
    }


    /**
     * check patient hiv status before form is submitted
     * if dead, return a message that patient is dead
     * if not  register form, save information in the observation table
     * change the patient hiv_status_tracker to transfer
     */
    public ObservationDto registerTransferPatientInfo(TransferPatientDto dto) throws Exception {
        if (dto == null) {
            throw new IllegalArgumentException("TransferPatientInfo is null");
        }
//       patient hiv status is "Died(Confirmed)"
        if(dto.getHivStatus().equalsIgnoreCase("Died(Confirmed)")){
            throw new Exception("Patient is confirmed dead");
        }
        HIVStatusTrackerDto hivStatusTracker = hivStatusTrackerService.getHIVStatusTrackerById(dto.getHivStatusId());
        if (hivStatusTracker == null) {
            throw new Exception("Patient tracker not found");
        }
        // Create observation
        ObservationDto createdObservation = createObservation(dto);
        // Update HIVStatusTracker and set status transfer date to today
        hivStatusTracker.setHivStatus("Transfer");
        hivStatusTracker.setStatusDate(LocalDate.now());
        hivStatusTrackerService.updateHIVStatusTracker(hivStatusTracker.getId(), hivStatusTracker);

        return createdObservation;
    }



    private JsonNode mapTransferPatientInfoToDto(TransferPatientDto transferPatientDto) {
        TransferPatientInfo transferPatientInfo = getTransferPatientInfo(transferPatientDto.getPersonUuid());
        if(transferPatientInfo == null) {
            throw new EntityNotFoundException(Observation.class, "Person uuid", transferPatientDto.getPersonUuid());
        }
        BeanUtils.copyProperties(transferPatientInfo, transferPatientDto);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.valueToTree(transferPatientDto);
    }

    private ObservationDto createObservation(TransferPatientDto transferPatientDto) {
        log.info("Inside createObservation");
        ObservationDto observationDto = new ObservationDto();
        observationDto.setPersonId(transferPatientDto.getPatientId());
        observationDto.setVisitId(null);
        observationDto.setType("Transfer");
        observationDto.setDateOfObservation(LocalDate.now());
        observationDto.setFacilityId(transferPatientDto.getFacilityId());
        observationDto.setData(mapTransferPatientInfoToDto(transferPatientDto));
        return observationService.createAnObservation(observationDto);
    }

}