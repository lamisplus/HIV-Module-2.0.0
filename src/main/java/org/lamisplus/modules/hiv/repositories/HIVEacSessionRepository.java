package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.hiv.domain.entity.HIVEacSession;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface HIVEacSessionRepository extends JpaRepository<HIVEacSession, Long> {
	
	List<HIVEacSession> getHIVEacSesByEac(HIVEac hivEac);
	List<HIVEacSession> getHIVEacSessionByPersonAndArchived(Person person,Integer archived);

	//For central sync
	List<HIVEacSession> findAllByFacilityId(Long facilityId);

	@Query(value = "SELECT * FROM hiv_eac_session WHERE last_modified_date > ?1 AND facility_id=?2",
			nativeQuery = true
	)
	List<HIVEacSession> getAllDueForServerUpload(LocalDateTime dateLastSync, Long facilityId);

	Optional<HIVEacSession> findByUuid(String uuid);
}