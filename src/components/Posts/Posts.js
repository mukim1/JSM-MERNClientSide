import React from 'react'
import { useSelector } from 'react-redux'
import useStyls from './styles'
import Post from './Post/Post'

export default function Posts() {
    const classes = useStyls()
    const posts = useSelector((state) => state.posts)

    console.log(posts)
    return (
        <div>
            <Post/>
        </div>
    )
}
