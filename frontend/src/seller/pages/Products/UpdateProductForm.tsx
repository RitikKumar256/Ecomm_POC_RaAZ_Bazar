import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";

import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";

import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLavelTwo";

import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";

import { colors } from "../../../data/Filter/color";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../Redux Toolkit/Store";

import {
  updateProduct,
} from "../../../Redux Toolkit/Seller/sellerProductSlice";

import { fetchProductById } from "../../../Redux Toolkit/Customer/ProductSlice";

import { uploadToCloudinary } from "../../../util/uploadToCloudnary";

import { useNavigate, useParams } from "react-router-dom";

import type { Seller } from "../../../types/sellerTypes";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title should be at least 5 characters long")
    .required("Title is required"),

  description: Yup.string()
    .min(10, "Description should be at least 10 characters long")
    .required("Description is required"),

  mrpPrice: Yup.number()
    .positive("MRP Price should be greater than zero")
    .required("MRP Price is required"),

  sellingPrice: Yup.number()
    .positive("Selling Price should be greater than zero")
    .required("Selling Price is required"),

  quantity: Yup.number()
    .positive("Quantity should be greater than zero")
    .required("Quantity is required"),

  color: Yup.string().required("Color is required"),

  sizes: Yup.string().required("Sizes are required"),
});

interface FormValues {
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  quantity: number;
  color: string;
  images: string[];
  category: any;
  category2: string;
  category3: string;
  sizes: string;
  seller: Seller | undefined;
  createdAt: any;
  numRatings: number;
  in_stock: boolean;
}

