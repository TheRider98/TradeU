import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import me from "../images/me3.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"
import config from "../../../config"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(10),
    marginTop: "5em",
  },
  media: {
    height: "200px",
  },
  btn: {
    color: "#2C98F0",
  },
  card: {
    backgroundColor: "rgba(86,246,228,.10)",
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    borderRadius: "1.5em",
  },
  divider: {
    margin: theme.spacing(3),
  },
  description: {
    color: "#00000",
    marginBottom: "1em",
    fontFamily: "Poppins",
  },
  price: {
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  font: {
    fontFamily: "Poppins",
  },
}));

export default function MediaCard() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const apiResult = await axios.get(
        `${config.SERVER_URI}/posts/get`,
        options
      ); // This line is changed per API call, change sub to API name
      setPosts(await apiResult.data);
    })();
  }, [getAccessTokenSilently]);

  return (
    <Grid direction="row" justify="flex-start" container spacing={2}>
      {posts.map((post, key) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card variant="outlined" className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`data:image/png;base64,${post.image}`}
                />
                <CardContent>
                  <Typography
                    className={classes.font}
                    gutterBottom
                    variant="h5"
                  >
                    {post.title}
                  </Typography>
                  <Typography className={classes.description} variant="body2">
                    {post.description}
                  </Typography>
                  <Typography
                    className={classes.price}
                    variant="body2"
                    color="textSecondary"
                  >
                    $ {post.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" className={classes.btn}>
                  Let's Trade
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}