// const get = require('../scripts/app');
const { get_data, put_data, render_data } = require("../scripts/app.js");

// GET
test('url nulll', async () => {
    let error_message;
    try {
        const data = await get_data(null);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('url not found');
});

test('a number', async () => {
    let error_message;
    try {
        const data = await get_data(23);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('url not found');
});

test('noting url', async () => {
    let error_message;
    try {
        const data = await get_data();        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('url not found');
});

test('boolean ', async () => {
    let error_message;
    try {
        const data = await get_data(false);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('url not found');
});

// PUT 
test('a number', async () => {
    let error_message;
    try {
        const data = await put_data(22, 22);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('not is a object');
});

test('a string', async () => {
    let error_message;
    try {
        const data = await put_data({}, 22);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('not is a object');
});

test('object and number ', async () => {
    let error_message;
    try {
        const data = await put_data([], 22);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('not is a object');
});

test('one argument ', async () => {
    let error_message;
    try {
        const data = await put_data([]);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('not is a object');
});

test('0 argument ', async () => {
    let error_message;
    try {
        const data = await put_data([]);        
    } catch (error) {
        error_message = error.message
    }
    expect(error_message).toBe('not is a object');
});
