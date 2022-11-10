class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((e) => {
      e.refresh(data);
    });
  }
}

class Observer {
  constructor(fn) {
    this.fn = fn;
  }

  refresh(data) {
    this.fn(data);
  }
}

// pointStyle:
// 'circle'
// 'cross'
// 'crossRot'
// 'dash'
// 'line'
// 'rect'
// 'rectRounded'
// 'rectRot'
// 'star'
// 'triangle'

const ctx = document.getElementById("myChart").getContext("2d");
const labels = ['125', '250', '500', '1000', '2000', '3000', '4000', '6000', '8000'];
const titles = ['V.A.', 'V.O.', 'Enmasc. aérea', 'Enmasc. ósea'];
const data = {
  labels: labels,
  datasets: []
};

let myChart = new Chart(ctx, {
  type: 'line',
  data: data,
});

function drawChart () {
  
  const form = document.getElementById('rightEarForm');
  //  Get all form elements
  const formElements = Array.from(form.elements);
  const formElementsValue = formElements.map(el => el.value || null);

  const inputMatrix = new Array(4).fill([]).map((el,index) => {
    return new Array(9).fill(null).map((elem,i)=>{
        return formElementsValue[i+9*index];
    })
  })
  
  myChart.destroy();
  
  let newData = {
    labels: labels,
    datasets: [{
      label: 'Target',
      data: [25,25,25,25,25,25,25,25,25],
      fill: false,
      borderColor: 'rgb(0, 0, 0)',
      radius: 1,
      pointStyle: 'circle',
      pointRotation: 125,
    },{
      label: 'V.A.',
      data: inputMatrix[0],
      fill: false,
      borderColor: 'rgb(0, 40, 204)',
      radius: 8,
      pointStyle: 'circle',
      pointRotation: 125,
      borderWidth: 1,
      borderDash: [10,5]
    },{
      label: 'V.O.',
      data: inputMatrix[1],
      fill: false,
      borderColor: 'rgb(0, 40, 204)',
      radius: 8,
      pointStyle: 'dash',
      pointRotation: 125,
      borderWidth: 1
    },{
      label: 'Enmasc. aérea',
      data: inputMatrix[2],
      fill: false,
      borderColor: 'rgb(0, 40, 204)',
      radius: 8,
      pointStyle: 'triangle',
      pointRotation: 125,
      borderWidth: 1,
      borderDash: [10,5]
    },{
      label: 'Enmasc. ósea',
      data: inputMatrix[3],
      fill: false,
      borderColor: 'rgb(0, 40, 204)',
      radius: 8,
      pointStyle: 'star',
      pointRotation: 125,
      borderWidth: 1
    }]
  };

  myChart = new Chart(ctx, {
    type: 'line',
    data: newData,
    options: {
      scales: {
        y: {
          reverse: true,
          suggestedMin: -10, 
        },
      }
    }
  });

}

const s = new Subject();
const o1= new Observer((d)=>drawChart());

function draw() {
  s.notify('Notify');
}

s.subscribe(o1);