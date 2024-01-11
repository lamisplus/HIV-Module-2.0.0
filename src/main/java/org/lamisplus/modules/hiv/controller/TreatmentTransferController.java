package org.lamisplus.modules.hiv.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.*;
import org.lamisplus.modules.hiv.domain.entity.PatientInfoProjection;
import org.lamisplus.modules.hiv.service.TreatmentTransferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/treatment-transfers")
public class TreatmentTransferController {

    private final TreatmentTransferService treatmentTransferService;

    @GetMapping("/{facilityId}/{patientUuid}")
    @ApiOperation(value = "Get transfer patient information.")
    public ResponseEntity<Optional<PatientInfoProjection>> getPatientInformation(@PathVariable("patientUuid") String uuid,
                                                                                                  @PathVariable("facilityId") Long facilityId ) {
        return ResponseEntity.ok(treatmentTransferService.retrieveTransferPatientInfo(uuid, facilityId));
    }

    @GetMapping("/patient_result/{facilityId}/{patientUuid}")
    @ApiOperation(value = "Get patient lab results.")
    public ResponseEntity<List<LabReport>> getPatientLabResult(@PathVariable("patientUuid") String uuid, @PathVariable("facilityId") Long facilityId) {
        return ResponseEntity.ok(treatmentTransferService.retrieveTransferPatientLabResult(facilityId, uuid));
    }

    @GetMapping("/{personUuid}")
    @ApiOperation(value = "Get patient current Medication")
    public ResponseEntity<List<MedicationInfo>> getCurrentMedication(@PathVariable String personUuid) {
        return ResponseEntity.ok(treatmentTransferService.getCurrentMedication(personUuid));
    }

}
