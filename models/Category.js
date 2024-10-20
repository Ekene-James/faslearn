const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const subCategorySchema = new mongoose.Schema({
    name: {
        required: [true, "Please enter the sub-category name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
})

const categorySchema = new mongoose.Schema({
    name: {
        required: [true, "Please enter the category name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    subCategory: [subCategorySchema]
}, {timestamps: true});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;