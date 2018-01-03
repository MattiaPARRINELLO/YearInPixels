import axios from 'axios';
const config = require('../config.json');

export default class AppApi {
    static getSheet(){
        return axios({
            method: 'get',
            url: 'https://sheets.googleapis.com/v4/spreadsheets/'+config.spreadsheet+'/values/Sheet1!A1:D365',
            params: {
              key: config.key,
            }
          });
    }
}