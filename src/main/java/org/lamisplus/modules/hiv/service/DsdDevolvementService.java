package org.lamisplus.modules.hiv.service;

import java.io.IOException;
import java.util.UUID;

import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.DsdDevolvementDTO;
import org.lamisplus.modules.hiv.domain.dto.RegisterArtPharmacyDTO;
import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.hiv.domain.entity.DsdDevolvement;
import org.lamisplus.modules.hiv.repositories.DsdDevolvementRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

@Service
@RequiredArgsConstructor
@Slf4j
public class DsdDevolvementService {
    private final DsdDevolvementRepository dsdDevolvementRepository;
    private final PersonRepository personRepository;
    private final CurrentUserOrganizationService organizationUtil;

    public DsdDevolvementDTO saveDsdDevolvement(DsdDevolvementDTO dto) throws IOException {
        try {

            DsdDevolvement dsdDevolvement = convertDsdDevolvementDtoToEntity(dto);
            dsdDevolvement.setUuid(UUID.randomUUID().toString());
            dsdDevolvement.setArchived(0);
            return convertEntityToDsdDevolvementDto(dsdDevolvementRepository.save(dsdDevolvement));
        } catch (JsonProcessingException e) {
            // Handle JsonProcessingException
            e.printStackTrace();
            return null; // Or throw a custom exception
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

    public String deleteById(Long id) throws IOException{
        DsdDevolvement existDevolvement = getDevolvement(id);
        existDevolvement.setArchived(1);
        dsdDevolvementRepository.save(existDevolvement);
        return "Successfully deleted record";
    }


    //implement model mapper
    private DsdDevolvement  convertDsdDevolvementDtoToEntity(DsdDevolvementDTO dto) throws JsonProcessingException {
        DsdDevolvement dsdDevolvement = new DsdDevolvement();
        BeanUtils.copyProperties(dto, dsdDevolvement);
        Long personId = dto.getPersonId();
        Person person = getPerson(personId);
        dsdDevolvement.setPerson(person);
        dsdDevolvement.setFacilityId(organizationUtil.getCurrentUserOrganization());
        return dsdDevolvement;
    }

    private DsdDevolvementDTO convertEntityToDsdDevolvementDto(DsdDevolvement entity) throws IOException {
		DsdDevolvementDTO dto = new DsdDevolvementDTO();
		BeanUtils.copyProperties(entity, dto);
		//log.info(" dto 1st:  {}", dto);
		dto.setPersonId(entity.getPerson().getId());
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
