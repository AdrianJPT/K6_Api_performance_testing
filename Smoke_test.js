import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { describe, expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


const url = 'https://reqres.in/api/users';


// Introducir CSV Data Driven -----------
const csvData = new SharedArray("credentials", function() {
    return papaparse.parse(open('./DD.csv'), {header: true}).data;;})



export const options = {
    stages: [
        { duration: '10s', target: 5 }, // stay at 5 users for 10 sec
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
      },
    };


export default function () {

    // Loop through all username/password pairs ------------

    //for (const userPwdPair of csvData) {
    //    console.log(JSON.stringify(userPwdPair));
    //  }

    // Pick a random username/password pair -------------
    var RamdomDataCSV  = csvData[Math.floor(Math.random() * csvData.length)];
    var names  = csvData[Math.floor(Math.random() * csvData.length)]['names'];
    var jobs = csvData[Math.floor(Math.random() * csvData.length)]['jobs'];
   
    var payload =  JSON.stringify(
        {
        "name": RamdomDataCSV['names'],
        "job": RamdomDataCSV['jobs'],
        });
    //console.log('debug: ', JSON.stringify(payload));

    var params = {
        //cookies: { my_cookie: 'value' },
        headers:{   'Content-Type': 'application/json',
                    //'User-Agent': 'k6',
                    //'Authorization': 'Token ' + apiToken
                }}

    
  // Using a JSON string as body

    describe('CHAI ...', () => {
        
        var response = http.post(url, payload, params);
        //console.log('result: ', response);
        expect(response.status,'El estado de la respuesta').to.equal(201)
        })

    sleep(1);
};

export function handleSummary(data) {
  console.log('Finished executing performance tests');

  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
    'summary.json': JSON.stringify(data), // and a JSON with all the details...
  };
}
