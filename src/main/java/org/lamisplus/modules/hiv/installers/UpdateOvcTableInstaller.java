package org.lamisplus.modules.hiv.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(7)
@Installer(name = "update-ovc-table",
        description = "add new columns to ovc table",
        version = 2)
public class UpdateOvcTableInstaller extends AcrossLiquibaseInstaller {
    public UpdateOvcTableInstaller() {
        super("classpath:installers/hiv/schema/update_ovc_table.xml");
    }
}
