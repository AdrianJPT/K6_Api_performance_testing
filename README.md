# K6_Api_performance_testing
Workloads script to make performance testing to an API using:

# Start
Download the file en deploy the containers using "docker-compose.yml" file.
> IMPORTANT Ports used for docker is 9090, 3000, 6565 _Feel free to change them if it's needed_
```bash
git clone https://github.com/AdrianJPT/K6_Api_performance_testing.git
docker compose build
docker compose -f K6_Api_performance_testing/docker-compose.yml build
docker compose -f K6_Api_performance_testing/docker-compose.yml up
```

## Usage
```bash
k6 run -o experimental-prometheus-rw <script_test.js>
```

## Prerequisites 
* The _Docker version_ must be at least `20.10.10`.
* The _containerd version_ must be at least `1.5.6`.
* The _docker-compose version_ must be at least `1.28.0`.
    
