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
    const user = JSON.parse(localStorage.getItem('profile'))

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.resust?.name }))
            console.log(postData)
        } else {
            dispatch(createPost({ ...postData, name: user?.resust?.name }))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    // console.log(JSON.parse(localStorage.getItem('profile')))
    // console.log(user.result.name)

    if(!user?.result?.name){
        return <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
                Please sign in to create your own post and like others memories!
            </Typography>
        </Paper>
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
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
                    multiline
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
