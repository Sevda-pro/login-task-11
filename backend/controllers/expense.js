const db = require("../util/db.config")
const Expense = db.expenses
const path=require("path")
const jwt=require("jsonwebtoken")
const publicPath = path.join(__dirname, './public');

function createCustomer(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Bad Data"
        })
    }
    // const { Expense, desc, Category } = req.body;
    const customerObject = {
        Price: req.body.Price,
       ProductName: req.body.ProductName,
        BelongsTo:req.body.BelongsTo,
        customerId: req.user.id,
    }
    Expense.create(customerObject).then((data) => {
        res.status(200).send({
            message:"data ok"
        })
    }).catch((err) => {
        res.status(500).send(err);
    })
}
function findAllCustomer(req, res) {
	
 Expense.findAll({ where :{customerId: req.user.id }}).then((data) => {
    res.status(200).send(data)
}).catch(error => {
    res.status(500).json({error,success:false});
})
	
};
function findCustomer(req, res) {
    Expense.findByPk(req.params.email).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send(error);
    })
}
function updateCustomer(req, res) {

}
function deleteCustomer(req, res) {
   Expense.destroy({ where: { ProductName: req.params.id } }).then(() => {
        res.send("updated data");
    }).catch(error => {
        res.status(500).send(error);
    })
}

module.exports = {createCustomer, findAllCustomer, findCustomer, updateCustomer, deleteCustomer }