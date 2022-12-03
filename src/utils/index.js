const sortArrayOfObjets = (array, parameterToOrder) => {
  return array.sort((a, b) => {
    if (a[parameterToOrder] === null) return 1;
    else if (b[parameterToOrder] === null) return -1;
    else if (a[parameterToOrder] === b[parameterToOrder]) return 0;
    return (a[parameterToOrder] > b[parameterToOrder] ? 1 : -1);
  })
};

const sortArray = (arr) => {
  return arr.sort((a, b) => {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  });
}


module.exports = { sortArrayOfObjets, sortArray };
