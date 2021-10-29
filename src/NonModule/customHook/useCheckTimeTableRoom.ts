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

const formatTimeTable = (arr) => {
  /*
   *arr : ["12.0013.00"]
   */
  const formatArr = [];

  [...arr].forEach((e) => {
    formatArr.push({
      begin: parseFloat(e.slice(0, 5)),
      end: parseFloat(e.slice(5, 10)),
    });
  });

  return formatArr;
};

const addZero = (str) => {
  /**
   * 2
   */
  if (str.length === 1) return '0' + str + '.00';

  /**
   * 2.5
   */
  if (str.length === 3) return '0' + str + '0';

  /**
   * 12.5
   */
  if (str.length === 4) return str + '0';

  /**
   *12
   */
  if (str.length === 2) return str + '.00';
};

const revertOldFormat = (obj) => {
  return addZero(obj.begin.toString()) + addZero(obj.end.toString());
};

const check = (befArr, aftArr) => {
  const fillArr = [],
    result = [];
  for (const value of aftArr) {
    if (value.length === 10) fillArr.push(value);
  }

  /**
   * success if push
   */
  const acceptArr = checkValPushArr(formatTimeTable(fillArr));

  /**
   * if array parent empty -> accept all array acceptArr
   */
  if (befArr.length === 0) {
    const result = [];
    acceptArr.forEach((element) => {
      result.push(revertOldFormat(element));
    });

    return result;
  }

  const formatBefArr = formatTimeTable(befArr);

  for (const value of acceptArr) {
    for (const [index, e] of formatBefArr.entries()) {
      /**
       * array parent just have once element
       */
      if (formatBefArr.length === 1) {
        if (value['begin'] >= e['end'] || value['end'] <= e['begin']) {
          result.push(revertOldFormat(value));
        }
      } else {
        /**
         * the first value of array parent
         */
        if (index === 0) {
          if (value['end'] <= e['begin']) {
            result.push(revertOldFormat(value));
          }
        } else if (index === formatBefArr.length - 1) {
          /**
           * the last value of list array parent
           */
          if (value['begin'] >= e['end']) {
            result.push(revertOldFormat(value));
          }
        } else {
          /**
           * push begin > begin begin && push end < after begin
           */
          if (
            value.begin >= e.end &&
            value.end <= formatBefArr[index + 1]['begin']
          ) {
            result.push(value);
          }
        }
      }
    }
  }

  return result;
};

const arrangeTimeTable = (arr) => {
  /**
   * format -> {begin, end} -> arrange -> string
   */
  const format = checkValPushArr(formatTimeTable(arr));
  const result = [];
  format.forEach((element) => {
    result.push(revertOldFormat(element));
  });

  return result;
};

export const useCheckTimeTableRoom = () => {
  return { check, arrangeTimeTable };
};
