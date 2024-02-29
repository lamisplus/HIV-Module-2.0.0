package org.lamisplus.modules.hiv.controller;

import java.io.IOException;

import org.hibernate.annotations.GeneratorType;
import org.lamisplus.modules.hiv.domain.dto.DsdDevolvementDTO;
import org.lamisplus.modules.hiv.domain.dto.RegisterArtPharmacyDTO;
import org.lamisplus.modules.hiv.service.DsdDevolvementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;



@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hiv/art/pharmacy/devolve")
public class DsdDevolvementController {
    private final DsdDevolvementService devolvementService;

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<DsdDevolvementDTO> saveDsdDevolvement(@RequestBody  DsdDevolvementDTO  dto) throws IOException {
        try {
            return new ResponseEntity<>(devolvementService.saveDsdDevolvement(dto), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<DsdDevolvementDTO> updateDsdDevolvement(@PathVariable("id") Long id, @RequestBody DsdDevolvementDTO dto) throws IOException{
        try{
            return ResponseEntity.ok (devolvementService.updateDsdDevolvement(id, dto));
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }  
    
    @GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<DsdDevolvementDTO> getDevolvementById(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok (devolvementService.getDevolvementById(id));
        } catch (Exception e) {
           e.printStackTrace();
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<String> deleteDevolvementById(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(devolvementService.deleteById(id));  
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
      
    } 
}
