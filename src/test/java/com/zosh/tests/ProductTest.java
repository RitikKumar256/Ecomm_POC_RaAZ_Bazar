package com.zosh.tests;

import com.zosh.base.BaseTest;
import com.zosh.pages.ProductPage;
import org.testng.annotations.*;

public class ProductTest extends BaseTest {
    ProductPage productPage;
    @BeforeClass
    public void setup() {
        setupBrowser();
        productPage = new ProductPage(driver);
        performLogin();
    }

    @Test(priority = 1)
    public void validateProduct() throws InterruptedException {

//        productPage.clickIcon();
//        try {
//            productPage.clickSareeIcon();
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
        productPage.clickmensection();
        productPage.clickWomensection();
//        productPage.clicksearchBtn();
//        productPage.enterSearchValue("saree");
//       // scrollDown(300);
//        Thread.sleep(4000);

    }
    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}