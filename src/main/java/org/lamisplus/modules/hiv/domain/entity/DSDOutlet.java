package org.lamisplus.modules.hiv.domain.entity;

import lombok.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="dsd_outlet")
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class DSDOutlet extends HivAuditEntity implements Persistable<Long>, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "im")
    private String im;
    @Basic
    @Column(name = "state")
    private String state;
    @Basic
    @Column(name = "lga")
    private String lga;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "dsd_type")
    private String outletDsdType;

    @Basic
    @Column(name = "code")
    private String code;

    @Basic
    @Column(name = "archived")
    private int archived ;

    @Column(name = "facility_id")
    private Long facilityId;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
