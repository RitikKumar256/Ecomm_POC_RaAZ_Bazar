package com.zosh.pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class AdminPage {
    WebDriver driver;
    public AdminPage(WebDriver driver){
        this.driver=driver;
    }
    By adminbtn=By.xpath("//button[text()='Admin Login']");
    By otpField = By.xpath("//input[@type='text' and @aria-invalid='false']");
    By otpbtn=By.xpath("//button[@type='button']");
    public void clickAdminbtn(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(adminbtn));
        button.click();
    }
    public void handlealert(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        System.out.println(alert.getText());
        alert.accept();
    }
   public void enterAdminOtp(){
       WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60));
       wait.until(driver ->
       {
           WebElement otp = driver.findElement(otpField);
           return otp.getAttribute("value").length() == 6;
       });
   }
   public void clickOtpbtn() throws InterruptedException{
       WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
       WebElement button = wait.until(
               ExpectedConditions.elementToBeClickable(otpbtn));
       button.click();
       Thread.sleep(4000);
   }
}
