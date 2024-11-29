const evaluateChecklist = (data, rules) => {
  return rules.map(rule => ({
    id: rule.id,
    name: rule.name,
    status: rule.evaluate(data) ? 'Passed' : 'Failed',
  }))
}

module.exports = {evaluateChecklist}
