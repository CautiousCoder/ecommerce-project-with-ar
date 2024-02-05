import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Header from "../../components/Header";
import { useGetProductCategoryQuery } from "../../state/api";

// initial values
const initialValues = {
  name: "",
  price: 0,
  description: "",
  shortDes: "",
  category: "",
  supply: 0,
  img: "",
};

// schema validation
const productSchema = yup.object().shape({
  name: yup.string().required("Name field is required.").max(100),
  price: yup.number().required("Price field is required."),
  description: yup.string().nullable(),
  shortDes: yup.string().required("Field is required"),
  category: yup.string().nullable(), //required("Field is required.")
  supply: yup.number().required("Field is required."),
  img: yup.string().nullable(),
});

// category array
// const currencies = [
//   {
//     value: "USD",
//     label: "$",
//   },
//   {
//     value: "EUR",
//     label: "€",
//   },
//   {
//     value: "BTC",
//     label: "฿",
//   },
//   {
//     value: "JPY",
//     label: "¥",
//   },
// ];

const AddProdect = () => {
  const theme = useTheme();
  const colors = theme.palette;

  const { data } = useGetProductCategoryQuery();

  const [file, setFile] = useState("");
  const isNonMobile = useMediaQuery("(min-width: 768px)");

  //actions
  const handleSubmitForm = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("shortDes", values.shortDes);
    formData.append("supply", values.supply);
    formData.append("category", values.category);
    formData.append("file", file);
    await axios
      .post("http://localhost:5000/client/products/addProduct", formData)
      .then((result) => {
        console.log(result);
        // navigate("/client/products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box m={"20px"}>
      <Header title={"Create Product"} subTitle={"Add your new product"} />
      <Box mt={3}>
        <Formik
          onSubmit={handleSubmitForm}
          initialValues={initialValues}
          validationSchema={productSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display={"grid"}
                gridTemplateColumns={"repeat(12, minmax(0, 1fr))"}
                gridAutoRows={"68px"}
                gap={2.5}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <TextField
                  id="name"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Product Name"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{
                    gridColumn: "span 9",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  id="price"
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Price"
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  sx={{
                    gridColumn: "span 3",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  id="short_description"
                  label="Short Description"
                  fullWidth
                  variant="filled"
                  multiline
                  rows={6}
                  value={values.shortDes}
                  name="shortDes"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shortDes && !!errors.shortDes}
                  helperText={touched.shortDes && errors.shortDes}
                  sx={{
                    gridColumn: "span 9",
                    gridRow: "span 2",
                  }}
                />
                <TextField
                  id="supply"
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Supply"
                  value={values.supply}
                  name="supply"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.supply && !!errors.supply}
                  helperText={touched.supply && errors.supply}
                  sx={{
                    gridColumn: "span 3",
                    gridRow: "span 1",
                  }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    color: colors.primary[200],
                    gridColumn: "span 3",
                    gridRow: "span 1",
                  }}
                >
                  <InputLabel sx={{ fontSize: "14px" }} id="category">
                    Category
                  </InputLabel>

                  <Select
                    labelId="category"
                    id="category"
                    name="category"
                    value={values.category}
                    defaultValue="EUR"
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.category && !!errors.category}
                  >
                    {data?.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="description"
                  label="Description"
                  fullWidth
                  variant="filled"
                  multiline
                  rows={6}
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{
                    gridColumn: "span 9",
                    gridRow: "span 2",
                  }}
                />

                <Box
                  width={"100%"}
                  sx={{
                    gridColumn: "span 3",
                    gridRow: "span 1",
                  }}
                >
                  <label
                    class="block mb-4 text-lg font-medium text-white dark:text-gray-900"
                    for="default_size"
                  >
                    Image
                  </label>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    class="block w-full mt-5 mb-5 text-lg text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="default_size"
                    type="file"
                  />
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  sx={{
                    gridColumn: "span 3",
                    gridRow: "span 1",
                    p: "10px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      color: colors.primary[900],
                      backgroundColor: colors.background.frontLight,
                      fontSize: "14px",
                      p: "10px 20px",
                    }}
                  >
                    Publish Post
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default AddProdect;
