#!/usr/local/bin/node

if(process.argv.length < 2){
  process.exit(-1);
}

var IPADDR = process.argv[2];

var whois = require('node-whois');
var isc = require('ip-subnet-calculator');

whois.lookup(IPADDR, function(err, data){
  if(!data){
    console.log(IPADDR + '/32');
    return;
  }
  var lines = data.split("\n");
  for(n in lines){
    if(lines[n].match(/^inetnum|NetRange|IP-Network-Block/)){
      var out = lines[n].match(/([0-9\.]+)/g);
      var subnets = isc.calculate(out[0], out[1]);
      for(s in subnets){
        console.log(subnets[s].ipLowStr + '/' + subnets[s].prefixSize);
      }
    }
  }
});
