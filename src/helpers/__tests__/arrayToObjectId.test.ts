import { arrayToObjectId } from '../arrayToObjectId'

describe('arrayToObjectId', () => {
  const array = [
    { id: 1, test: 'test1' },
    { id: 2, test: 'test2' },
  ]

  it('should transform array to object', () => {
    expect(arrayToObjectId(array)).toMatchObject({
      [array[0]['id']]: { ...array[0] },
      [array[1]['id']]: { ...array[1] },
    })
  })

  it('should transform array to object with given key', () => {
    expect(arrayToObjectId(array, 'test')).toMatchObject({
      [array[0]['test']]: { ...array[0] },
      [array[1]['test']]: { ...array[1] },
    })
  })
})
