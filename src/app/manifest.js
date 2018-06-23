const axios   = require('axios');
const async   = require('async')
const url     = require('url');
const _       = require('lodash');
const Promise = require('promise');

/*
*
* myStreamExample = manifest(...m3u8);
* myStreamExample.setDebug(true);
* myStreamExample.refreshData().then( console.log );
*
*/

export default function (str) {

  const manifestUrl = typeof str == 'string' && str != '' ? url.parse(str) : url.parse('');

  let set =  {

    // CONFIG
    manifestUrl: manifestUrl,
    debug: false,
    keepErrors: false,
    name: '',

    // STAT
    status: 0,
    statusText: '',
    data: '',

    isMaster: 'notset',

    // SET AND CONFIG
    setManifestUrl: setManifestUrl,
    setName: setName,
    setDebug: setDebug,
    setErrorKeeping: setErrorKeeping,

    // RENDITIONS
    renditions: [],

    // ERRORS
    errors: [],
    newError: newError,

    checks: {
      firstChunk: false,
      lastChunk: false,
      chunkOrder: false,
      chunkCount: false
    },

    // ASYNCH METHODS
    refreshData: refreshData,

    checkFirstChunks: checkFirstChunks,
    checkLastChunks: checkLastChunks,
    checkChunkOrder: checkChunkOrder,
    checkChunkCount: checkChunkCount

  }

  return set;

}


/////// SET & CONFIG FUNCTIONS

function setManifestUrl (str) {

  let newManifestUrl = typeof str === 'string' && str != '' ? url.parse(str) : this.manifestUrl;
  this.manifestUrl = newManifestUrl;
  return this;

}

function setName (str) {

  this.name = typeof str === 'string' ? str : this.name;
  return this;

}

function setDebug (bool) {

  this.debug = typeof bool === 'boolean' ? bool : this.debug;
  return this;

}

