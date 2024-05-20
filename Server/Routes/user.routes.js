const router = require('express').Router();
const userModel = require('../Model/user.model');

router.get('/',async (req,res)=>{
    await userModel.find({})
    .then((respone) => res.json(respone))
    .catch((error) => res.status(400).json(`Error from get backend: ${error}`))
});

router.post('/add',async(req,res)=>{
    const {username,password} = req.body;
    const userAdd = await userModel.create({
        username: username,
        userpassword : password
    });
    userAdd.save()
    .then((response) => res.json(`User Data Added Successfully`))
    .catch((error) => res.status(400).json(`Error from post backend : ${error}`))
});

router.put('/update/:id',async (req,res)=>{
    const {id} = req.params;
    const {username,password} = req.body;

    const userUpdate = await userModel.findByIdAndUpdate(
        id,{username:username , userpassword: password},{new:true}
    );
    userUpdate.save()
    .then(() => res.json(`User Data Updated Successfully`))
    .catch((error) => res.status(400).json(`Error from update backend : ${error}`))
});

router.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await userModel.findByIdAndDelete(id)
    .then(()=> res.json(`User Data Deleted Successfully`))
    .catch((error) => res.status(400).json(`Error from delete backend : ${error}`))
})

module.exports = router;