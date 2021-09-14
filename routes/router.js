const express = require('express')

//require the router
const router = express.Router()

//require the Person model
const Person = require('../models/Person')

//API: "http://localhost:5006/add-person"
//desc: create new Person
//access: public

// router.post("/add-person", (req, res) => {
//     const {name, age, favoriteFoods} = req.body //desctructuring
//     const person = new Person({name, age, favoriteFoods})
//     person.save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err))
// })


router.post("/add-person", async (req, res) => {
    const {name, age, favoriteFoods} = req.body //desctructuring
    try {
        const person = await new Person ({name, age, favoriteFoods})
        await person.save()
        return res.status(200).send(person)
    } catch (error) {
        return res.status(500).send({msg: 'Server error'})
    }
})

//API: "/add-many"
//desc: create many persons
//access: public

// router.post("/add-many", (req, res) => {
//     // const {name, age, favoriteFoods} = req.body
//     Person.create(req.body)
//     .then((result) => res.status(200).send(result))
//     .catch((error) => res.status(500).send(error))
// })

router.post("/add-many", async (req, res) => {
    try {
        const person = await Person.create(req.body)
        return res.status(200).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

//API: "/:name"
//desc: find person by name
//access: public
// router.get("/:name", (req, res) => {
//     Person.find({name: req.params.name})//promise
//     .then((result) => res.status(200).send(result)) //fulfilled
//     .catch((error) => res.status(500).send(error)) //rejection
// })

router.get("/:name", async (req, res) => {
    try {
        const person = await Person.find({name: req.params.name}) 
        return res.status(200).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

//API: "/:food"
//desc: find person by favorite foods
//access: public

router.get("/foods/:food", (req, res) => {
    Person.findOne({favoriteFoods: req.params.food}) //promise
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error))
})

// router.get("/foods/:food", async(req, res) => {
//     try {
//         const person = await Person.findOne({favoriteFoods: req.params.food})
//         return res.status(200).send(person)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

//API: "/person/:id"
//desc: find person by favorite foods
//access: public
// router.get("/person/:id", (req, res) => {
//     Person.findById(req.params.id)
//     .then((result) => res.status(200).send(result))
//     .catch((error) => res.status(500).send(error))
// })

router.get("/person/:id", async (req, res) =>{
    try {
        const person = await Person.findById(req.params.id)
        return res.status(200).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

//API: "/update/:id"
//desc: find person by id and update favoriteFoods, then save
//access: public

router.put('/update/:id', (req, res) => {
    Person.findById({_id: req.params.id}, (err, person) => {
        if (err) return console.log(err)
        person.favoriteFoods.push(req.body.favoriteFoods)
        person.save()
        .then((result) => res.status(200).send(result))
        .catch((error) => res.status(500).send(error) )
    })
})

// router.put("/edit/:name", (req, res) => {
//     Person.findOneAndUpdate({name: req.params.name}, {age: req.body.age}, {new: true})
//     .then((result) => res.status(200).send(result))
//     .catch((error) => res.status(500).send(error))
// })

router.put("/edit/:name", async (req, res) => {
    try {
        const person = await Person.findOneAndUpdate({name: req.params.name}, {age: req.body.age}, {new: true})
        res.status(200).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
