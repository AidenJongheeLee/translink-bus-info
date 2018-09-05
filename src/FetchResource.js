import request from 'superagent';

const API_KEY = 'Z7ON66vgAZNFX6tUTyQA';
const TRANS_LINK = 'https://tanslink-api.herokuapp.com/api';

class FetchResource {
  static getAllStops(lat = 49.248523, long = -123.1088) {
    const translinkLat = lat.toFixed(6);
    const translinkLong = long.toFixed(6);

    return new Promise((resolve, reject) => {
      request
        .get(`${TRANS_LINK}/stops`)
        .query({ lat: translinkLat, long: translinkLong, radius: 400 })
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  static getStopEstimate(stop_num) {
    return new Promise((resolve, reject) => {
      request
        .get(`${TRANS_LINK}/estimate/${stop_num}`)
        .query({ count: 3 })
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }
}

export default FetchResource;
