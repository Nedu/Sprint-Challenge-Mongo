const router = require('express').Router();

const Budget = require('../data/Budget');

router.get('/', (req, res) => {
    Budget
    .find()
    .then(budgets => {
        res.status(200).json(budgets);
    })
    .catch(err => {
        res.status(500).json({ error: 'The budgets could not be retrieved at this time.'})
    })
})

router.post('/', (req, res) => {
    const { title, budgetAmount } = req.body;
    const newBudget = { title, budgetAmount };

    if(!title || !budgetAmount) {
        res.status(400).json({ error: 'Title and budget are required.' });
    }

    if(budgetAmount <= 0) {
        res.status(400).json({ error: 'Budget must be greater than 0' });
    }

    const budget = new Budget(newBudget);
    budget.save().then(budget => {
        res.status(201).json(budget);
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error creating the budget' });
    })
})

module.exports = router;