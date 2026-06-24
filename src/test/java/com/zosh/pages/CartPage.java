package com.zosh.pages;

import org.openqa.selenium.*;
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
    By addicon=By.xpath("(//button[contains(@class,'MuiButtonBase-root')])[7]");
    By minusicon=By.xpath("(//button[contains(@class,'MuiButtonBase-root')])[6]");
     By incartaddicon=By.xpath("(//button[contains(@class,'MuiButton-sizeSmall')])[2]");
    By incartminusicon=By.xpath("(//button[contains(@class,'MuiButton-sizeSmall')])[1]");
    By deleteprodCart=By.xpath("//button[.//*[name()='svg' and @data-testid='CloseIcon']]");
    By addaddress=By.xpath("(//button[text()='Add New Address'])[1]");
    By contname=By.xpath("//input[@name='name']");
    By contmobile=By.xpath("//input[@name='mobile']");
    By contpincode=By.xpath("//input[@name='pinCode']");
    By contaddress=By.xpath("//input[@name='address']");
    By contlocality=By.xpath("//input[@name='locality']");
    By contcity=By.xpath("//input[@name='city']");
    By contstate=By.xpath("//input[@name='state']");
    By contaddbtn=By.xpath("//button[text()='Add Address']");
    public void clickSearchProd(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(searchedProd));
        button.click();
    }
    public void addprod() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(addicon));
        button.click();
        System.out.println("Add To Bag Clicked");
    }
    public void clickminusbtn() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(minusicon));
        button.click();
        System.out.println("Minus To Bag Clicked");
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
    public void clickdeleteprodcart() {
        WebElement button = new WebDriverWait(driver, Duration.ofSeconds(20))
                .until(ExpectedConditions.elementToBeClickable(deleteprodCart));
        try {
            button.click();
        } catch (ElementClickInterceptedException e) {
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", button);
        }
    }
    public void clickincartaddbtn() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        WebElement button = wait.until(
//                ExpectedConditions.elementToBeClickable(incartaddicon));
                ExpectedConditions.elementToBeClickable(incartminusicon));
        ((JavascriptExecutor) driver)
                .executeScript("arguments[0].scrollIntoView({block:'center'});", button);
        Thread.sleep(1000);
        button.click();
        Thread.sleep(3000);
    }
    public void clickBuynowbtn(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(buynowbtn));
        button.click();
    }
    public void clickaddAddressbtn() {
        WebElement button = new WebDriverWait(driver, Duration.ofSeconds(20))
                .until(ExpectedConditions.presenceOfElementLocated(addaddress));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", button);
    }
    public void enterContactDetail(String name,String mob,String pincode,String address,
                                   String locality,String city,String state) throws InterruptedException{
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement nameField = wait.until(ExpectedConditions.visibilityOfElementLocated(contname));
        WebElement mobileField = wait.until(ExpectedConditions.visibilityOfElementLocated(contmobile));
        WebElement pincodeField = wait.until(ExpectedConditions.visibilityOfElementLocated(contpincode));
        WebElement addressField = wait.until(ExpectedConditions.visibilityOfElementLocated(contaddress));
        WebElement localityField = wait.until(ExpectedConditions.visibilityOfElementLocated(contlocality));
        WebElement cityField = wait.until(ExpectedConditions.visibilityOfElementLocated(contcity));
        WebElement stateField = wait.until(ExpectedConditions.visibilityOfElementLocated(contstate));
        nameField.sendKeys(name);
        mobileField.sendKeys(mob);
        pincodeField.sendKeys(pincode);
        addressField.sendKeys(address);
        localityField.sendKeys(locality);
        cityField.sendKeys(city);
        stateField.sendKeys(state);
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(contaddbtn));
        button.click();
        Thread.sleep(3000);



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
