const fileName = "VX7WzfvhjQGTVA1N";

function r2d (r) {
  return r * (180/Math.PI);
}
function d2r (d) {
  return d * (Math.PI/180);
}
function objectArray (all, name) {
  return all.filter(item => item.name== name )
}
const timelineObject = {
      repeat: -1,
      defaults: {
        ease: 'elastic(0.5, 0.43)',
        duration: 1
      }
    }
import { Application } from "https://esm.sh/@splinetool/runtime";
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
let allSwatches = document.querySelectorAll('.swatch');
let allWatches, swatchId = 2, currWatch, currSwatch, oldSwatch, backdrop;

app.load(`https://prod.spline.design/${fileName}/scene.splinecode`)
.then(() => {
  
  let allObjects = app.getAllObjects();    
  
  allWatches = objectArray(allObjects, 'watchObj');
  backdrop = app.findObjectByName('backdrop');
  currWatch = allWatches[swatchId];
  

  allSwatches.forEach((c, i) => {

      allWatches[i].visible = false;
      
      c.addEventListener('click', (function () {
        swatchId = i;
        allWatches.forEach((c, i) => {
          c.visible = false;
        })
        currWatch = allWatches[i];
        currWatch.visible = true;
        setSwatchSelected();
        if(oldSwatch == currSwatch) return;
        gsap.to(currWatch.rotation, {
          x: d2r(-2.6),
          ease: 'wiggle({type:easeOut, wiggles: 8})',
          duration: 2
        })
      }));
    
    });
  
  const setSwatchSelected = () => {
    
  
    oldSwatch = !currSwatch ? allSwatches[0] : currSwatch;
    currSwatch = allSwatches[swatchId];    
    oldSwatch.classList.remove("selected");
    currSwatch.classList.add("selected");
    
    if(oldSwatch == currSwatch) return;
     gsap.to(currSwatch, {
      duration: 0.12,
      scale:0.86,
      repeat: 1,
      yoyoEase: 'sine'
    }) 
 /* gsap.to(allSwatches, {
    scale: gsap.utils.distribute({
      duration: 0.12,
      base: 0.50,
      amount: -0.65,
      from: swatchId      
    }),
  });      
    */
  }

  let tl = gsap.timeline({
    onStart: function () { currWatch.visible = true; },
    onComplete: setSwatchSelected
  });  
  tl.add('watchIn')
    .from(currWatch.position, {
      z: -2000,
      duration: 2,
      ease: 'power4'
    }, 'watchIn')
    .from(currWatch.rotation, {
      x: d2r(-540),
      //y: d2r(-360),
      duration: 2,
      ease: 'power4'
    }, 'watchIn')
  .add('swatchesIn', '-=1')
    .fromTo('.swatch', {    
     opacity: 0,
      y: 0,
      scale: 0,
    },{
      scale: 1,
      y: 0,
      opacity: 1,
      ease: 'elastic(0.76, 0.346)',
      stagger: {
        each: 0.06
      },
      duration: 1.85
    }, 'swatchesIn')

	});
  
  var dados = [];

  function adicionarValor() {
    var valor = parseFloat(document.getElementById('dataInput').value);
    if (isNaN(valor)) {
      alert('Por favor, insira um valor numérico válido.');
      return;
    }
    dados.push(valor);
    atualizarGraficoPizza();
    document.getElementById('dataInput').value = '';
  }

  function atualizarGraficoPizza() {
    var pieChart = document.getElementById('pieChart');
    pieChart.innerHTML = '';
    var somaTotal = dados.reduce((acc, cur) => acc + cur, 0);

    var startAngle = 0;
    dados.forEach(valor => {
      var sliceAngle = (valor / somaTotal) * 360;
      var sliceColor = getRandomColor();
      var endAngle = startAngle + sliceAngle;

      var pathData = describeArc(150, 150, 100, startAngle, endAngle);
      var pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('d', pathData);
      pathElement.setAttribute('fill', sliceColor);
      pieChart.appendChild(pathElement);

      startAngle = endAngle;
    });
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    var startRadians = (startAngle - 90) * Math.PI / 180;
    var endRadians = (endAngle - 90) * Math.PI / 180;

    var startX = x + radius * Math.cos(startRadians);
    var startY = y + radius * Math.sin(startRadians);

    var endX = x + radius * Math.cos(endRadians);
    var endY = y + radius * Math.sin(endRadians);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var arcData = [
      "M", startX, startY,
      "A", radius, radius, 0, largeArcFlag, 0, endX, endY,
      "L", x, y,
      "Z"
    ].join(" ");

    return arcData;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  atualizarGraficoPizza();