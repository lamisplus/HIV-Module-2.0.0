package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.ARTClinical;
import org.lamisplus.modules.hiv.repositories.ARTClinicalRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.hiv.utility.CustomDateTimeFormat;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ClinicActivityProvider implements PatientActivityProvider {

    private final ARTClinicalRepository artClinicalRepository;

        @Override
        public List<PatientActivity> getActivitiesFor(Person person) {
            List<ARTClinical> clinicVisits = artClinicalRepository.findAllByPersonAndIsCommencementIsFalseAndArchived (person, 0);
            StringBuilder name = new StringBuilder("Clinic visit follow up");
            return clinicVisits.stream ()
                    .map (clinical -> {
                        LocalDate visitDate =  CustomDateTimeFormat.handleNullDateActivity(name, clinical.getVisitDate());
                        return new PatientActivity (clinical.getId (), name.toString(), visitDate, "", "clinic-visit");
                    })
                    .collect(Collectors.toList());
        }
}
