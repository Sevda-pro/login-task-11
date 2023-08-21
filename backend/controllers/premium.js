const db = require("../util/db.config");
const User = db.customers;
const Expenses = db.expenses;
const sequelize = require('sequelize');

const getusers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'Name'],
            include: [
                {
                    model: Expenses,
                    attributes: [],
                    duplicating: false
                }
            ],
        });

        const userWithTotalCost = await Promise.all(users.map(async (user) => {
            const totalCost = await Expenses.sum('Price', {
                where: { customerId: user.id }
            });
            return {
                ...user.toJSON(),
                total_cost: totalCost
            };
        }));

        const sortedUsers = userWithTotalCost.sort((a, b) => b.total_cost - a.total_cost);
        
        return res.status(200).json(sortedUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { getusers };
