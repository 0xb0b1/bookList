const express = require('express')
const router = express.Router()

const Book = require('../../models/Book')

router.get('/test', (request, response) =>
    response.json({msg: 'backend works'}))

// @route GET /api/books
// @desc Get books (public)
router.get('/', (request, response) => {
    Book.find()
        .then(info => response.json(info))
        .catch(err => res.status(404).json({msg: 'no books found'}))
})


// @route POST /api/books
// @desc Create new book (public)
router.post('/', (request, response) => {
    const newBook = new Book({
        title: request.body.title,
        author: request.body.author,
        description: request.body.description,
    })

    newBook.save().then(info => res.json(info))
})

// @route UPDATE /api/books/update/:id
// @desc Update book (public)
// router.post('/update/:id', (request, response) => {
//     Book.findOneAndUpdate(
//         {_id: request.params.id},
//         {
//             $set: {
//                 title: request.body.title,
//                 author: request.body.author,
//                 description: request.body.description,
//             },
//         },
//         {new: true},
//     )
//         .then(info => {
//             res.json(info)
//         })
//         .catch(err => response.status(400).json({msg: 'update failed'}))
// })

// @route DELETE /api/books
// @desc Delete book (public)
// router.delete('/', (request, response) => {
//     Book.findOneAndRemove({_id: request.body.id}).then(() => {
//         response.json({success: true})
//     })
// })


module.exports = router
