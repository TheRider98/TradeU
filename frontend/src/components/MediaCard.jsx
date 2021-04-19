import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import me from '../images/me3.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(10),
    marginTop: "5em",
  },
  media: {
    height: "200px",
  },
  btn: {
    color: "#2C98F0"
  },
  card: {
    backgroundColor: "rgba(86,246,228,.10)"
  }
}))


export default function MediaCard() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const options = { headers: { 'Authorization': `Bearer ${token}` } }
      const apiResult = await axios.get('http://localhost:5000/posts/get', options); // This line is changed per API call, change sub to API name
      setPosts(await apiResult.data)
    })()
  }, [getAccessTokenSilently]);

  return (
    <Grid
      direction="row"
      justify="flex-start"
      container spacing={2}>
      {posts.map((posts, key) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card variant="outlined" className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={me}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {posts.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" s>
                    {posts.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" className={classes.btn}>
                  Share
                </Button>
                <Button size="small" className={classes.btn}>
                  Learn More
                      </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}