package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.repositories.ArtPharmacyRepository;
import org.lamisplus.modules.hiv.repositories.HIVEacRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class VLStatusManagement {
	
	private final HIVEacRepository hIVEacRepository;
	
	private  final ArtPharmacyRepository artPharmacyRepository;
	
	
	// person id
	public boolean isPatientVlSampleCollected(String personUuid) {
		return !hIVEacRepository.getVLSampleCollectionsByPatientUuid(personUuid).isEmpty();
		
	}
	
	
	public Integer getPatientDurationOnArt(String personUuid, LocalDate reportedDate) {
		// get ART start date
		// artPharmacyRepository.getCurrentPharmacyRefillWithDateRange()
		return null;
	}
	
	
	public String getPatientCurrentRegimen(String personUuid) {
		
		return null;
	}
	
	
	public boolean DeterminePatientVlEligibilityStatus(String personUuid) {
		
		return false;
	}
	
	
	
	
	
	
}
