const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    // first_name: {type: String, required: true},
    // last_name: {type: String, required: true},
    email: {type: String, required: [true, "Enter your Email"], unique: true},
    password: {type: String, minLength: 4, required: [true, "A Password is required"]}
})


// The Pre-hook
userSchema.pre(
    'save',
    async function (next) {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

// Password Validation
userSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);
  
    return compare;
  }

  const User = mongoose.model('users', userSchema);
  module.exports = User