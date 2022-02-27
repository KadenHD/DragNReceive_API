import { assert } from 'chai';
import { emailExist, shopExist } from '../Validations/Exists.js';

describe('Testing exists', () => {
    describe('Testing email exist', () => {
        it('Email exist in Database', async () => {
            let result = false;
            if (await emailExist("admin@admin.admin")) result = true;
            assert.equal(result, true);
        });
        it('Email dont exist in Database', async () => {
            let result = true;
            if (!await emailExist("test@test.test")) result = false;
            assert.equal(result, false);
        });
    });

    describe('Testing shop exist', () => {
        it('Shop exist in Database', async () => {
            let result = false;
            if (await shopExist("partner")) result = true;
            assert.equal(result, true);
        });
        it('Shop dont exist in Database', async () => {
            let result = true;
            if (!await shopExist("randomId")) result = false;
            assert.equal(result, false);
        });
    });
});