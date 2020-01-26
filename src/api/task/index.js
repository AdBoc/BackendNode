//shift + alt + f - text formatting 
const express = require('express');
const { Task } = require('./model');

const router = express.Router();//storing handlers in router

//send all database 
router.get('/tasks', async (req, res) => {
    const {query} = req;
    
    const filter = {};
    if(query.status){
        filter.status = query.status;//jesli robimy konwersje na int to Int(queryparams)
    } 

    const task = await Task.find(filter, {});
    res.json(task.map(task => task.view()));

    // const task = await Task.find();
    // res.json(task.map(task => task.view()));
});

//show single record
router.get('/tasks/:id', async (req, res) => { //1 get task that does not exist, 2 get id that is not correct for mongoDB 
    const { id } = req.params; //the same as req.params.id
    try {
        const check = await Task.exists({ _id: id });
        if (check) {
            const task = await Task.findById(id);
            res.json(task.view(true));
        }
        return res.status(404).end(); //1
    } catch (err) {
        res.status(400).end(); //2
    }
});

//add task
router.post('/tasks', async (req, res) => { //1 added without title 2 title must be unique
    const { body } = req;
    try {
        const task = await Task.create(body);
        res.json(task);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "title must be unique" }); //2
        }
        res.status(400).json({ error: err.message }); //1 
    }
});

//edit task
router.put('/tasks/:id', async (req, res, next) => { //1 edits task that does not exist 2 inserts id that is wrong for mongo 3 deletes title 
    const { id } = req.params;
    const { body } = req;
    try {
        let task = await Task.findById(id);
        if (!task)
            return res.status(404).end(); //1
        await Task.findByIdAndUpdate({ _id: id }, body); //res.send(task);
        res.json("task is updated")
    } catch (err) {
        res.status(res.status(400).json({ error: err.message })); //2
    }

    // const { id } = req.params;
    // const { body } = req;
    // let task = await Task.findById(id);
    // if (!task) //1
    //     return res.status(404).end;
    // task = Object.assign(task, body);
    // try {
    //     await task.save();
    //     res.json(task);
    // } catch (err) {
    //     res.status(400).json({ error: err.message });
    // }
});

// router.put('/tasks/:id', (req, res, next) => {
//     Task.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
//         Task.findOne({_id: req.params.id}).then((task) => {
//             res.send(task);
//         });
//     });
// });

//delete task
router.delete('/tasks/:id', async (req, res) => { //1 deletes task that doesnt exist 2 deletes wrong id for mongo 
    const { id } = req.params;

    await Task.findByIdAndDelete(id, (err, doc) => {
        if (err) return res.status(400).json({ error: err.message }); //2
        if (!doc) return res.status(404).end(); //1

        res.status(204).end();
    });
});

module.exports = router;
//testy jednostkowe-maleczesci kodu(model moongosa zwraca to coma zwracac)
//testy integracyjne-testowaniekomunikacji


//usuwac cala tablice 
//paginacja