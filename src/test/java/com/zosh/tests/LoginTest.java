package com.zosh.tests;

import com.zosh.base.BaseTest;
import com.zosh.pages.LoginPage;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

@Slf4j
    public class LoginTest extends BaseTest {
        @BeforeMethod
        public void setup() {
            setupBrowser();
        }
     @Test
    public void loginAvatarLogoutTest() {
        performLogin();
        loginPage.clickAvtar();
        try {
            loginPage.clickLogout();
        }
       catch (Exception e){
            e.printStackTrace();
       }
        loginPage.validateLogout();
    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }
    }
}