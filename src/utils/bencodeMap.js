const encodeString = value => `${value.length}:${value}`

const encodeNumber = value => `i${value}e`

const encodeValue = value => {
  if (typeof value === 'number') return encodeNumber(value)

  return encodeString(value)
}

export default map => {
  const dictionaryContents = [...map.entries()].reduce(
    (result, [key, value]) =>
      `${result}${encodeValue(key)}${encodeValue(value)}`,
    ''
  )

  return `d${dictionaryContents}e`
}