function setErrorKeeping (bool) {
  this.keepErrors = typeof bool === 'boolean' ? bool : this.keepErrors;
  return this;
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////

function refreshData() {
  if ( this.manifestUrl == '' ) { return }

  return new Promise( (resolve) => {

    if ( !this.keepErrors ) { this.errors = []; }

    curl(this)
      .then( analyzeType )
      .then( setRenditions )
      .then( curlRenditions )
      .then( cleanRenditions )
      .then((obj) => {

        async.parallel([
          function (callback) { obj.checkFirstChunks(); callback(null); },
          function (callback) { obj.checkLastChunks(); callback(null); },
          function (callback) { obj.checkChunkOrder(); callback(null); },
          function (callback) { obj.checkChunkCount(); callback(null); }
        ], () => {

          resolve(obj);
        });

      });

  });

}

function curl (obj) {
  return new Promise( (resolve) => {

    axios.get(obj.manifestUrl.href)
      .then( (response) => {
        obj.data       = response.data;
        obj.status     = response.status;
        obj.statusText = response.statusText;
        return resolve(obj);
      })
      .catch( (error) => {
        if ( error.response ) {
          obj.data       = error.response.data;
          obj.status     = error.response.status;
          obj.statusText = error.response.statusText;
        } else if ( error.request ) {
          obj.data       = '';
          obj.status     = 0 ;
          obj.statusText = '';
        } else {
          obj.data       = '';
          obj.status     = 0 ;
          obj.statusText = error.message;
        }
        return resolve(obj);
      });

  });
}

function analyzeType(obj) {
  return new Promise( (resolve) => {

    if ( obj.isMaster === 'notset' ) {
      obj.isMaster = isMaster(obj.data) ? true : false;
    }

    return resolve(obj);

  });
}

function setRenditions(obj) {
  return new Promise( (resolve) => {

    if (obj.isMaster) {

      obj.renditions = obj.data.split('\n').filter(row => row[0] !== '#').filter(row => _.includes(row,'m3u8'));
      obj.renditions = obj.renditions.map((url, index) => {
        return new renditionObject(url, index);
      });

      return resolve(obj);

    } else {

      obj.renditions = [ new renditionObject(obj.manifestUrl.href, 0) ];
      return resolve(obj);

    }

  });
}

function curlRenditions(obj) {
  return new Promise ( (resolve) => {

    async.map(
      obj.renditions,
      function(rend, callback) {

        //rend.url, rend.chunks, rend.status, rend.data
        axios.get(rend.url)
        .then( (response) => {
          rend.data     = response.data;
          rend.status   = response.status;
          callback(null, rend);
        })
        .catch( (error) => {
          if ( error.response ) {
            rend.data       = error.response.data;
            rend.status     = error.response.status;
          } else if ( error.request ) {
            rend.data       = '';
            rend.status     = 0 ;
          } else {
            rend.data       = '';
            rend.status     = 0 ;
          }
          callback(null, rend);
        });

      },
      function() {

        return resolve(obj)  ;

    });

  });
}

function cleanRenditions(obj) {
  return new Promise( (resolve) => {

    //rend.url, rend.chunks, rend.status, rend.data
    obj.renditions.map((rend) => {
      rend.chunks = rend.data.split('\n').filter(row => row[0] !== '#' && row !== '');

      rend.count = rend.chunks.length;
      rend.first = 0;
      rend.last  = 0;

    });

    resolve(obj);

  });
}

///////////////////////////////////////////
///////////  CHECK FUNCTIONS //////////////

function checkFirstChunks (callback) {



  const regex = /\d*(?=.ts)/g;

  _.each(this.renditions, function(r) {
      r.first = (_.head(r.chunks).match(regex)[0]);
  });

  let test = !!this.renditions.reduce(function(a, b){ return (a.first == b.first) ? a : NaN; });
  this.checks.firstChunk = test ? true : false;
  !test && this.newError('At least 1 rendition has a different first chunk than all others.');

  if (callback) { return callback(null)}
  return this;

}

function checkLastChunks (callback) {

  const regex = /\d*(?=.ts)/g;

  _.each(this.renditions, function(r) {
      r.last = (_.last(r.chunks).match(regex)[0]);
  });

  let test = !!this.renditions.reduce(function(a, b){ return (a.last == b.last) ? a : NaN; });
  this.checks.lastChunk = test ? true : false;
  !test && this.newError('At least 1 rendition has a different last chunk than all others.');

  if (callback) { return callback(null)}
  return this;


}

function checkChunkOrder (callback) {

  const regex = /\d*(?=.ts)/g;
  let tests = [];

  this.checks.chunkOrder = true;

  _.each(this.renditions, function (r, index) {
      let sequence = r.chunks.map((c) => { return c.match(regex)[0]})
      const rollover = [1,-999,-1999,-2999,-3999];
      let test = !!sequence.reduce(function(a,b){ return (_.includes(rollover,(b - a)) === true) ? b : NaN; });
      tests.push({program: index, chunksInOrder: test});
  });

  for (let i = 0; i < tests.length; i++) {
    if (!tests[i].chunksInOrder) {
      this.checks.chunkOrder = false;
      this.newError('Program ['+tests[i].program+'] has an error in sequence.');
    }
  }

  if (callback) { return callback(null)}
  return this;

}

function checkChunkCount (callback) {

  let test = !!this.renditions.reduce(function(a, b){ return (a.count == b.count) ? a : NaN; });
  this.checks.chunkCount = test ? true : false;
  !test && this.newError('At least 1 rendition has a different amount of chunks than all others.');

  if (callback) { return callback(null)}
  return this;

}

/////////////////////////////////////
///////// HELPER FUNCTIONS //////////

function isMaster(data) {

  let rows = data.split('\n').filter(row => row[0] !== '#')
    .map((str) => {
      let blub = str.split('.');
      return blub[blub.length - 1];
    });

  return rows[0] === 'm3u8' ? true : false;

}
/*
function lastPartOfUrl (url) {

  return url.substr(url.lastIndexOf('/') + 1);

}*/

function renditionObject (url, index) {

  this.url = url;
  this.program = index;
  this.chunks = [];
  this.status = 0;
  this.data = '';
  this.count = 0;
  this.first = 0;
  this.last = 0;

}

function newError (msg) {
  this.errors.push( new errorObject(msg) );
}

function errorObject (msg) {
  this.msg = msg;
  this.timestamp = _.now();
}
