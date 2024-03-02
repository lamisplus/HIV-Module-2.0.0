package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.lamisplus.modules.hiv.domain.entity.DsdDevolvement;

public interface DsdDevolvementRepository extends JpaRepository<DsdDevolvement, Long> {
    Page<DsdDevolvement> findAllByPersonAndArchived(Person person, Integer archived, Pageable pageable);
}
