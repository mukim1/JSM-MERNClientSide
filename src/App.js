import { AppBar, Container, Grid, Grow, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import { getPost } from './redux/actions/post'
import useStyls from './styles'

export default function App() {
  const classes = useStyls()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memorias</Typography>
        <img className={classes.image} src="" alt="" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}
