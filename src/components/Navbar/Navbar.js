import React from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyls from './styles'

export default function Navbar() {
    const classes = useStyls()
    const user = null

    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memorias</Typography>
                    <img className={classes.image} src="" alt="" />
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} ALT={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {user.result.name}
                            </Typography>
                            <Button className={classes.logout} variant="contained" color="secondary">Log out</Button>
                        </div>
                    ) : (
                        <div>
                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
