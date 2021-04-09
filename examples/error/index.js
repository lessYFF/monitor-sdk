function testFn() {
    console.log('testFn', index);
}
// 测试js异常
document.querySelector('#btn-err').addEventListener('click', () => {
    testFn();
});

// 测试资源异常
document.querySelector('#img-err').setAttribute('src', '404.png');

// 测试promise异常
Promise.reject('Promise error1');

Promise.resolve().then(()=> {
    throw 'Promise error2'
});

new Promise((resolve, reject) => {
    reject('Promise error3');
});

