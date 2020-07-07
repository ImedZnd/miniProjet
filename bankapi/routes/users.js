const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require('../models/userModel');

const cors = require('cors');
const corsOptions = {
    origin: ['http://*:3000', 'http://localhost:3000'],
    optionsSuccessStatus: 200
};

router.use(express.json());
router.use(cors(corsOptions));


router.get('/all', async (req, res) => {
    try {
        console.log("all");
        const userlist = await User.find({ 'role': 'client' }).sort({ date: -1 });
        res.json(userlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/', async (req, res) => {
    const { name, email, phone, cin, password, role } = req.body;
    try {
        const newUser = new User({
            name,
            email,
            cin,
            phone,
            password,
            role
        });

        const user = await newUser.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
},
);


router.delete('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });


        await User.findByIdAndRemove(req.params.id);

        res.json({ msg: 'user removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/:id', async (req, res) => {
    const { name, email, phone, cin, password, role } = req.body;


    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (phone) userFields.phone = phone;
    if (role) userFields.role = role;
    if (cin) userFields.cin = cin;
    if (password) userFields.password = password;

    try {
        let user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true },
        );

        res.json(user);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;