package org.lamisplus.modules.hiv.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(7)
@Installer(name = "update-app-codeset",
        description = "update-app-codeset",
        version = 1)
public class UpdateAppCodeSetInstaller   extends AcrossLiquibaseInstaller {
    public UpdateAppCodeSetInstaller() {
        super ("classpath:installers/hiv/schema/codesetschema.xml");
    }
}
