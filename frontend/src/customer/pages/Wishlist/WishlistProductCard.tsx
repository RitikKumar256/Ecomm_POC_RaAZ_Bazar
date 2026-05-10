import React, { MouseEvent } from 'react';
import { teal } from '@mui/material/colors';
import { Button } from '@mui/material';
import type { Product } from '../../../types/productTypes';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import CloseIcon from '@mui/icons-material/Close';

import { addProductToWishlist } from '../../../Redux Toolkit/Customer/WishlistSlice';

// IMPORT ADD TO CART ACTIONS
import {
    addItemToCart,
    fetchUserCart
} from '../../../Redux Toolkit/Customer/CartSlice';

interface ProductCardProps {
    item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {

    const dispatch = useAppDispatch();

    // REMOVE FROM WISHLIST
    const handleIconClick = (e: MouseEvent) => {

        if (item.id) {
            dispatch(addProductToWishlist({ productId: item.id }));
        }
    };

    // ADD TO CART
    const handleAddToCart = async () => {

        if (item.id) {

            const jwt = localStorage.getItem("jwt") || "";

            try {

                // IMPORTANT CHANGE
                await dispatch(addItemToCart({
                    jwt,
                    request: {
                        productId: item.id,
                        quantity: 1,
                        size: ""
                    }
                })).unwrap();

                // REFRESH CART AFTER ADD
                dispatch(fetchUserCart(jwt));

                alert("Item Added To Cart Successfully");

            } catch (error) {

                console.log("Add To Cart Error", error);
                alert("Failed To Add Item To Cart");
            }
        }
    };

    return (
        <div className='w-60 relative border rounded-lg p-3 shadow-sm'>

            <div className="w-full">
                <img
                    className="object-top w-full h-72 object-cover rounded-md"
                    src={item.images[0]}
                    alt={`product-${item.title}`}
                />
            </div>

            <div className='pt-3 space-y-2 rounded-md'>

                <p>{item.title}</p>

                <div className='flex items-center gap-3'>
                    <span className='font-semibold text-gray-800'>
                        ₹{item.sellingPrice}
                    </span>

                    <span className='line-through text-gray-400'>
                        ₹{item.mrpPrice}
                    </span>

                    <span className='text-[#00927c] font-semibold'>
                        {item.discountPercent}% off
                    </span>
                </div>

                {/* ADD TO CART BUTTON */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddToCart}
                >
                    Add To Cart
                </Button>

            </div>

            {/* REMOVE FROM WISHLIST BUTTON */}
            <div className='absolute top-1 right-1'>

                <button onClick={handleIconClick}>

                    <CloseIcon
                        className='cursor-pointer bg-white rounded-full p-1'
                        sx={{
                            color: teal[500],
                            fontSize: "2rem"
                        }}
                    />
                </button>

            </div>

        </div>
    );
};

export default WishlistProductCard;