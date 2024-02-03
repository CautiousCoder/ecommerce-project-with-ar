import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateNewUser from "./scences/admin/CreateNewUser.jsx";
import Admin from "./scences/admin/index.jsx";
import BreckDown from "./scences/breakDown/index.jsx";
import Customers from "./scences/customers/index.jsx";
import Daily from "./scences/daily/index.jsx";
import Dashboard from "./scences/dashboard/index.jsx";
import Geography from "./scences/geography/index.jsx";
import Layout from "./scences/layout/index.jsx";
import Monthly from "./scences/monthly/index.jsx";
import Overview from "./scences/overview/index.jsx";
import Performance from "./scences/performance/index.jsx";
import AddCategory from "./scences/products/AddCategory.jsx";
import Category from "./scences/products/Category.jsx";
import AddProdect from "./scences/products/addProdect.jsx";
import Products from "./scences/products/index.jsx";
import Transactions from "./scences/transactions/index.jsx";
import { themeSetting } from "./themes.js";
import Home from "./views/home";
import FrontLayout from "./views/layout";

function App() {
  const mode = useSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<FrontLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            {/* frontent route */}
            <Route path="/home" element={<Home />} />
            {/* frontent route */}
          </Route>
          <Route element={<Layout />}>
            <Route
              path="/admin"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/addProduct" element={<AddProdect />} />
            <Route path="/products/category" element={<Category />} />
            <Route
              path="/products/category/addCategory"
              element={<AddCategory />}
            />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<BreckDown />} />
            <Route path="/users" element={<Admin />} />
            <Route path="/users/add" element={<CreateNewUser />} />
            <Route path="/performance" element={<Performance />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
