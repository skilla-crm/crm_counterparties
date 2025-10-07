const arrayToString = (arr) => {
  if (!Array.isArray(arr)) return "";
  return arr.join(",");
};

export default arrayToString;
