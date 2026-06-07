package com.zosh.tests;

import com.zosh.pages.LoginPage;
import com.zosh.pages.SignupPage;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

@Slf4j
public class LoginTest {
    WebDriver driver;
    LoginPage loginPage;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("http://localhost:5173/");

        loginPage=new LoginPage(driver);
    }
    @Test
    public void validLoginTest(){
        loginPage.clickLogin();
        loginPage.enterEmail("monumonukumar9599@gmail.com");
        loginPage.clickOtp();
        loginPage.enterotp();
        loginPage.clickLoginbtn();
       // loginPage.handlealert();

    }
    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}
