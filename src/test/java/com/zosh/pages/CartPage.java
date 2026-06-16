package com.zosh.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class CartPage {
    WebDriver driver;
    public CartPage(WebDriver driver){
        this.driver=driver;
    }
    By searchedProd=By.xpath("//img[contains(@src,'banarasi-saree')]");
    By addbagbtn=By.xpath("//button[text()='Add To Bag']");
    By carticon=By.xpath("//*[name()='svg' and @data-testid='AddShoppingCartIcon']");
    By buynowbtn=By.xpath("//button[text()='BUY NOW']");
    By address=By.xpath("(//input[@type='radio'])[1]");
    By paymentmethod= By.xpath("(//input[@type='radio'])[2]");
    By checkoutbtn=By.xpath("//button[text()='Checkout']");

    public void clickSearchProd(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(searchedProd));
        button.click();
    }
    public void clickAddBagbtn() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement addBag = wait.until(
                ExpectedConditions.presenceOfElementLocated(addbagbtn));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        // scroll to element
        js.executeScript("arguments[0].scrollIntoView({block:'center'});", addBag);
        Thread.sleep(2000);
        // javascript click
        js.executeScript("arguments[0].click();", addBag);
        System.out.println("Add To Bag Clicked");
    }
    public void clickAddCartIcon(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(carticon));
        button.click();
    }
    public void clickBuynowbtn(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(buynowbtn));
        button.click();
    }
    public void selectAddress(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(address));
        System.out.println("Displayed = " + button.isDisplayed());
        System.out.println("Enabled = " + button.isEnabled());
        button.click();
    }

    public void selectPayment(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(paymentmethod));
        button.click();
    }
    public void clickcheckout() throws InterruptedException{
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(checkoutbtn));
        button.click();
        Thread.sleep(7000);

    }
}
