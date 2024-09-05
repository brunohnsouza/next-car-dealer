export function getRangeYears(startYear: number) {
  const currentYear = new Date().getFullYear()
  const years = []

  if (typeof startYear !== 'number') {
    throw new Error('startYear must be numbers.')
  }

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year)
  }

  return years
}
