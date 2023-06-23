const { Schema, model } = require('mongoose');

// schema to create User model
const userSchema = new Schema(
  {
    firstName: String, // update the property name to 'firstName'
    lastName: String, // update the property name to 'lastName'
    age: Number,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  // setter to set the first and last name
  .set(function (v) {
    const [firstName, lastName] = v.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  });

// create virtual property `friendCount` that returns the number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// initialize our User model
const User = model('User', userSchema); // update the model name to 'User'

module.exports = User;