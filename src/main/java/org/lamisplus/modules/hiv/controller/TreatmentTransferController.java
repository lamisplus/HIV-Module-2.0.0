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

//    @GetMapping("/{facilityId}/{patientUuid}")
//    @ApiOperation(value = "Get transfer patient information")
//    public ResponseEntity<PatientInfoProjection> getPatientInformation(@PathVariable("patientUuid") String uuid,
//                                                                                                  @PathVariable("facilityId") Long facilityId ) {
//        return ResponseEntity.ok(treatmentTransferService.retrieveTransferPatientInfo(uuid, facilityId));
//    }

    @GetMapping("/info/{patientUuid}")
    @ApiOperation(value = "Get patient treatment transfer information.")
    public ResponseEntity<TransferPatientInfo> getTransferPatientInformation(@PathVariable("patientUuid") String uuid) {
        return ResponseEntity.ok(treatmentTransferService.getTransferPatientInfo(uuid));
    }

    @GetMapping("/patient_result/{facilityId}/{patientUuid}")
    @ApiOperation(value = "Get patient lab results")
    public ResponseEntity<List<LabReport>> getPatientLabResult(@PathVariable("patientUuid") String uuid, @PathVariable("facilityId") Long facilityId) {
        return ResponseEntity.ok(treatmentTransferService.retrieveTransferPatientLabResult(facilityId, uuid));
    }

    @GetMapping("/{personUuid}")
    @ApiOperation(value = "Get patient current Medication")
    public ResponseEntity<List<MedicationInfo>> getCurrentMedication(@PathVariable String personUuid) {
        return ResponseEntity.ok(treatmentTransferService.getCurrentMedication(personUuid));
    }

//    @GetMapping("/patient_current_cd4/{facilityId}/{patientUuid}")
//    @ApiOperation(value = "Get patient current CD4")
//    public ResponseEntity<PatientCurrentCD4> getPatientCurrentCD4(@PathVariable("patientUuid") String uuid, @PathVariable("facilityId") Long facilityId) {
//        return ResponseEntity.ok(treatmentTransferService.getPatientCurrentCD4(uuid, facilityId));
//    }
//
//    @GetMapping("/patient_baseline_cd4/{facilityId}/{patientUuid}")
//    @ApiOperation(value = "Get patient baseline CD4")
//    public ResponseEntity<BaseLineCd4Count> getPatientBaselineCD4(@PathVariable("patientUuid") String uuid, @PathVariable("facilityId") Long facilityId) {
//        return ResponseEntity.ok(treatmentTransferService.getPatientBaselineCD4(uuid, facilityId));
//    }

}
