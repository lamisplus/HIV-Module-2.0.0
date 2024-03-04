package org.lamisplus.modules.hiv.domain.entity;

import lombok.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name="laboratory_result")
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CurrentViralLoad  implements Persistable<Long>, Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "result_reported")
    private String viralLoadTestResult;

    @Column(name = "date_result_reported")
    private LocalDate viralLoadResultDate;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
