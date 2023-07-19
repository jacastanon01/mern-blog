# MERN

## Backend

Tech Stack: MongoDB, Express, React, Node

Passing a json web token through http only cookies for authentication

At first I encrypted the passwords in the controllers like this:

```
const encryptedPassword = bcrypt.hash(password)

const user = await User.create({
    name,
    email,
    password: encryptedPassword
})
```

But by moving this logic into the Model schema directly, you can hash the password before it even reaches the db by using the Schema method `pre` which runs before the specified action

```
userSchema.pre("save", async function(next){
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(8)
    this.password = await bcrypt.hash(this.password, salt)
})
```

### JWT And Cookies

We are passing a Json Web Token as a cookie to authorize the user for access to our private routes. The JWT is generated on login/register to authenticate the user and then passed as a cookie to reference.

<img src="https://hackernoon.imgix.net/images/pazJZnCJTqSZxQS4tltZo4Gatbo1-fo8h3yl1.jpg" style="height: auto; width: 90%;" >
<blockquote>Here, when the user sends a request for user authentication with the login details, the server creates an encrypted token in the form of JSON Web Token (JWT) and sends it back to the client. When the client receives a token, it means that the user is authenticated to perform any activity using the client.</blockquote>
<br/ >
We created a seperate function to generate a jwt with the sign method. Sign takes in a object with a payload as the first parameter then our secret key and an optional options object as the last paramter. Once we get the token, we save it in the response object as a cookie. We passed a userId as a parameter to generateToken so we can generate a new token for each user and then reference the token by that userId.

```
export const generateToken = (res, userId) => {
    // We add userId as a reference to validate the token
    const token = jwt.sign({ userId }, process.env.SECRET { expiresIn: '30d' })
    console.log(token)
    res.cookie('jwt',token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // use secure cookies in prod
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}
```

<br>
Typically JWT are sent as authorization headers in teh http request. Here we set the token as a cookie 'jwt' that we can then access in the request object for our protect middleware.

```
const token = req.cookies.jwt
```

## Frontend

### Redux and Redux Toolkit

What is Redux?
Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

In Redux Toolkit, we create reducers using something called a slice. A slice is a collection of reducer logic and actions for a single feature of our app. We will create a slice for our authentication that will only deal with the local storage of the user. We will have a separate API slice for actually making the requests to the endpoint. A Slice allows you to take in certain pieces of states and actions/reducers to update that slice of state. We're gonna have two Slices:

- AuthSlice: Take the user data that we get back from our api and put it in localStorage and authState. We're gonna store the id, name and email. We will have two reducers, one to set credentials in local storage and one to remove them from local storage

- UserApiSlice: Where we make the request to the backend
