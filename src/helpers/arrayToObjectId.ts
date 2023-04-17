export const arrayToObjectId = (array: any[], idKey: string = 'id') =>
  array.reduce((target, item) => {
    target[item[idKey]] = item

    return target
  }, {})