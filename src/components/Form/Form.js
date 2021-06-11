import React, { useState } from 'react'
import useStyls from './styles'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../redux/actions/post'

export default function Form() {
    const classes = useStyls()
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    })

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submited")
        dispatch(createPost(postData))
    }

    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="creator"
                    label="Creator"
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    name="title"
                    label="Title"
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    name="message"
                    label="Message"
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    name="tags"
                    label="Tags"
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>cancle</Button>
            </form>
        </Paper>
    )
}
