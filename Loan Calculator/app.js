// sapp : loan calculator
// author : khoirush akbar

document.querySelector('#loan-form').addEventListener('submit', e => {

  // hide results  
  document.querySelector('#results').style.display = 'none'

  // show loader
  document.querySelector('#loading').style.display = 'block'

  setTimeout(() => {
    calcResults()
  }, 1000)
  e.preventDefault()
})

document.querySelector('#amount').addEventListener('keyup', () => {
  val = document.querySelector('#amount').value
  val = val.replace(/,/g, '')
  val = Number(val).toLocaleString()
  document.querySelector('#amount').value = val
})

function calcResults() {
  console.log('calculating..')
  let amount = document.querySelector('#amount')
  amount.value = amount.value.replace(/,/g, '')
  console.log(amount.value)
  const interest = document.querySelector('#interest')
  const years = document.querySelector('#years')
  const monthlyPayment = document.querySelector('#monthly-payment')
  const totalPayment = document.querySelector('#total-payment')
  const totalInterest = document.querySelector('#total-interest')
  const principal = parseFloat(amount.value)
  const calcInterest = parseFloat(interest.value) / 100 / 12

  const calcPayments = parseFloat(years.value) * 12

  // compute monthly payment
  const x = Math.pow(1 + calcInterest, calcPayments)
  const monthly = (principal * x * calcInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toLocaleString()
    totalPayment.value = (monthly * calcPayments).toLocaleString()
    totalInterest.value = ((monthly * calcPayments) - principal).toLocaleString()
    amount.value = Number(amount.value).toLocaleString()
    document.querySelector('#loading').style.display = 'none'
    document.querySelector('#results').style.display = 'block'
  } else {
    showError('Please check your numbers')
  }

}

function showError(errorMsg) {
  // hide error and loader
  document.querySelector('#results').style.display = 'none'
  document.querySelector('#loading').style.display = 'none'
  //create a div
  const errorDiv = document.createElement('div')

  // get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  //add class
  errorDiv.className = 'alert alert-danger'

  // create text node and appeend to div
  errorDiv.appendChild(document.createTextNode(errorMsg))

  // insert error above heading
  card.insertBefore(errorDiv, heading)

  // clear error after 3 seconds
  setTimeout(clearError, 3000)
}

function clearError() {
  document.querySelector('.alert').remove()
}

