package com.zosh.tests;

import com.zosh.pages.CartPage;
import com.zosh.pages.ProductPage;
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
       // cartPage.clickminusbtn();
        cartPage.clickAddBagbtn();
        cartPage.clickAddCartIcon();
        cartPage.clickdeleteprodcart();
       // cartPage.clickincartaddbtn();
       // cartPage.clickBuynowbtn();
       // cartPage.clickaddAddressbtn();
       // cartPage.enterContactDetail("Ritik","95487183","2013","E26 vishbaspark",
               // "uttamnagar","new delhi","delhi");
        //cartPage.selectAddress();
        //cartPage.selectPayment();
        Thread.sleep(3000);
//        try {
//            cartPage.clickcheckout();
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }



    }
}
