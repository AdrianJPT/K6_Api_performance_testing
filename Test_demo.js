import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { describe, expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


const url = 'https://reqres.in/api/users';


// Introducir CSV Data Driven -----------
const csvData = new SharedArray("credentials", function() {
    return papaparse.parse(open('./DD.csv'), {header: true}).data;;})


//export function setup() {
//    let token = http.get('https://reasdasdsadsdas/d/asd/asd/as/sa');
//    }
//
export const options = {
    scenarios: {
      Unidad: {
        executor: 'per-vu-iterations',
        vus: 1000,
        iterations: 1,
        maxDuration: '1s',
        gracefulstop: '30s'
      },
      //PreVUS: {
      //  executor: 'constant-arrival-rate',
      //  duration: '1s',
      //  rate: 100,
      //  timeUnit: '5s',
      //  preAllocatedVUs: 10,
      //  maxVUs: 100,
      //},
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

    describe('CONDICIONES ...', () => {
        
        var response = http.get(url, payload, params);
        expect(response.status,'El estado de la respuesta').to.equal(200)
        })

    //sleep(5);
};