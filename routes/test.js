const numbers = [1, 2, 3, 4, 5, 2, 4];

console.log(numbers.filter((_, i, self) => i === self.indexOf(i)))