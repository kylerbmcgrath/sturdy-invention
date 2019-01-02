let years = [];
let amounts = [];
let dataObj = {};
for (let i = 0; i <= 15; i++) {dataObj[i] = 0;}

function addToData (year, amount) {
  dataObj[year] = amount;
  maxYear = Math.max(...Object.keys(dataObj))

  years = [];
  for (let i = 0; i <= maxYear; i++) {years.push(i);}

  amounts = years.map(yr => dataObj[yr]);
}

function addAmount () {
  let year = document.getElementById("present-worth-year").value;
  document.getElementById('present-worth-year').value = "";

  let amount = Number(document.getElementById("present-worth-amount").value);
  document.getElementById("present-worth-amount").value = "";

  addToData(year, amount);

  chart.data.labels = years;
  chart.data.datasets[0].data = amounts;
  chart.update();
  calculatePresentWorth();
}

function calculatePresentWorth () {
  let interest = Number(document.getElementById("interest-rate").value);
  let presentWorth = 0;

  years.forEach( yr => presentWorth += dataObj[yr] / Math.pow(1 + interest/100, yr) );
  presentWorth = Math.round(presentWorth * 100)/ 100;

  let displayText = presentWorth < 0 ? "$ ( " + -1*presentWorth + " )" : "$ " + presentWorth;
  document.getElementById("present-worth").textContent = displayText;
}

function useExample () {
  document.getElementById("interest-rate").value = 8.5;
  dataObj = {0: -1000, 1:500, 2: 450, 3: 400, 4: 350, 5: 300, 6: 250, 7: 200, 8: 150, 9: 100, 10: 50,
    11: 0, 12: 0, 13: 0, 14: 0, 15:0};
  years = Object.keys(dataObj);
  amounts = years.map(yr => dataObj[yr]);

  chart.data.labels = years;
  chart.data.datasets[0].data = amounts;
  chart.update();
  calculatePresentWorth();
}
