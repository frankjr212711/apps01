const cities = [];

function getCities() {
  fetch(`http://localhost:9090/cities`)
    .then((res) => res.json())
    .then((data) => cities.push(data))
    return cities
}
console.log(getCities());

console.log(cities);

// const contries = cities.reduce((arr, city) => {
//   if (!arr.map((el) => el.country).includes(city.country)) {
//     return [...arr, { country: city.country, emoji: city.emoji }];
//   } else return arr;
// }, []);
