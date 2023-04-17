export const arrayToObjectId = (array: Record<string|number, any>[], idKey: string = 'id') =>
  array.reduce((target, item) => {
    target[item[idKey]] = item

    return target
  }, {})