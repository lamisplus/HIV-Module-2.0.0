package org.lamisplus.modules.hiv.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(7)
@Installer(name = "ovc-table-modifier",
        description = "Alter added columns on hiv-ovc-table",
        version = 1)
public class OvcTable extends AcrossLiquibaseInstaller {
    public OvcTable() {
        super("classpath:installers/hiv/schema/ovc-table.xml");
    }

}
