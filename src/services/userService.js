import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let userData = {};
            let isExist = await checkUserEmail(email,)
            if(isExist) {

                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: {email: email},
                    raw : true,
                });
                console.log(user);

                if(user) {
                    let check = await  bcrypt.compareSync(password, user.password); 
                    
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'okla';

                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }else {
                    userData.errCode = 2;
                    userData.errMessage =`User's not found`;
                }

                

               
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email is't exist in your system. Please enter your email again !!!`
                
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

// let compareUserPassword = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
            
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail}
            })
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: data.email}

            })
            if(user){
                resolve(
                    
                    {
                        errCode: 2,
                        errMessage: "user is Exist"
                    }

                )
            }else {

                await db.User.create({
                    email: data.email,
                    fisrtName: data.fisrtName,
                    password: data.password,

                })
                resolve({
                    errCode:0,
                    errMessage: "create user succed"
                })
            }
        } catch (e) {
            console.log(e);
            reject(e)
            
        }
    })
}

let handleGetAllUser = () =>{
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.findAll({raw : true,})
            console.log(response);
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    handleCreateUser: handleCreateUser,
    handleGetAllUser: handleGetAllUser
}