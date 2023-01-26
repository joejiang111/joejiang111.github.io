function parseLog(d) {
  console.log(d);
}

d3.text('./dataset/file.txt').then(parseLog);

d3.json('./dataset/country.json').then(parseLog);
d3.csv('./dataset/cities-sm.csv').then(parseLog);

d3.csv('./dataset/cities-sm.csv', parseToNum).then(parseLog);
function parseToNum(d) {
  //return a structure of objects
  //property: value parts
  return {
    city: d.city,
    state: d.state,
    population: +d.population,
    'land area': +d['land area'],
  };
}
