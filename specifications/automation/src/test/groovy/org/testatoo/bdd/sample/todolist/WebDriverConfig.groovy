package org.testatoo.bdd.sample.todolist

import io.github.bonigarcia.wdm.ChromeDriverManager
import io.github.bonigarcia.wdm.EdgeDriverManager
import io.github.bonigarcia.wdm.FirefoxDriverManager
import org.junit.rules.ExternalResource
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.edge.EdgeDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions
import org.openqa.selenium.remote.RemoteWebDriver
import org.testatoo.evaluator.webdriver.WebDriverEvaluator

import static org.testatoo.core.Testatoo.getConfig

class WebDriverConfig extends ExternalResource {
    @Override
    protected void before() throws Throwable {
        // Defined by JVM maven arguments
        final String browser = System.getProperty('browser') ?: 'Chrome' // -Dbrowser=Firefox
        final boolean docker = Boolean.valueOf(System.getProperty('remote')) ?: false // -Dremote=true

        switch (browser) {
            case 'Firefox':
                println '================== Firefox Profile ==================='
                if (docker) {
                    WebDriver driver = new RemoteWebDriver(new URL('http://localhost:4444/wd/hub'), new FirefoxOptions())
                    config.evaluator = new WebDriverEvaluator(driver)
                } else {
                    FirefoxDriverManager.instance.setup()
                    config.evaluator = new WebDriverEvaluator(new FirefoxDriver())
                }
                break
            case 'Chrome':
                println '=================== Chrome Profile ==================='
                if (docker) {
                    WebDriver driver = new RemoteWebDriver(new URL('http://localhost:4444/wd/hub'), new ChromeOptions())
                    config.evaluator = new WebDriverEvaluator(driver)
                } else {
                    ChromeDriverManager.instance.setup()
                    ChromeOptions options = new ChromeOptions()
                    options.addArguments('--disable-web-security')
                    config.evaluator = new WebDriverEvaluator(new ChromeDriver(options))
                }
                break
            case 'Edge':
                println '==================== Edge Profile ===================='
                EdgeDriverManager.instance.setup()
                config.evaluator = new WebDriverEvaluator(new EdgeDriver())
                break
        }
    }

    @Override
    protected void after() {
        config.evaluator.close()
    }
}