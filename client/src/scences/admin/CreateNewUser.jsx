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
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header";

// country code
const countryDAta = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Brazil", code: "BR" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chile", code: "CL" },
  { name: "Colombia", code: "CO" },
  { name: "China", code: "CN" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Denmark", code: "DK" },
  { name: "Dominica", code: "DM" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "Ethiopia", code: "ET" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Haiti", code: "HT" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Korea", code: "KP" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Liberia", code: "LR" },
  { name: "Luxembourg", code: "LU" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Mexico", code: "MX" },
  { name: "Moldova", code: "MD" },
  { name: "Mongolia", code: "MN" },
  { name: "Morocco", code: "MA" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nigeria", code: "NG" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palestinian", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
  { name: "Russia", code: "RU" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Singapore", code: "SG" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Thailand", code: "TH" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "UE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

// initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cpassword: "",
  contact: "",
  city: "",
  state: "",
  country: "",
  role: "",
};

// schema validation
const userSchema = yup.object().shape({
  firstName: yup.string().required("This field is required").min(2).max(50),
  lastName: yup.string().nullable(),
  email: yup
    .string()
    .email("Like not an email.")
    .required("Email field is required."),
  password: yup.string().required("Password field is required").min(5).max(16),
  cpassword: yup
    .string()
    .required("confirm Password field is required")
    .oneOf([yup.ref("password"), null], "Your Password do not match."),
  contact: yup
    .string()
    .matches(/^(01)[3456789]\d{8}/, "Not valid Bangladeshi Number.")
    .required("Phone Number field is required."),
  city: yup.string().required("Field is required"),
  state: yup.string().nullable(),
  country: yup.string().required("Field is required").min(2).max(3),
  role: yup.string().required("Field is required"),
});

const CreateNewUser = () => {
  const theme = useTheme();
  const colors = theme.palette;
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  //
  const handleClickOnFormSumbit = (values) => {
    const fullName = values.firstName + values.lastName;

    if (values.password === values.cpassword) {
      axios
        .post("http://localhost:5000/management/users/add", {
          name: fullName,
          email: values.email,
          password: values.password,
          city: values.city,
          state: values.state ? values.state : "",
          country: values.country,
          occupation: values.occupation,
          phoneNumber: values.contact,
          role: values.role,
        })
        .then((result) => {
          // console.log("result", result);
          navigate("/management/users", { replace: true });
        })
        .catch((err) => console.log("Error", err));
    }
  };

  return (
    <Box margin={"20px"}>
      <Header
        title={"Create New User"}
        subTitle={"Add new user if your needs."}
      />
      <Box mt={3}>
        <Formik
          onSubmit={handleClickOnFormSumbit}
          initialValues={initialValues}
          validationSchema={userSchema}
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
                gridAutoRows={"60px"}
                gap={1.5}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  value={values.firstName}
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 6",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  value={values.lastName}
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 6",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="E-mail"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: "span 12",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 6",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  value={values.cpassword}
                  name="cpassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.cpassword && !!errors.cpassword}
                  helperText={touched.cpassword && errors.cpassword}
                  sx={{
                    gridColumn: "span 6",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  value={values.city}
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{
                    gridColumn: "span 4",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="State"
                  value={values.state}
                  name="state"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                  sx={{
                    gridColumn: "span 4",
                    gridRow: "span 1",
                  }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    color: colors.primary[200],
                    gridColumn: "span 4",
                    gridRow: "span 1",
                  }}
                >
                  <InputLabel sx={{ fontSize: "14px" }} id="countryId">
                    Country
                  </InputLabel>

                  <Select
                    labelId="countryId"
                    id="country"
                    name="country"
                    value={values.country}
                    label="Country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.country && !!errors.country}
                  >
                    {countryDAta.map((item) => (
                      <MenuItem key={item.code} value={item.code}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Occupation"
                  value={values.occupation}
                  name="occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.occupation && !!errors.occupation}
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                    gridRow: "span 1",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  value={values.contact}
                  name="contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{
                    gridColumn: "span 4",
                    gridRow: "span 1",
                  }}
                />
                <FormControl
                  variant="filled"
                  sx={{
                    color: colors.primary[200],
                    gridColumn: "span 4",
                    gridRow: "span 1",
                  }}
                >
                  <InputLabel sx={{ fontSize: "14px" }} id="IdRole">
                    User Role
                  </InputLabel>
                  <Select
                    labelId="IdRole"
                    id="role"
                    name="role"
                    value={values.role}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!errors.role}
                  >
                    <MenuItem key={1} value={"admin"}>
                      Admin
                    </MenuItem>
                    <MenuItem key={2} value={"superAdmin"}>
                      SuperAdmin
                    </MenuItem>
                    <MenuItem key={3} value={"user"}>
                      User
                    </MenuItem>
                  </Select>
                </FormControl>
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
                  Add New User
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default CreateNewUser;
