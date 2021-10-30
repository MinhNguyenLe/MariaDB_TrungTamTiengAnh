function compareTimeTable(a, b) {
  return a.begin - b.begin;
}

const checkValPushArr = (arr) => {
  /**
   * rule :  push begin != begin begin && push begin > begin begin && push end < after begin
   */
  const sortArr = [...arr].sort(compareTimeTable);

  const result = [];
  result.push(sortArr[0]);

  for (let i = 1; i < sortArr.length; i++) {
    /*
     *push begin != begin begin
     */
    if (sortArr[i]['begin'] !== result[result.length - 1]['begin']) {
      /*
       *push end < after begin
       */
      if (sortArr[i]['begin'] >= result[result.length - 1]['end']) {
        result.push(sortArr[i]);
      }
    }
  }

  return result;
};

const check = (befArr, aftArr) => {
  const result = [];

  /**
   * success if push
   */
  const acceptArr = checkValPushArr(aftArr);

  /**
   * if array parent empty -> accept all array acceptArr
   */
  if (befArr.length === 0) {
    const result = [];
    acceptArr.forEach((element) => {
      result.push(element);
    });

    return result;
  }

  for (const value of acceptArr) {
    for (const [index, e] of befArr.entries()) {
      /**
       * array parent just have once element
       */
      if (befArr.length === 1) {
        if (value['begin'] >= e['end'] || value['end'] <= e['begin']) {
          result.push(value);
        }
      } else {
        /**
         * the first value of array parent
         */
        if (index === 0) {
          if (value['end'] <= e['begin']) {
            result.push(value);
          }
        } else if (index === befArr.length - 1) {
          /**
           * the last value of list array parent
           */
          if (value['begin'] >= e['end']) {
            result.push(value);
          }
        } else {
          /**
           * push begin > begin begin && push end < after begin
           */
          if (value.begin >= e.end && value.end <= befArr[index + 1]['begin']) {
            result.push(value);
          }
        }
      }
    }
  }

  return result;
};

export const useCheckTimeTableRoom = () => {
  return { check, checkValPushArr };
};
