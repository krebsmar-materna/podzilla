import http from 'k6/http';
import { check, sleep } from 'k6';

// Load configuration from environment variables
const endpoint = __ENV.ENDPOINT || 'http://localhost';

function smokeTest() {
    console.log('Running Smoke Test...');
    let res = http.get(`${endpoint}`);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'home page contains welcome text': (r) => r.body.includes('Welcome to the Store'),
    });

    res = http.get(`${endpoint}/products`);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'products page contains product list': (r) => r.body.includes('Product List'),
    });

    res = http.get(`${endpoint}/products/1`);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'product page contains product details': (r) => r.body.includes('Product Details'),
    });

    sleep(1);
}

function performanceTest() {
    console.log('Running Performance Test...');
    let res = http.get(`${endpoint}`);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response time is less than 200ms': (r) => r.timings.duration < 200,
    });

    res = http.get(`${endpoint}/products`);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response time is less than 200ms': (r) => r.timings.duration < 200,
    });

    sleep(1);
}

function stressTest() {
    console.log('Running Stress Test...');
    let res = http.get(`${endpoint}`);
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    sleep(1);
}

export let options = __ENV.TEST_TYPE === 'performance' ? {
    vus: 100,
    duration: '1m',
} : __ENV.TEST_TYPE === 'stress' ? {
    stages: [
        { duration: '2m', target: 50 }, // ramp up to 50 users
        { duration: '5m', target: 50 }, // stay at 50 users
        { duration: '2m', target: 100 }, // ramp up to 100 users
        { duration: '5m', target: 100 }, // stay at 100 users
        { duration: '2m', target: 0 }, // ramp down to 0 users
    ],
} : {
    vus: 10,
    duration: '30s',
};

export default function () {
    if (__ENV.TEST_TYPE === 'performance') {
        performanceTest();
    } else if (__ENV.TEST_TYPE === 'stress') {
        stressTest();
    } else {
        smokeTest();
    }
}
