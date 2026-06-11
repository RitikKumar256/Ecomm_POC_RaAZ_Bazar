package com.zosh.tests;

import com.zosh.pages.AdminPage;
import com.zosh.pages.LoginPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class AdminTest {
    WebDriver driver;
    AdminPage adminPage;
    LoginPage loginPage;
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("http://localhost:5173/");
        adminPage=new AdminPage(driver);
        loginPage=new LoginPage(driver);
    }
    @Test
    public void adminTestValidation(){
        adminPage.clickAdminbtn();
        loginPage.enterEmail("ritikumar256@gmail.com");
        loginPage.clickOtp();
        adminPage.handlealert();
        adminPage.enterAdminOtp();
        try {
            adminPage.clickOtpbtn();
        }
        catch (Exception e){
            e.printStackTrace();
        }

    }
    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}
