package com.zosh.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class SignupPage {
    WebDriver driver;
    public SignupPage(WebDriver driver){
        this.driver=driver;
    }
    By loginbtn=By.xpath("//button[text()='Login']");
    By createbtn=By.xpath("//button[text()='create account']");
    By emailtext=By.name("email");
    By otpbtn=By.xpath("//button[text()='sent otp']");
    By otpfield=By.xpath("//input[contains(@id,'otp-input-0')]");
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

//        wait.until(ExpectedConditions.visibilityOfElementLocated(
//                By.xpath()));
    }
    public void enterotp(String n) throws InterruptedException{
        Thread.sleep(13000);
        WebDriverWait wait=new WebDriverWait(driver,Duration.ofSeconds(15));
        WebElement input=wait.until(ExpectedConditions.visibilityOfElementLocated(otpfield));
        input.sendKeys(n);

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
