const express = require('express');
const router = express.Router();



const User = require('../models/userModel');
const Account = require('../models/accountModel');


const cors = require('cors');
const corsOptions = {
    origin: ['http://*:3000', 'http://localhost:3000'],
    optionsSuccessStatus: 200
};

router.use(express.json());
router.use(cors(corsOptions));

router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(accounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/all', async (req, res) => {
    try {
        console.log("all accounts");
        const accountList = await Account.find().populate("transactions");
        res.json(accountList);
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//get account by id
router.get('/acc/:id', async (req, res) => {
    try {
        const accounts = await Account.findOne({ _id: req.params.id });
        console.log(accounts); res.json(accounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get accounts of a certain user id
router.get('/:id', async (req, res) => {
    try {
        const accounts = await Account.find({ user: req.params.id }).populate("transactions");
        console.log(accounts); res.json(accounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//add account to user
router.post('/', async (req, res) => {
    const { num, user, solde } = req.body;
    console.log(req.body);
    try {
        const newAccount = new Account({
            num, user, solde
        });

        const u = await User.findById(user)

        if (!u) {
            console.log("can't add account, user doesn't exist")
            res.status(500).send('NO_USER');
        }

        const acc = await Account.findOne({ num: num });
        if (acc) {
            console.log("account already exists");
            res.status(500).send("ACCOUNT_EXISTS");
        }

        const account = await newAccount.save();

        res.json(account);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
},
);

router.post('/bycin', async (req, res) => {
    const { num, cin, solde } = req.body;
    console.log(req.body);
    try {
        const user = User.findOne({ cin: cin })

        if (!user) {
            console.log("can't add account, user doesn't exist: cin")
            res.status(404).send('Server Error');
        }

        const acc = Account.findOne({ num: num });
        if (acc) {
            console.log("account already exists");
            res.status(404).send("ACCOUNT_EXISTS");
        }

        let id = user._id;

        const newAccount = new Account({
            num, id, solde
        });

        const account = await newAccount.save();

        res.json(account);
    } catch (err) {
        console.error("accounts, by cin");
        console.error(err.message);
        res.status(500).send('Server Error');
    }
},
);

//delete account
router.delete('/:id', async (req, res) => {
    try {
        let account = await Account.findById(req.params.id);

        if (!account) return res.status(404).json({ msg: 'account not found' });


        await Account.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Account removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/transfer', async (req, res) => {
    const { from, to, amount } = req.body;

    try {
        console.log(req.params.num)
        let fromAccount = await Account.findOne({ num: from });
        let toAccount = await Account.findOne({ num: to });


        if (!fromAccount || !toAccount) return res.status(404).json({ msg: 'account not found' });

        let fromSolde = fromAccount.solde - amount;
        let toSolde = toAccount.solde + amount;

        fromAccount = await Account.findByIdAndUpdate(
            fromAccount._id,
            { $set: { solde: fromSolde } },
            { new: true },
        );

        toAccount = await Account.findByIdAndUpdate(
            toAccount._id,
            { $set: { solde: toSolde } },
            { new: true },
        );

        const accounts = [fromAccount, toAccount];

        res.json(accounts);
    } catch (err) {
        console.error("accounts , transfer " + er.message);
        res.status(500).send('Server Error');
    }
});

router.put('/solde', async (req, res) => {
    const { num, amount } = req.body;

    try {
        console.log(req.params.num)
        let account = await Account.findOne({ num: num });



        if (!account) return res.status(404).json({ msg: 'account not found' });


        let solde = account.solde + amount;

        account = await Account.findByIdAndUpdate(
            account._id,
            { $set: { solde: solde } },
            { new: true },
        );

        res.json(account);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
});


//to revisit
router.put('/bynum/:num', async (req, res) => {
    const { num, user, solde } = req.body;


    const accountFields = {};
    if (num) accountFields.num = num;
    if (user) accountFields.user = user;
    if (solde) accountFields.solde = solde;



    try {
        console.log(req.params.num)
        let account = await Account.findOne({ num: req.params.num });

        console.log(account);
        if (!account) return res.status(404).json({ msg: 'account not found' });

        account = await Account.findByIdAndUpdate(
            account._id,
            { $set: accountFields },
            { new: true },
        );

        res.json(account);
    } catch (err) {
        console.error("accounts by num" + er.message);
        res.status(500).send('Server Error');
    }
});



//update account (solde)
router.put('/:id', async (req, res) => {
    const { num, user, solde } = req.body;


    const accountFields = {};
    if (num) accountFields.num = num;
    if (user) accountFields.user = user;
    if (solde) accountFields.solde = solde;


    try {
        let account = await Account.findById(req.params.id);

        if (!account) return res.status(404).json({ msg: 'account not found' });

        account = await Account.findByIdAndUpdate(
            req.params.id,
            { $set: accountFields },
            { new: true },
        );

        res.json(account);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;