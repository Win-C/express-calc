const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  let result = [];

  for (let i = 0; i < strNums.length; i++){
    const val = Number(strNums[i]);

    if (Number.isNaN(val)){
      throw new BadRequestError(
        `Value '${strNums[i]}' at ${i} is not valid.`
      );
    }

    result.push(val);
  }

  return result;
}


module.exports = { convertStrNums };