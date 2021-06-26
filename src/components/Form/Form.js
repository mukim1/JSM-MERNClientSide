import React, { useState, useEffect } from 'react'
import useStyls from './styles'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../redux/actions/post'

export default function Form({ currentId, setCurrentId }) {
    const classes = useStyls()
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    }

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
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
                    rows="4"
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    name="tags"
                    label="Tags"
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
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
