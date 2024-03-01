package org.lamisplus.modules.hiv.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CurrentViralLoadDTO implements Serializable {
    private  Long id;
    private String viralLoadTestResult;
    private LocalDate viralLoadResultDate;
}
