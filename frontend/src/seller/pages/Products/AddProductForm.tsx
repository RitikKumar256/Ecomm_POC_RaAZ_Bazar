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

import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";

import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLavelTwo";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";

import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";

import { colors } from "../../../data/Filter/color";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createProduct } from "../../../Redux Toolkit/Seller/sellerProductSlice";

import { uploadToCloudinary } from "../../../util/uploadToCloudnary";

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
    .required("Selling Price is required")
    .test(
      "sellingPrice",
      "Selling Price cannot be greater than MRP Price",
      function (value) {
        return value <= this.parent.mrpPrice;
      }
    ),

  quantity: Yup.number()
    .positive("Quantity should be greater than zero")
    .required("Quantity is required"),

  color: Yup.string().required("Color is required"),

  category: Yup.string().required("Category is required"),

  sizes: Yup.string().required("Sizes are required"),
});

const ProductForm = () => {
  const [uploadImage, setUploadingImage] = useState(false);

  const dispatch = useAppDispatch();

  const { sellerProduct } = useAppSelector((store) => store);

  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [] as string[],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },

    validationSchema,

    onSubmit: (values) => {
      dispatch(
        createProduct({
          request: values,
          jwt: localStorage.getItem("jwt"),
        })
      );

      console.log(values);
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];

    if (!file) return;

    setUploadingImage(true);

    try {
      const image = await uploadToCloudinary(file);

      formik.setFieldValue("images", [
        ...formik.values.images,
        image,
      ]);
    } catch (error) {
      console.log(error);
    }

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
    return category.filter((child: any) => {
      return child.parentCategoryId == parentCategoryId;
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (sellerProduct.productCreated || sellerProduct.error) {
      setOpenSnackbar(true);
    }
  }, [sellerProduct.productCreated, sellerProduct.error]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          {/* IMAGE SECTION */}
          <Grid item xs={12} className="flex flex-wrap gap-5">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label className="relative" htmlFor="fileInput">
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
              {formik.values.images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    className="w-24 h-24 object-cover"
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />

                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {/* TITLE */}
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
              required
            />
          </Grid>

          {/* DESCRIPTION */}
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
              required
            />
          </Grid>

          {/* MRP PRICE */}
          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              id="mrpPrice"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.mrpPrice &&
                Boolean(formik.errors.mrpPrice)
              }
              helperText={
                formik.touched.mrpPrice &&
                formik.errors.mrpPrice
              }
              required
            />
          </Grid>

          {/* SELLING PRICE */}
          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice &&
                formik.errors.sellingPrice
              }
              required
            />
          </Grid>

          {/* QUANTITY */}
          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={
                formik.touched.quantity &&
                Boolean(formik.errors.quantity)
              }
              helperText={
                formik.touched.quantity &&
                formik.errors.quantity
              }
              required
            />
          </Grid>

          {/* COLOR */}
          <Grid item xs={12} sm={6} lg={3}>
            <FormControl
              fullWidth
              error={
                formik.touched.color &&
                Boolean(formik.errors.color)
              }
              required
            >
              <InputLabel id="color-label">Color</InputLabel>

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
                    value={color.name}
                    key={index}
                  >
                    <div className="flex gap-3 items-center">
                      <span
                        style={{
                          backgroundColor: color.hex,
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

              {formik.touched.color &&
                formik.errors.color && (
                  <FormHelperText>
                    {formik.errors.color}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          {/* SIZE */}
          <Grid item xs={12} sm={6} lg={3}>
            <FormControl
              fullWidth
              error={
                formik.touched.sizes &&
                Boolean(formik.errors.sizes)
              }
              required
            >
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

              {formik.touched.sizes &&
                formik.errors.sizes && (
                  <FormHelperText>
                    {formik.errors.sizes}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          {/* CATEGORY */}
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl
              fullWidth
              error={
                formik.touched.category &&
                Boolean(formik.errors.category)
              }
              required
            >
              <InputLabel id="category-label">
                Category
              </InputLabel>

              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Category"
              >
                {mainCategory.map((item, index) => (
                  <MenuItem
                    value={item.categoryId}
                    key={index}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.category &&
                formik.errors.category && (
                  <FormHelperText>
                    {formik.errors.category}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>

          {/* SECOND CATEGORY */}
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
                label="Second Category"
              >
                {formik.values.category &&
                  categoryTwo[
                    formik.values.category
                  ]?.map((item, index) => (
                    <MenuItem
                      value={item.categoryId}
                      key={index}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* THIRD CATEGORY */}
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
                label="Third Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {formik.values.category2 &&
                  childCategory(
                    categoryThree[
                      formik.values.category
                    ] || [],
                    formik.values.category2
                  )?.map((item: any, index: number) => (
                    <MenuItem
                      value={item.categoryId}
                      key={index}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* SUBMIT BUTTON */}
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
                "Add Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* SNACKBAR */}
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
            sellerProduct.error ? "error" : "success"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellerProduct.error
            ? sellerProduct.error
            : "Product created successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductForm;