const RandomStr = function (length: number, randomString = "") {
  randomString += Math.random().toString(20).slice(2, length);
  if (randomString.length > length) return randomString.slice(0, length);
  return RandomStr(length, randomString);
};

export default RandomStr;
