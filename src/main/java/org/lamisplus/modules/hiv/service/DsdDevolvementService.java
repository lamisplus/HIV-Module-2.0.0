package org.lamisplus.modules.hiv.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.CurrentViralLoadDTO;
import org.lamisplus.modules.hiv.domain.dto.DsdDevolvementDTO;
import org.lamisplus.modules.hiv.domain.dto.PatientCurrentViralLoad;
import org.lamisplus.modules.hiv.domain.entity.CurrentViralLoad;
import org.lamisplus.modules.hiv.domain.entity.DsdDevolvement;
import org.lamisplus.modules.hiv.repositories.CurrentViralLoadRepository;
import org.lamisplus.modules.hiv.repositories.DsdDevolvementRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

@Service
@RequiredArgsConstructor
@Slf4j
public class DsdDevolvementService {
    private final DsdDevolvementRepository dsdDevolvementRepository;
    private final PersonRepository personRepository;
    private final CurrentUserOrganizationService organizationUtil;

    private final CurrentViralLoadRepository currentViralLoadRepository;

    public DsdDevolvementDTO saveDsdDevolvement(DsdDevolvementDTO dto) throws IOException {
        try {

            DsdDevolvement dsdDevolvement = convertDsdDevolvementDtoToEntity(dto);
            dsdDevolvement.setUuid(UUID.randomUUID().toString());
            dsdDevolvement.setArchived(0);
            // before saving check if the date of devolvement is existing for the person, if yes don't save
            List<DsdDevolvementDTO> devolvements = this.getDsdDevolvementByPersonId(dto.getPersonId(), 0, 10);
            if(devolvements.size() > 0){
                for(DsdDevolvementDTO devolvement: devolvements){
                    if(devolvement.getDateDevolved().equals(dto.getDateDevolved())){
                        throw new RuntimeException("Devolvement already exists for this date");
                    }
                }
            }
            return convertEntityToDsdDevolvementDto(dsdDevolvementRepository.save(dsdDevolvement));
        } catch (JsonProcessingException e) {
            // Handle JsonProcessingException
            e.printStackTrace();
            return null;
        }
    }

    public DsdDevolvementDTO updateDsdDevolvement(Long id, DsdDevolvementDTO dto) throws IOException{
        DsdDevolvement existDevolvement = getDevolvement(id);
        DsdDevolvement dsdDevolvement = convertDsdDevolvementDtoToEntity(dto);
        dsdDevolvement.setId(existDevolvement.getId());
        dsdDevolvement.setPerson(existDevolvement.getPerson());
        dsdDevolvement.setArchived(0);
        return convertEntityToDsdDevolvementDto(dsdDevolvementRepository.save(dsdDevolvement));
    }


    public DsdDevolvementDTO getDevolvementById(Long id) throws IOException{
        return convertEntityToDsdDevolvementDto(getDevolvement(id));
    }

    public List<DsdDevolvementDTO> getDsdDevolvementByPersonId(Long personId, int pageNo, int pageSize){
        Person person = getPerson(personId);
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("dateDevolved").descending());
        Page<DsdDevolvement> devolveVisits = dsdDevolvementRepository.findAllByPersonAndArchived(person, 0, paging);
        if (devolveVisits.hasContent()) {
           return devolveVisits.getContent().stream().map(this::convertEntityToDsdDevolvementDto).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    public Optional<CurrentViralLoadDTO> getCurrentViralLoadByPersonId(Long personId){
            Optional<CurrentViralLoad> currentViralLoad = currentViralLoadRepository.findViralLoadByPersonId(personId);
            return  convertEntityTocurrentViralLoadDto(currentViralLoad);
    }

    public Optional<PatientCurrentViralLoad> getPatientCurrentViralLoadByPersonUuid(String personUuid) {
        try {
            Optional<PatientCurrentViralLoad> patientCurrentViralLoad = dsdDevolvementRepository.findViralLoadByPersonUuid(personUuid);
            return patientCurrentViralLoad;
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }


    public String deleteById(Long id) throws IOException{
        DsdDevolvement existDevolvement = getDevolvement(id);
        existDevolvement.setArchived(1);
        dsdDevolvementRepository.save(existDevolvement);
        return "Successfully deleted record";
    }


    //implement model mapper
    private Optional<CurrentViralLoadDTO> convertEntityTocurrentViralLoadDto(Optional<CurrentViralLoad> entity){
        CurrentViralLoadDTO dto = new CurrentViralLoadDTO();
        try {
            BeanUtils.copyProperties(entity, dto);
            dto.setId(entity.get().getId());
            dto.setViralLoadResultDate(entity.get().getViralLoadResultDate());
            dto.setViralLoadTestResult(entity.get().getViralLoadTestResult());
        }catch (Exception e){
            e.printStackTrace();
        }
        return Optional.of(dto);
    }
    private DsdDevolvement  convertDsdDevolvementDtoToEntity(DsdDevolvementDTO dto) throws JsonProcessingException {
        DsdDevolvement dsdDevolvement = new DsdDevolvement();
        try {
            BeanUtils.copyProperties(dto, dsdDevolvement);
            Long personId = dto.getPersonId();
            Person person = getPerson(personId);
            dsdDevolvement.setPerson(person);
            dsdDevolvement.setFacilityId(organizationUtil.getCurrentUserOrganization());
        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error converting entity to DTO: " + e.getMessage(), e);
        }
        return dsdDevolvement;
    }

    private DsdDevolvementDTO convertEntityToDsdDevolvementDto(DsdDevolvement entity){
		DsdDevolvementDTO dto = new DsdDevolvementDTO();
        try {
            BeanUtils.copyProperties(entity, dto);
            dto.setPersonId(entity.getPerson().getId());
        }catch (Exception e){
            e.printStackTrace();
        }
		return dto;
	}


    //helper functions
    private DsdDevolvement getDevolvement(Long id){
        return dsdDevolvementRepository.findById(id).orElseThrow(()-> getDevolvementNotFoundException(id));
    }

    private Person getPerson(Long personId) {
		return  personRepository.findById(personId).orElseThrow(() -> getPersonEntityNotFoundException(personId));
	}

    @NotNull
	private EntityNotFoundException getPersonEntityNotFoundException(Long personId) {
		return new EntityNotFoundException(Person.class, "id ", "" + personId);
	}

    @NotNull
	private EntityNotFoundException getDevolvementNotFoundException(Long id) {
		return new EntityNotFoundException(DsdDevolvement.class, "id ", "" + id);
	}

}
