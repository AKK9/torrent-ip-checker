import bencodeMap from '../bencodeMap'

describe('bencodeMap', () => {
  it('should encode a map of strings', () => {
    const map = [['A', 'a'], ['B', 'b'], ['C', 'c']]
    expect(bencodeMap(new Map(map))).toBe('d1:A1:a1:B1:b1:C1:ce')
  })

  it('should encode a map of numbers', () => {
    const map = [[1, 1], [2, 2], [3, 3]]
    expect(bencodeMap(new Map(map))).toBe('di1ei1ei2ei2ei3ei3ee')
  })

  it('should encode a map of mixed values', () => {
    const map = [['A', 1], [1, 'a']]
    expect(bencodeMap(new Map(map))).toBe('d1:Ai1ei1e1:ae')
  })
})
