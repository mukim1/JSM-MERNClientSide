import React, { useState, useEffect } from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPost } from '../../redux/actions/post'

export default function Home() {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState()

  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <div>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts
                setCurrentId={setCurrentId}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}
