package org.lamisplus.modules.hiv.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.RegisterArtPharmacyDto;
import org.lamisplus.modules.hiv.domain.entity.Regimen;
import org.lamisplus.modules.hiv.repositories.ArtPharmacyRepository;
import org.lamisplus.modules.hiv.service.ArtPharmacyService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hiv/art/pharmacy")
public class ArtPharmacyController {
    private final ArtPharmacyService artPharmacyService;
    
    private  final ArtPharmacyRepository repository;

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<RegisterArtPharmacyDto> registerArtPharmacy(@RequestBody RegisterArtPharmacyDto registerArtPharmacyDto) throws IOException {
        return ResponseEntity.ok (artPharmacyService.registerArtPharmacy (registerArtPharmacyDto));
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<RegisterArtPharmacyDto> updateArtPharmacy(
            @PathVariable("id") Long id,
            @RequestBody RegisterArtPharmacyDto registerArtPharmacyDto) throws IOException {
        return ResponseEntity.ok (artPharmacyService.updateArtPharmacy (id, registerArtPharmacyDto));
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<RegisterArtPharmacyDto> getPharmacyById(@PathVariable("id") Long id)  {
        return ResponseEntity.ok (artPharmacyService.getPharmacyById (id));
    }
    @GetMapping(value = "/patient/current-regimen/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Regimen> getCurrentRegimen(@PathVariable("id") Long id)  {
        return ResponseEntity.ok (artPharmacyService.getCurrentRegimenByPersonId(id));
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE )
    ResponseEntity<String> deletePharmacyById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (artPharmacyService.deleteById (id));
    }

    @GetMapping(value = "/patient", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RegisterArtPharmacyDto>> getAllPharmacyByPatientId(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam Long personId) {
        List<RegisterArtPharmacyDto> list = artPharmacyService.getPharmacyByPersonId (personId, pageNo, pageSize);
        return new ResponseEntity<> (list, new HttpHeaders (), HttpStatus.OK);
    }
    


}
