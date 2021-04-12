import express from "express";
import { User } from "./user.model";
import { validate, ValidationError, Joi } from "express-validation";

const router = express.Router();
const users: User[] = [];

const userValidation = {
    body: Joi.object({
        id: Joi.string()
            .required(),
        password: Joi.string()
            .required(),
        age: Joi.string()
            .required(),
        isDeleted: Joi.string()
            .required(),
        login: Joi.string()
            .required(),
    }),
};

router.post('/create', validate(userValidation, {}, {}), (req: any, res: any) => {
    const userInfo = { ...req.body };
    users.push(userInfo);
    res.status(200).json({
        success: true,
        message: "User Created successfully!"
    });
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    const userInfo = getUserInfoById(id);
    if (!userInfo) {
        res.json({ success: false, message: `User does not exists` });
    }
    else {
        res.json({ success: true, message: "User fetched", userDetails: userInfo });
    }
});

router.delete('/:id', (req, res, next) => {
    let id = req.query.id;
    const userInfo = getUserInfoById(id);
    if (!userInfo) {
        res.json({ success: false, message: `User does not exists` });
    }
    else {
        userInfo.isDeleted = true;
        res.json({ success: true, message: "User Deleted" });
    }
});

router.put('/', validate(userValidation, {}, {}), (req, res, next) => {
    const userId = req.query.id;
    let userIndex = getUserIndexById(userId);
    if (userIndex < 0) {
        res.json({ success: false, message: `User does not exists` });
    }
    else {
        users[userIndex] = req.body;
        res.json({ success: true, message: "User Details Updated" });
    }
});

function getUserInfoById(id: any) {
    return users.find(user => user.id === id);
}

function getUserIndexById(id: any) {
    return users.findIndex(user => user.id === id);
}

router.get('/', (req, res) => {
    const limit = +req.query.limit;
    const loginSubstring = +req.query.loginSubstring;
    const filteredUsers = users.filter((a: any) => a.login.substring(loginSubstring));
    const usersList = filteredUsers.slice(0, limit || filteredUsers.length);
    res.status(200).json({
        success: true,
        message: "Users fetched successfully!",
        users: usersList
    });
});

module.exports = router;
