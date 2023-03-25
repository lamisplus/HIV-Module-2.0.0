package org.lamisplus.modules.hiv.utility;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
public class CustomDateTimeFormat {

    public static LocalDate LocalDateByFormat(LocalDate date, String format){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
        return LocalDate.parse(formatter.format(date),formatter);
    }

    public static LocalTime LocalTimeByFormat(LocalTime time, String format){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
        return LocalTime.parse(formatter.format(time),formatter);
    }
    
    @NotNull
    public static LocalDate handleNullDateActivity(StringBuilder name, LocalDate activityDate) {
        if(activityDate == null){
            activityDate = LocalDate.now();
            name.append(" : No Date is found for this activity, Kindly checked and Update");
        }
        return activityDate;
    }
}
