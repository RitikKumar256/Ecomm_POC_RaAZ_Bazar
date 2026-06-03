package com.zosh;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EcommerceMultiVendorApplicationTests {

	@Test
	void openChrome () throws InterruptedException{

		WebDriverManager.chromedriver().setup();

		WebDriver driver = new ChromeDriver();

		driver.get("https://google.com");
		Thread.sleep(3000);
		System.out.println(driver.getTitle());

		driver.quit();
	}
}