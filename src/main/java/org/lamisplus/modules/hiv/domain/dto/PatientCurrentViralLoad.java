package org.lamisplus.modules.hiv.domain.dto;

import java.time.LocalDate;

public interface PatientCurrentViralLoad {

    String getPersonUuid();
    String getResultReported();
    LocalDate getDateResultReported();

}
