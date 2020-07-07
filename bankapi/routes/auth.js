const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require("../middlewares/auth");

const User = require('../models/userModel');

const cors = require('cors');
const corsOptions = {
    origin: ['http://*:3000', 'http://localhost:3000'],
    optionsSuccessStatus: 200
};

router.use(express.json());
router.use(cors(corsOptions));


router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        let user = await User.findOne({ email });
        console.log("looked for email, user: " + user);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        console.log(password + "and " + user.password)
        const isMatch = await bcrypt.compare(password, user.password) || password === user.password;
        console.log("isMatch :" + isMatch)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            },
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
},
);

module.exports = router;