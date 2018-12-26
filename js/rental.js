function updatePurchasePrice () {
  let purchasePriceEl = document.getElementById("purchase-price");
  purchasePriceEl.value = formatInput(purchasePriceEl.value);
  updateDownPaymentPercent();
  updateClosingCostsPercent();
  updateRenovationCostsPercent();

  if (purchasePriceEl.value === "") {
    document.getElementById("down-payment").disabled = true;
    document.getElementById("down-payment-percent").disabled = true;
    document.getElementById("closing-costs").disabled = true;
    document.getElementById("closing-costs-percent").disabled = true;
    document.getElementById("renovation-costs").disabled = true;
    document.getElementById("renovation-costs-percent").disabled = true;
  } else {
    document.getElementById("down-payment").disabled = false;
    document.getElementById("down-payment-percent").disabled = false;
    document.getElementById("closing-costs").disabled = false;
    document.getElementById("closing-costs-percent").disabled = false;
    document.getElementById("renovation-costs").disabled = false;
    document.getElementById("renovation-costs-percent").disabled = false;
  }
}

function updateDownPayment () {
  let downPaymentEl = document.getElementById("down-payment");
  let downPayment = dollarStrToNumber(downPaymentEl.value);
  let purchasePrice = dollarStrToNumber(document.getElementById("purchase-price").value);
  let percentEl = document.getElementById("down-payment-percent");

  percentEl.value = Math.round(downPayment/purchasePrice * 100 * 100) / 100;
  downPaymentEl.value = formatInput(downPayment);
}

function updateDownPaymentPercent () {
  let percent = Number(document.getElementById("down-payment-percent").value / 100);
  let purchasePrice = dollarStrToNumber(document.getElementById("purchase-price").value);
  let downPayment = Math.round(percent * purchasePrice);

  let downPaymentEl = document.getElementById("down-payment");
  downPaymentEl.value = formatInput(downPayment);
}

function updateClosingCosts () {
  let closingCostsEl = document.getElementById("closing-costs");
  let closingCosts = dollarStrToNumber(closingCostsEl.value);
  let purchasePrice = dollarStrToNumber(document.getElementById("purchase-price").value);
  let percentEl = document.getElementById("closing-costs-percent");

  percentEl.value = Math.round(closingCosts/purchasePrice * 100 * 100) / 100;
  closingCostsEl.value = formatInput(closingCosts);
}

function updateClosingCostsPercent () {
  let percent = Number(document.getElementById("closing-costs-percent").value / 100);
  let purchasePrice = dollarStrToNumber(document.getElementById("purchase-price").value);
  let closingCosts = Math.round(percent * purchasePrice);

  let closingCostsEl = document.getElementById("closing-costs");
  closingCostsEl.value = formatInput(closingCosts);
}

function updateRenovationCosts () {
  let renovationCostsEl = document.getElementById("renovation-costs");
  let renovationCosts = dollarStrToNumber(renovationCostsEl.value);
  let purchasePrice = dollarStrToNumber(document.getElementById("purchase-price").value);
  let percentEl = document.getElementById("renovation-costs-percent");

  percentEl.value = Math.round(renovationCosts/purchasePrice * 100 * 100) / 100;
  renovationCostsEl.value = formatInput(renovationCosts);
}

function updateRenovationCostsPercent () {
  let percent = Number(document.getElementById("renovation-costs-percent").value / 100);
  let purchasePrice = dollarStrToNumber(document.getElementById("purchase-price").value);
  let renovationCosts = Math.round(percent * purchasePrice);

  let renovationCostsEl = document.getElementById("renovation-costs");
  renovationCostsEl.value = formatInput(renovationCosts);
}

function formatInput (inputStr) {
  let numberStr = inputStr.toString().replace(/\D/g,'');  //ensure string and remove decimal and all non-digits
  if (numberStr === "") {return "";}

  let commaStr = "";
  let numberCount = 1;
  for (var i = numberStr.length - 1; i > 0; i--) {
    commaStr = numberStr[i] + commaStr;
    if (numberCount % 3 === 0) {commaStr = "," + commaStr;}
    numberCount += 1;
  }
  commaStr = numberStr[0] + commaStr;
  return commaStr;
}

function formatOutput (number) {
  let numberStr = Math.abs(number).toString();
  let commaStr = "";
  let numberCount = 1;
  for (var i = numberStr.length - 1; i > 0; i--) {
    commaStr = numberStr[i] + commaStr;
    if (numberCount % 3 === 0) {commaStr = "," + commaStr;}
    numberCount += 1;
  }
  commaStr = numberStr[0] + commaStr;
  return (number < 0 ? "( " + commaStr + " )" : commaStr)
}

function dollarStrToNumber (str) {
  return Number(str.split(",").join(""));
}

