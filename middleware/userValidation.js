const { check, oneOf, validationResult } = require('express-validator');

function userValidation() {
    return oneOf([
        [
            check('username').isLength({ min: 5, max: 16 }).withMessage('Username must be at least 5 and no more than 16 characters.'),
            check('email').isEmail().withMessage('Email invalid.'),
            check('phone').isLength({ min: 10, max: 12 }).withMessage('Phone must be at least 10 and no more than 12 characters.'),
            check('gender').isIn(['male', 'female']).withMessage('Gender should be either male or female.'),
            check('age').isNumeric({ min: 1, max: 100 }).withMessage('The age must be a number between 1 and 100'),
            check('occupation').isIn(['student', 'self employed', 'homemaker', 'job']).withMessage('You have entered invalid occupation. Please enter valid occupation.'),
            check('city').isLength({ min: 3, max: 20 }).withMessage('City must be at least 3 and no more than 20 characters.'),
            check('country').isLength({ min: 3, max: 20 }).withMessage('Country must be at least 5 and no more than 16 characters.'),
        ]
    ]);
}

module.exports = {
    userValidation
}