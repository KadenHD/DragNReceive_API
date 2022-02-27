import { assert } from 'chai';
import { isValidEmail, isValidPassword } from '../Validations/Formats.js';

describe('Testing formats', () => {
    describe('Testing email format', () => {
        it('Email format is valid', () => {
            let result = isValidEmail("test@test.test");
            assert.equal(result, true);
        });
        it('Email should be a string', () => {
            let result = isValidEmail(752.35);
            assert.equal(result, false);
        });
        it('Email should be "string@string.string" format', () => {
            let result = isValidEmail("test.test@test?");
            assert.equal(result, false);
        });
        it('Email length should be less or equal to 100', () => {
            let result = isValidEmail("test@test.testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            assert.equal(result, false);
        });
    });

    describe('Testing password format', () => {
        it('Password format is valid', () => {
            let result = isValidPassword("Password1@");
            assert.equal(result, true);
        });
        it('Password should be a string', () => {
            let result = isValidPassword("Password@");
            assert.equal(result, false);
        });
        it('Password should have one upper case character', () => {
            let result = isValidPassword("password1@");
            assert.equal(result, false);
        });
        it('Password should have one lower case character', () => {
            let result = isValidPassword("PASSWORD1@");
            assert.equal(result, false);
        });
        it('Password should have one number character', () => {
            let result = isValidPassword("Password@");
            assert.equal(result, false);
        });
        it('Password should less or equal to 60 characters', () => {
            let result = isValidPassword("Password1@Password1@Password1@Password1@Password1@Password1@1");
            assert.equal(result, false);
        });
        it('Password should be more than 7 characters', () => {
            let result = isValidPassword("Passw1@");
            assert.equal(result, false);
        });
    })
});

