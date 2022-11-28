import userService from '../services/userService';

let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;


    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Invalid email or password'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},

        
    })
}

let handleCreateUser = async (req, res) => {
    try {
      let response = await userService.handleCreateUser(req.body)
      console.log(response);
      return res.status(200).json(
        response
        )
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'error from sever'
        })
    }
}

let handleGetAllUser = async (req, res) => {
    try {
        let response = await userService.handleGetAllUser()
        return res.status(200).json(
            response
            )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: 'error from sever'
        })
    }
}

module.exports = {
    handleLogin,
    handleCreateUser,
    handleGetAllUser
}