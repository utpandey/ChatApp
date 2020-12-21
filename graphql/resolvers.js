const bcrypt = require('bcryptjs');

const { UserInputError } = require('apollo-server')

const { User } = require('../models/');

module.exports = {

    Query: {
        getUsers: async() => {
            try {
                const users = await User.findAll()
                return users
            } catch (err) {
                console.log(err)
            }
        },
    },

    Mutation: {
        register: async(_, args) => {
            let { username, email, password, confirmPassword } = args
            let errors = {}

            try {
                //  Validate input data
                if (username.trim() === '')
                    errors.username = 'Username must not be empty!'
                if (email.trim() === '')
                    errors.email = 'Email must not be empty!'
                if (password.trim() === '')
                    errors.passsword = 'Passsword must not be empty!'
                if (confirmPassword.trim() === '')
                    errors.confirmPassword = 'Confirm Password must not be empty!'

                if (password !== confirmPassword) errors.confirmPassword = 'Password must match Confirm Password!'

                //  Check if username / email exists
                // const userByUsername = await User.findOne({ where: { username } })
                // const userByEmail = await User.findOne({ where: { email } })

                // if (userByUsername) errors.username = 'Username is already taken!'
                // if (userByEmail) errors.email = 'Email is already registered!'

                if (Object.keys(errors).length > 0) {
                    throw errors
                }

                //  Hash password
                password = await bcrypt.hash(password, 6)

                //  Create user

                const user = await User.create({
                        username,
                        email,
                        password
                    })
                    //  Return User
                return user
            } catch (err) {
                console.log(err)
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach(
                        (e) => (errors[e.path] = `${e.path} is already taken!`))
                } else if (err.name === 'SequelizeValidationError') {
                    err.errors.forEach(
                        (e) => (errors[e.path] = e.message)
                    )
                }
                throw new UserInputError('Bad Input', { errors })
            }
        }
    }
}