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

d3.csv('./dataset/cities-sm.csv').then(function (data) {
  console.log(data[0]);

  data.forEach((d) => {
    d.population = +d.population;
    d['land area'] = +d['land area'];
  });

  let filtered_data = data.filter(function (d) {
    return d.state === 'WA';
  });

  console.log(filtered_data);

  let group_data = d3.group(data, function (d) {
    return d.city;
  });

  console.log(group_data);

  console.log(group_data.get('boston'));
});
