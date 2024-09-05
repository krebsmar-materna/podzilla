# Use the official k6 image from Docker Hub
FROM grafana/k6:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the test script and configuration files to the container
COPY . ./app

# Set the default command to run the all_tests.js script
CMD ["run", "all_tests.js"]
