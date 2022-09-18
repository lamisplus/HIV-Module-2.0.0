package org.lamisplus.modules.hiv.domain.entity;

import lombok.*;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "hiv_eac_out_come")
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EacOutCome extends HivAuditEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;
	@OneToOne
	@JoinColumn(name = "eac_id", referencedColumnName = "uuid", nullable = false)
	private  HIVEac eac;
	@ManyToOne
	@JoinColumn(name = "person_uuid", referencedColumnName = "uuid", nullable = false)
	private Person person;
	@ManyToOne
	@JoinColumn(name = "visit_id", referencedColumnName = "uuid", nullable = false)
	private Visit visit;
	private Double repeatViralLoader;
	private String outcome;
	private String plan;
	private String currentRegimen;
	private String switchRegimen;
	private String reasonSwitched;
	private String reasonSubstituted;
	private String substituteRegimen;
	private LocalDate dateSubstituted;
	private LocalDate dateSwitched;
	private Integer archived;
}
	
	