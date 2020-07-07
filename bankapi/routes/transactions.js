const express = require('express');
const router = express.Router();

const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const Account = require("../models/accountModel");

const cors = require('cors');
const corsOptions = {
    origin: ['http://*:3000', 'http://localhost:3000'],
    optionsSuccessStatus: 200
};

router.use(express.json());
router.use(cors(corsOptions));

//get transactions of a certain account id
router.get('/:id', async (req, res) => {
    try {
        const fromTransactions = await Transaction.find({ account: req.params.id });
        const toTransactions = await Transaction.find({ to: req.params.id });

        const transactions = [...fromTransactions, ...toTransactions]
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        console.log(transactions)
        res.json(transactions);
    } catch (err) {
        console.log("/all transactions");
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/byuser/:id', async (req, res) => {
    try {
        const accounts = await Account.find({ user: req.params.id }).populate("transactions").populate("totransactions");

        let transactions = [];
        accounts.forEach(trs => {

            trs.transactions.forEach(tr => {
                transactions.push(tr);
            })


        });

        accounts.forEach(trs => {

            trs.totransactions.forEach(tr => {
                transactions.push(tr);
            })
        });

        res.json(transactions);
    } catch (err) {
        console.log("byuser/id")
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



router.post('/bynum', async (req, res) => {
    const { fromNum, type, value, toNum, description, aId } = req.body;
    try {
        const fn = await Account.findOne({ num: fromNum })
        const tn = await Account.findOne(({ num: toNum }))

        let fNum = fromNum;


        console.log("fn :" + fn)
        console.log("tn :" + tn)

        const to = tn._id;

        if (fn) {
            account = fn._id;
        }

        if (!fn) {
            account = aId;
            fNum = "Bank"
            console.log("employee");
        }


        const newTransaction = new Transaction({
            account, type, value, to, fromNum: fNum, toNum, description
        });


        const transaction = await newTransaction.save();

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
},
);


//create transaction
router.post('/', async (req, res) => {
    const { account, type, value, to } = req.body;
    try {
        const fn = await Account.findOne({ _id: account })
        const tn = await Account.findOne(({ _id: to }))


        const fromNum = fn.num;
        const toNum = tn.num;


        const newTransaction = new Transaction({
            account, type, value, to, fromNum, toNum
        });


        const transaction = await newTransaction.save();

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
},
);



module.exports = router;