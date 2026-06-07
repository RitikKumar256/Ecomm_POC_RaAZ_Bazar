package com.zosh.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.time.Duration;
import java.util.List;

public class LoginPage {
    WebDriver driver;
    public LoginPage(WebDriver driver){
        this.driver=driver;
    }
    By loginbtn=By.xpath("//button[text()='Login']");
    By emailtext=By.name("email");
    By otpbtn=By.xpath("//button[text()='sent otp']");
    By otpfield = By.xpath("//input[contains(@id,'otp-input-')]");
    By Loginbtn=By.xpath("(//button[text()='Login'])[2]");
    //By alert=By.xpath("//div[text()=' otp sent to your email!']");
    public void clickLogin() {
        driver.findElement(loginbtn).click();
    }
    public void enterEmail(String email) {
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1000));
        driver.findElement(emailtext).sendKeys(email);

    }
    public void clickOtp() {
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
    public void clickLoginbtn(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(Loginbtn));
        button.click();
    }
//    public void handlealert(){
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//        WebElement toast = wait.until(
//                ExpectedConditions.visibilityOfElementLocated((alert)
//                )
//        );
//        // Wait until text is present
//       // wait.until(ExpectedConditions.textToBePresentInElement(toast, "otp"));
////        String actualMessage = toast.getText().trim();
////        System.out.println("Actual Message: " + actualMessage);
////        boolean result = actualMessage.equalsIgnoreCase("otp sent to your email!");
////        System.out.println("Assertion Result: " + result);
////        Assert.assertTrue(result);
//    }
}
