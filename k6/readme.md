# k6 Load Testing with Docker

This repository contains consolidated k6 load tests for smoke, performance, and stress testing of your application. The tests are run using Docker for easy setup and execution.

## Test Descriptions

### Smoke Test

**Objective:** Quickly verify that the application's core functionalities are working as expected.

**Parameters:**
- **Virtual Users (vus):** 10
- **Duration:** 30 seconds

**Checks:**
1. Verify that the home page returns a status of 200 and contains the welcome text.
2. Verify that the products page returns a status of 200 and contains a product list.
3. Verify that an individual product page returns a status of 200 and contains product details.

### Performance Test

**Objective:** Assess the application's performance under a moderate load to ensure it can handle an expected number of concurrent users without significant delays.

**Parameters:**
- **Virtual Users (vus):** 100
- **Duration:** 1 minute

**Checks:**
1. Verify that the home page returns a status of 200 and the response time is less than 200ms.
2. Verify that the products page returns a status of 200 and the response time is less than 200ms.

### Stress Test

**Objective:** Evaluate the application's stability and performance under extreme load conditions to identify potential breaking points.

**Parameters:**
- **Stages:**
  - Ramp up to 50 users over 2 minutes.
  - Maintain 50 users for 5 minutes.
  - Ramp up to 100 users over 2 minutes.
  - Maintain 100 users for 5 minutes.
  - Ramp down to 0 users over 2 minutes.

**Checks:**
1. Verify that the home page returns a status of 200 throughout the test duration.

## Prerequisites

- Docker installed on your machine

## Setup

1. Clone this repository:
    ```sh
    git clone https://github.com/your-repo/k6-load-testing.git
    cd k6-load-testing
    ```

2. Create a `config.json` file in the root of the repository with the following content:
    ```json
    {
        "endpoint": "http://172.212.7.28"
    }
    ```

## Build the Docker Image

To build the Docker image for running the k6 tests, run the following command:

```sh
docker build -t k6-load-tester .
```

# Run the Tests

## Smoke Test

To run the smoke test, use the following command. This is the default test if no test type is specified:

```sh
docker run --rm -v $(pwd):/app -e ENDPOINT=http://172.212.7.28 k6-load-tester
```

## Performance Test
To run the performance test, use the following command:

```sh
docker run --rm -v $(pwd):/app -e TEST_TYPE=performance -e ENDPOINT=http://172.212.7.28 k6-load-tester
```

## Stress Test
To run the stress test, use the following command:

```sh
docker run --rm -v $(pwd):/app -e TEST_TYPE=stress -e ENDPOINT=http://172.212.7.28 k6-load-tester
```

# Conclusion
This setup allows you to run smoke, performance, and stress tests easily using Docker. You can adjust the configuration and test scripts as needed to fit your application's requirements.