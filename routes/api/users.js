const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let users = require('../../Users')


//get all users
router.get('/',(req,res)=>{
    res.json(users);
});

//get user by id
router.get('/:id',(req,res)=>{
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    }else{
        res.sendStatus(400)
    }
});

//create new user
router.post('/',(req,res)=>{
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if(!newUser.name || !newUser.email){
        return res.sendStatus(400)
    }

    users.push(newUser)
    res.json(users)
});

//update a user
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Parse the user ID from URL parameter
    const updateUser = req.body; // Get the updated user data from request body

    // Check if the user with the specified ID exists in the `users` array
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update user properties if corresponding fields are present in the request body
    if (updateUser.name) {
        foundUser.name = updateUser.name;
    }
    if (updateUser.email) {
        foundUser.email = updateUser.email;
    }

    // Send response with updated user object
    res.json({ message: 'User updated', user: foundUser });
});

//delete a user

router.delete('/:id',(req,res)=>{
    const userId = parseInt(req.params.id)

    const found = users.some((user)=>user.id === userId)
    if(found){
        users = users.filter((user)=>user.id !== userId)
        res.json({message: 'user is deleted'})
    } 
    res.sendStatus(400)
});

module.exports = router