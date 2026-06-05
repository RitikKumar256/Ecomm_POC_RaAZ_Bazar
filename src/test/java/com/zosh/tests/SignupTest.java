package com.zosh.tests;

import com.zosh.pages.SignupPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class SignupTest {
    WebDriver driver;
    SignupPage signupPage;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("http://localhost:5173/");

        signupPage = new SignupPage(driver);
    }

    @Test
    public void validLoginTest() {

        signupPage.clickLogin();
        signupPage.clickCreateAcc();
        signupPage.enterEmail("ritikmonu9599@gmail.com");
        signupPage.clickOtp();
        signupPage.enterotp();
        signupPage.entername("Ram");
        signupPage.clickSignUpBtn();
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("5173"));

    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}
