package com.zosh.tests;

import com.zosh.pages.CartPage;
import com.zosh.pages.ProductPage;
import org.openqa.selenium.By;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class CartTest extends ProductTest{
    CartPage cartPage;
//    @BeforeMethod
//    public void setup() {
//        setupBrowser();
//        cartPage = new CartPage(driver);
//        productPage=new ProductPage(driver);
//    }
    @Test(priority = 2)
    public void validateProdCart() throws InterruptedException{
        cartPage=new CartPage(driver);
        cartPage.clickSearchProd();
        cartPage.addprod();
        cartPage.clickminusbtn();
        cartPage.clickAddBagbtn();
        cartPage.clickAddCartIcon();
       // cartPage.clickdeleteprodcart();
       // cartPage.clickincartaddbtn();
        cartPage.clickBuynowbtn();
        // cartPage.enterContactDetail("Ritik","95487183","2013","E26 vishbaspark",
//                "uttamnagar","new delhi","delhi");
        //cartPage.clickaddAddressbtn();
        //cartPage.selectAddress();
        //cartPage.selectPayment();
        Thread.sleep(3000);
        try {
            cartPage.clickcheckout();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        System.out.println("Current URL: " + driver.getCurrentUrl());

        System.out.println("Window count: " + driver.getWindowHandles().size());

        System.out.println("Iframe count: " + driver.findElements(By.tagName("iframe")).size());
      cartPage.enterMobileAndSelectCard("9548589599");
        cartPage.enterCardDetails("5126523008351859","1027","529");
    }
}
