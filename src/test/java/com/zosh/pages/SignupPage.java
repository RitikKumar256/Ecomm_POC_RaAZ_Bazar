package com.zosh.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class SignupPage {
    WebDriver driver;
    public SignupPage(WebDriver driver){
        this.driver=driver;
    }
    By loginbtn=By.xpath("//button[text()='Login']");
    By createbtn=By.xpath("//button[text()='create account']");
    By emailtext=By.name("email");
    By otpbtn=By.xpath("//button[text()='sent otp']");
    By otpfield = By.xpath("//input[contains(@id,'otp-input-')]");
    By namefield=By.name("name");
    By signupbtn=By.xpath("//button[normalize-space()='Signup']");
    public void clickLogin() {

        driver.findElement(loginbtn).click();
    }
    public void clickCreateAcc() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(createbtn));
        button.click();
    }  public void clickOtp() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(otpbtn));
        button.click();
    }

    public void enterotp() {
        // Wait for all OTP fields to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        wait.until(
                ExpectedConditions.visibilityOfAllElementsLocatedBy(otpfield)
        );

        // Wait until all 6 OTP boxes are filled manually
        wait.until(driver -> {
            List<WebElement> otpBoxes = driver.findElements(otpfield);
            StringBuilder otp = new StringBuilder();
            for (WebElement box : otpBoxes) {
                String value = box.getAttribute("value");
                if (value == null || value.isEmpty()) {
                    return false;
                }
                otp.append(value);
            }
            System.out.println("Entered OTP : " + otp);
            return otp.toString().matches("\\d{6}");
        });
    }
    public void clickSignUpBtn(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(signupbtn));

        button.click();
    }
    public void entername(String name) {

        WebDriverWait wait=new WebDriverWait(driver,Duration.ofSeconds(15));
        WebElement input=wait.until(ExpectedConditions.visibilityOfElementLocated(namefield));
        input.sendKeys(name);

    }
    public void enterEmail(String email) {
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1000));
        driver.findElement(emailtext).sendKeys(email);

    }

}
