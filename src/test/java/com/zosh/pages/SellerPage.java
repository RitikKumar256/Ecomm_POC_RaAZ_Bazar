package com.zosh.pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class SellerPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By sellerbtn = By.xpath("//button[text()='Become Seller']");
    private By loginbtn = By.xpath("//button[text()='Login']");
    private By emailfield = By.xpath("//input[@name='email']");
    private By otpbtn = By.xpath("//button[text()='sent otp']");
    private By otpfield = By.xpath("//input[contains(@id,'otp-input-')]");
    private By Loginbtn = By.xpath("//button[text()='Login']");
    private By addprodcatogry = By.xpath("//span[normalize-space()='Add Product']");
    private By file = By.id("fileInput");
    private By title = By.name("title");
    private By description = By.id("description");
    private By mrp = By.id("mrpPrice");
    private By sellingprice = By.id("sellingPrice");
    private By quantity = By.id("quantity");
    private By color = By.id("color");
    private By size = By.id("sizes");
    private By category = By.id("category");
    private By category2 = By.id("category2");
    private By category3 = By.id("category3");
    private By addprod = By.xpath("//button[text()='Add Product']");
    By products = By.xpath("//span[normalize-space()='Products']/ancestor::p");
    By inStockBtn=By.xpath("(//button[text()='in_stock'])[3]");
    By outOfStockBtn = By.xpath("//button[normalize-space()='out_stock']");
    By editIcon = By.xpath("(//*[name()='svg' and @data-testid='EditIcon'])[3]");
    By updateprod=By.xpath("//button[text()='Update Product']");
    private By deleteProduct = By.xpath("(//*[name()='svg' and @data-testid='DeleteIcon']/ancestor::button)[3]");

    public SellerPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void clickSellerLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(sellerbtn)).click();
        wait.until(ExpectedConditions.elementToBeClickable(loginbtn)).click();
    }

    public void enterEmail(String email) {
        WebElement emailBox = wait.until(ExpectedConditions.visibilityOfElementLocated(emailfield));
        emailBox.clear();
        emailBox.sendKeys(email);
        wait.until(ExpectedConditions.elementToBeClickable(otpbtn)).click();
    }

    public void enterOtpAndLogin() {
        WebDriverWait otpWait = new WebDriverWait(driver, Duration.ofSeconds(120));

        otpWait.until(driver -> {
            List<WebElement> otpBoxes = driver.findElements(otpfield);

            if (otpBoxes.size() != 6) {
                return false;
            }

            for (WebElement box : otpBoxes) {
                if (box.getAttribute("value").trim().isEmpty()) {
                    return false;
                }
            }

            return true;
        });

        wait.until(ExpectedConditions.elementToBeClickable(Loginbtn)).click();
    }

    public void clickAddProductCategory() {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(addprodcatogry));

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block:'center'});", element);

        wait.until(ExpectedConditions.elementToBeClickable(element)).click();
    }

    public void uploadFile(String filePath) {
        wait.until(ExpectedConditions.presenceOfElementLocated(file)).sendKeys(filePath);
    }

    public void enterTitle(String productTitle) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(title)).sendKeys(productTitle);
    }

    public void enterDescription(String productDescription) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(description)).sendKeys(productDescription);
    }

    public void enterMrp(String productMrp) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(mrp)).sendKeys(productMrp);
    }

    public void enterSellingPrice(String price) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(sellingprice)).sendKeys(price);
    }

    public void enterQuantity(String qty) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(quantity)).sendKeys(qty);
    }

    private void selectDropdownOption(By dropdown, String dataValue) {
        wait.until(ExpectedConditions.elementToBeClickable(dropdown)).click();
        By option = By.xpath("//li[@role='option' and @data-value='" + dataValue + "']");
        wait.until(ExpectedConditions.elementToBeClickable(option)).click();
    }

    public void selectColor(String colorName) {
        selectDropdownOption(color, colorName);
    }

    public void selectSize(String sizeName) {
        selectDropdownOption(size, sizeName);
    }

    public void selectCategory(String categoryName) {
        selectDropdownOption(category, categoryName);
    }

    public void selectCategory2(String category2Name) {
        selectDropdownOption(category2, category2Name);
    }

    public void selectCategory3(String category3Name) {
        selectDropdownOption(category3, category3Name);
    }

    public void clickAddProduct() {
        wait.until(ExpectedConditions.elementToBeClickable(addprod)).click();
    }
    public void clickProducts() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement product = wait.until(ExpectedConditions.visibilityOfElementLocated(products));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", product);
    }
    public void toggleStockStatus() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.elementToBeClickable(inStockBtn)).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(outOfStockBtn));
        Thread.sleep(2000);
        wait.until(ExpectedConditions.elementToBeClickable(outOfStockBtn)).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(inStockBtn));
    }
    public void clickEditIcon() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement edit = wait.until(
                ExpectedConditions.elementToBeClickable(editIcon));
        edit.click();
    }
    public void updateProductPrice(String mrpValue, String sellingPriceValue) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement mrpField = wait.until(ExpectedConditions.elementToBeClickable(mrp));
        mrpField.sendKeys(Keys.CONTROL + "a");
        mrpField.sendKeys(Keys.DELETE);
        mrpField.sendKeys(mrpValue);
        WebElement sellingField = wait.until(ExpectedConditions.elementToBeClickable(sellingprice));
        sellingField.sendKeys(Keys.CONTROL + "a");
        sellingField.sendKeys(Keys.DELETE);
        sellingField.sendKeys(sellingPriceValue);
    }
    public void clickUpdateProduct() throws InterruptedException{
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.elementToBeClickable(updateprod)).click();
        Thread.sleep(5000);
    }
    public void deleteProduct() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement deleteBtn = wait.until(
                ExpectedConditions.elementToBeClickable(deleteProduct));
        deleteBtn.click();
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        System.out.println("Alert Text: " + alert.getText());
        alert.accept();
        System.out.println("Alert Accepted");
        wait.until(ExpectedConditions.not(ExpectedConditions.alertIsPresent()));
         wait.until(ExpectedConditions.invisibilityOf(deleteBtn));
        System.out.println("Product Deleted");
    }
}