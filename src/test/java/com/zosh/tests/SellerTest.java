package com.zosh.tests;

import com.zosh.pages.SellerPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class SellerTest {

    WebDriver driver;
    SellerPage sellerPage;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

        driver.get("http://localhost:5173/");

        sellerPage = new SellerPage(driver);
    }

    @Test
    public void sellerTestValidation() {
        sellerPage.clickSellerLogin();
        sellerPage.enterEmail("monumonukumar9599@gmail.com");
        sellerPage.enterOtpAndLogin();
        sellerPage.clickAddProductCategory();
        sellerPage.uploadFile("D:\\Spring boot project\\Ecommerce Multi Vendor Project\\assets\\images\\products\\yellow 1.jpg");
        sellerPage.enterTitle("A vanarasi saree");
        sellerPage.enterDescription("Premium cotton Saree");
        sellerPage.enterMrp("5900");
        sellerPage.enterSellingPrice("2999");
        sellerPage.enterQuantity("10");
        sellerPage.selectColor("Yellow");
        sellerPage.selectSize("FREE");
        sellerPage.selectCategory("women");
        sellerPage.selectCategory2("women_indian_and_fusion_wear");
        sellerPage.selectCategory3("women_sarees");
        sellerPage.clickAddProduct();
        sellerPage.clickProducts();
        try {
            sellerPage.toggleStockStatus();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        sellerPage.clickEditIcon();
        sellerPage.updateProductPrice("3700", "1550");
        try {
            sellerPage.clickUpdateProduct();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        sellerPage.deleteProduct();

    }


    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }
    }
}