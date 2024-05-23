package org.lamisplus.modules.hiv.repositories;

import org.lamisplus.modules.hiv.domain.entity.DSDOutlet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DSDOutletRepository extends JpaRepository<DSDOutlet, Long> {

    @Query(value = "SELECT * FROM dsd_outlet WHERE lga = :lga and archived = :archived", nativeQuery = true)
    List<DSDOutlet> findByLga(String lga, int archived);

}
