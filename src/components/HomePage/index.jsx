import { Helmet } from "react-helmet-async";
import "./style.scss";

import { Box, ButtonGroup, Button, Grid, Typography } from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import apiInstance from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { MALCard } from "../Cards";
import Navbar from "../Navbar";


const HomePage = () => {


  return (
  <div>
    <Navbar/>
  </div>
  );
};

export default HomePage;
