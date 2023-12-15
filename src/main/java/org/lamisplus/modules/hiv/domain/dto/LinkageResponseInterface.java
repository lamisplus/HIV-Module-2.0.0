package org.lamisplus.modules.hiv.domain.dto;

public interface LinkageResponseInterface {

    String getArtNumber();

    String getLastName();

    String getOtherName();

    String getGender();

    String getBirthDate();

    String getFacilityName();

    String getDatimCode();

    String getStateOfResidence();

    String getLgaOfResidence();

    String getEntryPoint();

    YesNo getShareContactWithOvc();

    String getReasonForDecline();

    YesNo getDrugRefillNotification();

    String getPhoneNumber();

    String getCaregiverSurname();

    String getCaregiverOtherName();

    String getOfferDate();

    String getEnrollmentDate();

    String getOvcUniqueId();

    String getHouseholdUniqueId();

    YesNo getEnrolledInOvcProgram();

    int getArchived();

    String getCboName();

    String getFacilityStaffName();


}

