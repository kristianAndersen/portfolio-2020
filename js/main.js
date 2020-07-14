

let cw = document.querySelector('.content-wrap');
let modal = document.querySelector('.modal');
let modalstate = 0;
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


window.addEventListener('resize', () => {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function showtime() {

  function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {

      if (rawFile.readyState === 4 && rawFile.status == "200") {

        callback(rawFile.responseText);

      }

    }
    rawFile.send(null);
  }


  readTextFile("../projects.json", function (text) {
    var data = JSON.parse(text);
   // console.log(data.project)
    for (i = 0; i < data.project.length; i++) {
     // console.log(data.project[i])

      let h2 = data.project[i].h2;
      let h3 = data.project[i].h3;
      let thumb = data.project[i].thumb;
      let p1 = data.project[i].p1;
      let p2 = data.project[i].p2;
      let p3 = data.project[i].p3;

      let projects = `<div class="brick">
        <a href="#"> 
        <img class="brick-img center" id="${i}"src=" ${thumb}" alt="hero img">
          <div class="txtwrap">
              <h3>${h3}</h3>
              <p>${p1}<br>${p2 + p3}</p>
          </div>
        </a>
      </div>`;

  

      cw.innerHTML += projects;





    }
    document.querySelector('body').addEventListener('click', function(e) {
      // event.target is the clicked item
      if (!e.target) { return; }
    
      // Check if the event.target is a remove button
      if (e.target.matches('.brick')) {
        
        if( modalstate == 0 ){
          modalstate = 1;
           gsap.to(".modal", {duration: 0.8, xPercent: '-100',ease: "elastic.out(1, 2)"});
        }else{
          modalstate = 0;
          gsap.to(".modal", {duration: 0.8, xPercent: '100',ease: "elastic.In(1, 2)"});
        }

      }
    });
  });






}




if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showtime);
} else {

  showtime();

}