package com.zosh.base;
import com.zosh.pages.LoginPage;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.Duration;

public class BaseTest {

    protected WebDriver driver;
    protected LoginPage loginPage;

    public void setupBrowser() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts()
                .implicitlyWait(Duration.ofSeconds(10));
        driver.get("http://localhost:5173/");
        loginPage = new LoginPage(driver);
    }
    public void performLogin() {
        loginPage.clickLogin();
        loginPage.enterEmail("monumonukumar9599@gmail.com");
       loginPage.clickOtp();
        loginPage.enterotp();
        loginPage.clickLoginbtn();
        loginPage.validateLogin();
    }
    public void scrollDown(int pixels){
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollBy(0," + pixels + ")");
    }
    public void scrollUp(int pixels){
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollBy(0,-" + pixels + ")");
    }
}