package org.lamisplus.modules.hiv.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "alter-cd-4-column",
		description = "alter-cd-4-column",
		version = 1)
public class AlterCD4Column extends AcrossLiquibaseInstaller {
	public AlterCD4Column() {
		super("classpath:installers/hiv/schema/alter-cd-4-column.xml");
	}
}
