import { Helmet } from "react-helmet";
import "./style.scss";

import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Box, ButtonGroup, Button, Grid, Typography } from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${baseUrl}/anime/season/2021/fall?limit=3`)
        .then((response) => {
          console.log("animeData ", response.data);
          setAnimeData(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
    fetchData();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>هاردساب انیمه | AW_DL</title>
      </Helmet>
      <div>
        <Typography
          component="div"
          style={{ textAlign: "right", margin: "50px" }}
          variant="h5"
        >
          انیمه های فصلی
        </Typography>
        {loading ? (
          <div style={{ padding: "100px", display: "flex" }}>
            <ReactLoading
              type="spinningBubbles"
              color="orangered"
              height={100}
              width={100}
            />
          </div>
        ) : (
          <>
            <Grid
              style={{ display: "flex" }}
              justifyContent="center"
              alignItems="center"
              container
              rowSpacing={4}
              md={8}
              xs={10}
            >
              {animeData.map(anime => (
                <Grid item md={4} sm={6} xs={12} >
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "450px",
                      height: "300px",
                      marginTop: "62px",
                      border: "5px solid black",
                    }}
                  >
                    <img src={anime.node.main_picture.medium} />
                    Name: {anime.node.title}
                    <br />
                    Year:
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
