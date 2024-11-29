const express = require('express')
const {fetchApplicationData} = require('./helpers/api')
const {evaluateChecklist} = require('./helpers/evaluate')
const rules = require('./config/rules')

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', async (req, res) => {
  try {
    const data = await fetchApplicationData('67339ae56d5231c1a2c63639')
    const results = evaluateChecklist(data, rules)
    res.render('dashboard', {results})
  } catch (error) {
    res.status(500).send('Error loading the dashboard.')
  }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
