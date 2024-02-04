import {
  Box,
  Button,
  Card,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header";

const initialValue = {
  name: "",
  description: "",
  image: "",
};

// Schema validation
const categorySchema = yup.object().shape({
  name: yup.string().required("Category Name is Required.").max(60),
  description: yup.string().nullable(),
  image: yup.string().nullable(),
});

const AddCategory = () => {
  const theme = useTheme();
  const colors = theme.palette;

  // state
  const [file, setFile] = useState("");

  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  // actions
  const handleClickOnFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("file", file);

    await axios
      .post("http://localhost:5000/client/products/category/add", formData)
      .then((result) => {
        console.log(result);
        navigate("/products/category");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box m={5}>
      <Header
        title={"Create New Category"}
        subTitle={"Create your favourite Category."}
      />
      <Box mt={3}>
        <Formik
          onSubmit={handleClickOnFormSubmit}
          initialValues={initialValue}
          validationSchema={categorySchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Box
                display={"flex"}
                justifyContent={"center"}
                margin={"10px auto"}
              >
                <Card
                  sx={{
                    width: isNonMobile ? "420px" : "100%",
                    backgroundColor: colors.background.alt,
                    p: "20px",
                  }}
                >
                  <TextField
                    sx={{ paddingTop: "10px" }}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Category Name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{ width: "100%", paddingTop: "10px" }}
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                  <Box paddingTop={"10px"}>
                    <label
                      class="block mb-4 text-lg font-medium text-white dark:text-gray-900"
                      for="default_size"
                    >
                      Image
                    </label>
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      class="block w-full mt-5 mb-5 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="default_size"
                      type="file"
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"right"}
                    m={"16px 16px 0px 16px"}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        color: colors.primary[100],
                        backgroundColor: colors.background.alt,
                        fontSize: "14px",
                        p: "10px 20px",
                      }}
                    >
                      Add Category
                    </Button>
                  </Box>
                </Card>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default AddCategory;
