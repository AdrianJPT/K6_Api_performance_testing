# K6_Api_performance_testing
This project make a performance test to an API(POST) "https://reqres.in/api/users" using Data Parameterization
 * Smoke test
 * Spike test
 * Stress test
 * Load test

# Start
Download the file en deploy the containers using "docker-compose.yml" file.
> IMPORTANT Ports used for docker is 9090, 3000, 6565 _Feel free to change them if it's needed_
```bash
#(1)
git clone https://github.com/AdrianJPT/K6_Api_performance_testing.git

# (2)
cd K6_Api_performance_testing

# (3)
docker compose -f docker_k6-prometheus-grafana/docker-compose.yml up
```

## Usage
```bash
k6 run -o experimental-prometheus-rw <script_test.js>
```

## Report
* k6 console

![image](https://github.com/AdrianJPT/K6_Api_performance_testing/assets/86939628/4ebb7b60-901c-4b89-afe8-bf0d02f50285)

* grafana

![image](https://github.com/AdrianJPT/K6_Api_performance_testing/assets/86939628/7539f342-cfb0-4754-a6d5-72b3af213da5)


## Prerequisites 
* The _Docker version_ must be at least `20.10.10`.
* The _containerd version_ must be at least `1.5.6`.
* The _docker-compose version_ must be at least `1.28.0`.
    
