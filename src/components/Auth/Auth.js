import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import React from 'react'
import useStyles from './styles'
import Input from './Input'
import { useState } from 'react'
import GoogleLogin from 'react-google-login'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { AUTH } from '../../redux/constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { signIn, signUp } from '../../redux/actions/auth'

export default function Auth() {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const iniatialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
    const [formData, setFormData] = useState(iniatialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if(isSignUp){
            dispatch(signUp(formData, history))
        }else{
            dispatch(signIn(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        return setShowPassword((prev) => !prev)
    }

    const switchMode = () => {
        setIsSignUp((p) => !p)
    }

    const googleSuccess = async (res) => {
        console.log(res)
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: AUTH, data: { result, token } })
            history.push('/')
        } catch (error) {

        }
    }

    const googleFailure = async () => {
        console.log("Google sign in was unsucessful, Try again later")
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" type="email" handleChange={handleChange} autoFocus />
                        <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        {isSignUp && (
                            <Input name="confirmPassword" label="Repete Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                            {isSignUp ? 'Sign up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId="500011625199-0082r91ta86i5hucu7fad35b60fvp0k7.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                >Google sign in</Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode} >
                                    {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
