package com.zosh.pages;

import com.zosh.base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class ProductPage {
    WebDriver driver;
    public ProductPage(WebDriver driver){

        this.driver=driver;
    }
    By searchbtn=By.xpath("//div[contains(@class,'gap-4')]//child::button[1]");
    By searchinput= By.xpath("//input[@placeholder='Search Product...']");
    By producticon=By.xpath("//h1[text()='Indian & fusion Wear']");
    By greenSareeicon=By.xpath("//img[contains(@src,'green')]");
    By memsection = By.xpath("//li[normalize-space()='Men']");
    By Tshirticon = By.xpath("//li[normalize-space()='Men T-Shirts']");
    By womemsection = By.xpath("//li[normalize-space()='Women']");
    By sareeicon = By.xpath("//li[normalize-space()='Women Sarees']");
    public void clickIcon(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(producticon));
        button.click();
    }
    public void clickSareeIcon() throws InterruptedException{
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(greenSareeicon));
        button.click();
        Thread.sleep(3000);
    }
    public void clickmensection() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        WebElement men = wait.until(
                ExpectedConditions.visibilityOfElementLocated(memsection));
        Actions actions = new Actions(driver);
        actions.moveToElement(men).perform();
        WebElement tshirt = wait.until(
                ExpectedConditions.elementToBeClickable(Tshirticon));
        tshirt.click();
        Thread.sleep(3000);
    }
    public void clickWomensection() throws InterruptedException {
       WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        WebElement men = wait.until(
                ExpectedConditions.visibilityOfElementLocated(womemsection));
        Actions actions = new Actions(driver);
        actions.moveToElement(men).perform();
        WebElement tshirt = wait.until(
                ExpectedConditions.elementToBeClickable(sareeicon));
        tshirt.click();
        Thread.sleep(5000);
    }
    public void clicksearchBtn(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement button = wait.until(
                ExpectedConditions.elementToBeClickable(searchbtn));
        button.click();
    }
    public void enterSearchValue(String prodname){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement searchProd = wait.until(
                ExpectedConditions.visibilityOfElementLocated(searchinput));
        searchProd.sendKeys(prodname);
        searchProd.sendKeys(Keys.ENTER);
       // Thread.sleep(5000);


    }
}