const UpdateProductForm = () => {
  const [uploadImage, setUploadingImage] =
    useState(false);

  const dispatch = useAppDispatch();

  const { sellerProduct, products } =
    useAppSelector((store) => store);

  const { productId } = useParams();

  const navigate = useNavigate();

  const [snackbarOpen, setOpenSnackbar] =
    useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: 0,
      sellingPrice: 0,
      quantity: 0,
      color: "",
      images: [],
      category: null,
      category2: "",
      category3: "",
      sizes: "",
      seller: undefined,
      createdAt: null,
      numRatings: 0,
      in_stock: true,
    },

    validationSchema,

    onSubmit: (values) => {
      if (values.sellingPrice > values.mrpPrice) {
        setOpenSnackbar(true);
        return;
      }

      dispatch(
        updateProduct({
          productId: Number(productId),
          product: values,
        })
      );
    },
  });

  const handleImageChange = async (
    event: any
  ) => {
    const file = event.target.files[0];

    if (!file) return;

    setUploadingImage(true);

    const image = await uploadToCloudinary(file);

    formik.setFieldValue("images", [
      ...formik.values.images,
      image,
    ]);

    setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];

    updatedImages.splice(index, 1);

    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (
    category: any[],
    parentCategoryId: any
  ) => {
    return category?.filter((child: any) => {
      return (
        child.parentCategoryId ==
        parentCategoryId
      );
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
  }, [dispatch, productId]);

  useEffect(() => {
    if (sellerProduct.productCreated) {
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/seller/products");
      }, 1500);
    }

    if (sellerProduct.error) {
      setOpenSnackbar(true);
    }
  }, [
    sellerProduct.productCreated,
    sellerProduct.error,
    navigate,
  ]);

  useEffect(() => {
    if (products.product) {
      formik.setValues({
        title: products.product?.title || "",
        description:
          products.product?.description || "",

        mrpPrice:
          products.product?.mrpPrice || 0,

        sellingPrice:
          products.product?.sellingPrice || 0,

        quantity:
          products.product?.quantity || 0,

        color: products.product?.color || "",

        images:
          products.product?.images || [],

        category:
          products.product?.category || null,

        category2:
          products.product?.category
            ?.parentCategory?.categoryId || "",

        category3:
          products.product?.category
            ?.categoryId || "",

        sizes:
          products.product?.sizes || "",

        seller:
          products.product?.seller || undefined,

        createdAt:
          products.product?.createdAt || null,

        numRatings:
          products.product?.numRatings || 0,

        in_stock:
          products.product?.in_stock || true,
      });
    }
  }, [products.product]);

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 p-4"
      >
        <Grid container spacing={2}>
          <Grid
            className="flex flex-wrap gap-5"
            item
            xs={12}
          >
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label
              className="relative"
              htmlFor="fileInput"
            >
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>

              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map(
                (image, index) => (
                  <div
                    className="relative"
                    key={index}
                  >
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt={`ProductImage ${
                        index + 1
                      }`}
                    />

                    <IconButton
                      onClick={() =>
                        handleRemoveImage(index)
                      }
                      size="small"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    >
                      <CloseIcon
                        sx={{ fontSize: "1rem" }}
                      />
                    </IconButton>
                  </div>
                )
              )}
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={
                formik.touched.title &&
                Boolean(formik.errors.title)
              }
              helperText={
                formik.touched.title &&
                formik.errors.title
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description &&
                Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description &&
                formik.errors.description
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              id="mrpPrice"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormControl fullWidth required>
              <InputLabel id="color-label">
                Color
              </InputLabel>

              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((color, index) => (
                  <MenuItem
                    key={index}
                    value={color.name}
                  >
                    <div className="flex gap-3">
                      <span
                        style={{
                          backgroundColor:
                            color.hex,
                        }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "White"
                            ? "border"
                            : ""
                        }`}
                      ></span>

                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormControl fullWidth required>
              <InputLabel id="sizes-label">
                Sizes
              </InputLabel>

              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Sizes"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                <MenuItem value="FREE">
                  FREE
                </MenuItem>

                <MenuItem value="S">S</MenuItem>

                <MenuItem value="M">M</MenuItem>

                <MenuItem value="L">L</MenuItem>

                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">
                Category
              </InputLabel>

              <Select
                labelId="category-label"
                id="category"
                value={
                  formik.values.category
                    ?.parentCategory
                    ?.parentCategory?.categoryId ||
                  formik.values.category
                    ?.parentCategory?.categoryId ||
                  formik.values.category
                    ?.categoryId ||
                  ""
                }
                onChange={(e) => {
                  formik.setFieldValue(
                    "category",
                    {
                      categoryId: e.target.value,
                    }
                  );

                  formik.setFieldValue(
                    "category2",
                    ""
                  );

                  formik.setFieldValue(
                    "category3",
                    ""
                  );
                }}
              >
                <MenuItem value="men">
                  Men
                </MenuItem>

                <MenuItem value="women">
                  Women
                </MenuItem>

                <MenuItem value="electronics">
                  Electronics
                </MenuItem>

                <MenuItem value="home_furniture">
                  Home Furniture
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth required>
              <InputLabel id="category2-label">
                Second Category
              </InputLabel>

              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
              >
                {formik.values.category?.categoryId &&
                  categoryTwo[
                    formik.values.category
                      .categoryId
                  ]?.map((item) => (
                    <MenuItem
                      key={item.categoryId}
                      value={item.categoryId}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth required>
              <InputLabel id="category3-label">
                Third Category
              </InputLabel>

              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
              >
                {formik.values.category2 &&
                  childCategory(
                    categoryThree[
                      formik.values.category
                        ?.categoryId
                    ],
                    formik.values.category2
                  )?.map((item: any) => (
                    <MenuItem
                      key={item.categoryId}
                      value={item.categoryId}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={sellerProduct.loading}
            >
              {sellerProduct.loading ? (
                <CircularProgress
                  size="small"
                  sx={{
                    width: "27px",
                    height: "27px",
                  }}
                />
              ) : (
                "Update Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            sellerProduct.error
              ? "error"
              : "success"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellerProduct.error
            ? sellerProduct.error
            : "Product updated successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateProductForm;
