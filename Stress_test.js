import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { describe, expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const url = 'https://reqres.in/api/users';


// Introducir CSV Data Driven -----------
const csvData = new SharedArray("credentials", function() {
    return papaparse.parse(open('./DD.csv'), {header: true}).data;;})



export const options = {
        // Key configurations for Stress in this section
        stages: [
          { duration: '5s', target: 500 }, // traffic ramp-up from 1 to a higher 100 users over 10 sec.
          { duration: '5s', target: 500 }, // traffic ramp-up from 1 to a higher 100 users over 10 sec.
          { duration: '5s', target: 1000 }, // stay at higher 100 users for 10 sec
          { duration: '5s', target: 0 }, // ramp-down to 0 users
        ],
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
  