import {
  Alert,
  Button,
  Snackbar,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { teal } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserCart } from "../../../Redux Toolkit/Customer/CartSlice";
import type { CartItem } from "../../../types/cartTypes";
import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
import { Close } from "@mui/icons-material";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cart, auth, coupone } = useAppSelector((store) => store);

  const [couponCode, setCouponCode] = useState("");
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [auth.jwt]);

  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };

  const handleApllyCoupon = (apply: string) => {
    let code = couponCode;

    if (apply === "false") {
      code = cart.cart?.couponCode || "";
    }

    dispatch(
      applyCoupon({
        apply,
        code,
        orderValue: cart.cart?.totalSellingPrice || 100,
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // NEW FUNCTION
  const handleWishlistNavigation = () => {
    navigate("/wishlist");
  };

  useEffect(() => {
    if (coupone.couponApplied || coupone.error) {
      setOpenSnackbar(true);
      setCouponCode("");
    }
  }, [coupone.couponApplied, coupone.error]);

  console.log("cart ", cart);

  return (
    <>
      {cart.cart && cart.cart?.cartItems.length !== 0 ? (
        <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
            <div className="lg:col-span-2 space-y-3 ">
              {cart.cart?.cartItems.map((item: CartItem) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="col-span-1 text-sm space-y-3">
              <div className="border rounded-md px-5 py-3 space-y-5">
                <div className="flex gap-3 text-sm items-center">
                  <LocalOfferIcon
                    sx={{ color: teal[600], fontSize: "17px" }}
                  />
                  <span>Apply Coupons</span>
                </div>

                {!cart.cart?.couponCode ? (
                  <div className="flex justify-between items-center gap-2">
                    <TextField
                      value={couponCode}
                      onChange={handleChange}
                      placeholder="coupon code"
                      size="small"
                      fullWidth
                    />

                    <Button
                      onClick={() => handleApllyCoupon("true")}
                      disabled={!couponCode}
                      size="small"
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="p-1 pl-5 pr-3 border rounded-full flex gap-2 items-center">
                      <span>{cart.cart.couponCode} Applied</span>

                      <IconButton
                        onClick={() => handleApllyCoupon("false")}
                        size="small"
                      >
                        <Close className="text-red-600" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>

              <section className="border rounded-md">
                <PricingCard />

                <div className="p-5">
                  <Button
                    onClick={() => navigate("/checkout/address")}
                    sx={{ py: "11px" }}
                    variant="contained"
                    fullWidth
                  >
                    BUY NOW
                  </Button>
                </div>
              </section>

              {/* UPDATED WISHLIST BUTTON */}
              <div
                onClick={handleWishlistNavigation}
                className="border rounded-md px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <span>Add From Wishlist</span>

                <FavoriteIcon
                  sx={{ color: teal[600], fontSize: "21px" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[85vh] flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">
              Hey, it feels so light!
            </h1>

            <p className="text-gray-500 text-sm">
              There is nothing in your bag, let's add some items
            </p>
          </div>

          {/* UPDATED EMPTY CART BUTTON */}
          <Button
            variant="outlined"
            sx={{ py: "11px" }}
            onClick={handleWishlistNavigation}
          >
            Add Item From Wishlist
          </Button>
        </div>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={coupone.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {coupone.error
            ? coupone.error
            : "Coupon Applied successfully"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;