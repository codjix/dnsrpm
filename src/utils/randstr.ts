const randstr = function (length: number, randomString = "") {
  randomString += Math.random().toString(20).slice(2, length);
  if (randomString.length > length) return randomString.slice(0, length);
  return randstr(length, randomString);
};

export default randstr;
