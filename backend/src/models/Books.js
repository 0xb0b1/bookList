
const BookSchema = new(){
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}

module.exports = Book
