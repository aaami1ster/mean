// Listing 9-2. Mongoose employee model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
    id: {
            type: Number,
            required: true,
            unique: true
    },
    name: {
            type: String,
            required: true
    }, 
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    image: {
        type: String,
        default: 'images/user.png'
    }
});
module.exports = mongoose.model('Employee', EmployeeSchema);