package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.DsdDevolvement;
import org.lamisplus.modules.hiv.repositories.DsdDevolvementRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DSDActivityProvider implements PatientActivityProvider {
    private final DsdDevolvementRepository dsdDevolvementRepository;



    @Override
    public List<PatientActivity> getActivitiesFor(Person person) {

        Page<DsdDevolvement> dsdList = dsdDevolvementRepository.findAllByPersonAndArchived(person, 0, null);
        return dsdList.getContent().stream()
                .filter(Objects::nonNull)
                .map(this::buildPatientActivity).collect(Collectors.toList());

    }

    @NotNull
    private PatientActivity buildPatientActivity(DsdDevolvement e) {
        StringBuilder name = new StringBuilder("DSD Service");
        return new PatientActivity(e.getId(), name.toString(), e.getDateDevolved(), "", "dsd-service-form");
    }
}