function calculate () {
  let purchasePrice = dollarStrToNumber(document.getElementById("purchase-price").value);
  let downPayment = dollarStrToNumber(document.getElementById("down-payment").value);
  let closingCosts = dollarStrToNumber(document.getElementById("closing-costs").value);
  let renovationCosts = dollarStrToNumber(document.getElementById("renovation-costs").value);

  let interestRate = Number(document.getElementById("interest-rate").value);
  let loanLength = Number(document.getElementById("loan-length").value);

  let insurancePayment = Number(document.getElementById("insurance-payment").value);
  let propertyTaxes = Number(document.getElementById("property-taxes").value);
  let maintenanceCosts = Number(document.getElementById("maintenance-costs").value);
  let managementFees = Number(document.getElementById("management-fees").value);
  let pmiPayment = Number(document.getElementById("pmi-payment").value);
  let hoaFees = Number(document.getElementById("hoa-fees").value);

  let rentalIncome = Number(document.getElementById("rental-income").value);
  let otherIncome = Number(document.getElementById("other-income").value);

  document.getElementById("purchase-price-out").textContent = "$ " + (formatOutput(purchasePrice) || "0");
  document.getElementById("down-payment-out").textContent = "$ " + (formatOutput(downPayment) || "0");
  document.getElementById("closing-costs-out").textContent = "$ " + (formatOutput(closingCosts) || "0");
  document.getElementById("renovation-costs-out").textContent = "$ " + (formatOutput(renovationCosts) || "0");

  let totalInitialInvestment = downPayment + closingCosts + renovationCosts;
  document.getElementById("total-initial-investment-out").textContent = "$ " + (formatOutput(totalInitialInvestment) || "0");

  let principleAndInterest = calculateMortgagePayment(purchasePrice - downPayment, interestRate/(12*100), loanLength * 12);
  document.getElementById("p-and-i-out").textContent = "$ " + (formatOutput(principleAndInterest) || "0");
  document.getElementById("insurance-payment-out").textContent = "$ " + (formatOutput(insurancePayment) || "0");
  document.getElementById("property-taxes-out").textContent = "$ " + (formatOutput(propertyTaxes) || "0");
  document.getElementById("maintenance-costs-out").textContent = "$ " + (formatOutput(maintenanceCosts) || "0");
  document.getElementById("management-fees-out").textContent = "$ " + (formatOutput(managementFees) || "0");
  document.getElementById("pmi-payment-out").textContent = "$ " + (formatOutput(pmiPayment) || "0");
  document.getElementById("hoa-fees-out").textContent = "$ " + (formatOutput(hoaFees) || "0");

  let totalExpenses = (principleAndInterest + insurancePayment + propertyTaxes + maintenanceCosts +
    managementFees + pmiPayment + hoaFees);
  document.getElementById("total-expenses-out").textContent = "$ " + (formatOutput(totalExpenses) || "0");

  let chartData = [principleAndInterest, insurancePayment, propertyTaxes, maintenanceCosts, managementFees, pmiPayment, hoaFees];
  updateChart(chartData);

  document.getElementById("rental-income-out").textContent = "$ " + (formatOutput(rentalIncome) || "0");
  document.getElementById("other-income-out").textContent= "$ " + (formatOutput(otherIncome) || "0");

  let grossIncome = rentalIncome + otherIncome;
  let netIncome = grossIncome - totalExpenses;
  document.getElementById("gross-income-out").textContent = "$ " + (formatOutput(grossIncome) || "0");
  document.getElementById("net-income-out").textContent = "$ " + (formatOutput(netIncome) || "0");

  let roi = netIncome * 12 / totalInitialInvestment * 100;
  document.getElementById("roi-out").textContent = Math.round(roi * 100)/100 + " %";
}

function calculateMortgagePayment (P, r, n) { // P in dollars, r in decimal & monthly, n in months
  let payment =  P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  return Math.round(payment);
}

let chart;
function createChart () {
  let ctx = document.getElementById("chartjs");
  chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
            data: [1, 1, 1, 1, 1, 1, 1],
            backgroundColor: [
              'rgb(255,99,132)',
              'rgb(102, 255, 102)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(119,136,153)',
              'rgb(127,255,212)',
              'rgb(255, 240, 245)'
            ]
        }],
        labels: [
            'P&I',
            'Insurance',
            'Property Tax',
            'Maintenance',
            'Management',
            'PMI',
            'HOA'
        ]
      }
  });
}

function updateChart (data) {
  chart.data.datasets.forEach( dataset => { dataset.data = data; })
  chart.update();
}

function useExample () {
  document.getElementById("purchase-price").value = "175,000";
  document.getElementById("down-payment-percent").value = "20";
  document.getElementById("closing-costs-percent").value = "5";
  document.getElementById("renovation-costs-percent").value = "7.5";
  updatePurchasePrice();

  document.getElementById("interest-rate").value = "5.25"
  document.getElementById("insurance-payment").value = "75"
  document.getElementById("property-taxes").value = "125"
  document.getElementById("maintenance-costs").value = "50"
  document.getElementById("management-fees").value = "80"
  document.getElementById("rental-income").value = "1750"

  calculate();
}
