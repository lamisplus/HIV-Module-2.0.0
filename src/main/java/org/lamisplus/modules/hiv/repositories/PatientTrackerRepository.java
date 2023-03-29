package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.Observation;
import org.lamisplus.modules.hiv.domain.entity.PatientTracker;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PatientTrackerRepository extends JpaRepository<PatientTracker, Long> {
	List<PatientTracker> getPatientTrackerByPersonAndArchived(Person patient, Integer archived);

	//For central sync
	List<PatientTracker> findAllByFacilityId(Long facilityId);

	@Query(value = "SELECT * FROM hiv_patient_tracker WHERE last_modified_date > ?1 AND facility_id=?2",
			nativeQuery = true
	)
	List<PatientTracker> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);

	Optional<PatientTracker> findByUuid(String uuid);
	
}
