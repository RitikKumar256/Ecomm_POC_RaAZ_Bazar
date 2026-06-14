package com.zosh.tests;

import com.zosh.base.BaseTest;
import com.zosh.pages.ProductPage;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ProductTest extends BaseTest {
    ProductPage productPage;
    @BeforeMethod
    public void setup() {
        setupBrowser();
        productPage = new ProductPage(driver);
    }

    @Test
    public void validateProduct() throws InterruptedException {
        performLogin();
//        productPage.clickIcon();
//        try {
//            productPage.clickSareeIcon();
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
        productPage.clicksearchBtn();
        productPage.enterSearchValue("rsm");
        scrollDown(300);
        Thread.sleep(4000);

    }
    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}