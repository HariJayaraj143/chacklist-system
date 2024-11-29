module.exports = [
  {
    id: 1,
    name: 'Valuation Fee Paid',
    evaluate: data => data.isValuationFeePaid === true,
  },
  {
    id: 2,
    name: 'UK Resident',
    evaluate: data => data.isUkResident === true,
  },
  {
    id: 3,
    name: 'Risk Rating Medium',
    evaluate: data => data.riskRating === 'Medium',
  },
  {
    id: 4,
    name: 'LTV Below 60%',
    evaluate: data => {
      const ltv = (data.loanRequired / data.purchasePrice) * 100
      return ltv < 60
    },
  },
]
