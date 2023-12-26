var Temperature = [];
var readingSize = [2, 3];
var reading = [12, 13, 14, 15];
var k = 0;
var m = 2;
const SerialValues=[];
const DateValues=[];
const TimeValues=[];
const TempValues=[];
let MergeValues=[];
let allvalues=[];

let startDate = sessionStorage.getItem("startdate");
let vehicleNumber = sessionStorage.getItem("vehicle");
let fleetId = sessionStorage.getItem("fleet");
function GetData() {
  let start = sessionStorage.getItem("starttrip");
  let end = sessionStorage.getItem("endtrip");  
  let startlocation = sessionStorage.getItem("startlocation");  

  let enddate = sessionStorage.getItem("endDate");
  let dest = sessionStorage.getItem("dest");
  let [year1, month1, day1] = startDate.split("-");
  let [year2, month2, day2] = enddate.split("-");
  let currDate = document.getElementById("currentDate");
  let vehNo = document.getElementById("vehNo");
  vehNo.innerText = vehicleNumber;
  currDate.innerText = DateFormat(startDate);
  let id = document.getElementById("fleetid");
  id.innerText = fleetId;
  let endtrip = document.getElementById("endtrip");
  endtrip.innerHTML = dest;
  let startlocat=document.getElementById("startlocation");
  startlocat.innerHTML=startlocation;
  function DateFormat(startDate) {
    let [year, month, datdd] = startDate.split("-");
    return datdd + "/" + month + "/" + year;
  }
  let [hours, minutes] = start.split(":");
  let [hours1, minutes1] = end.split(":");
  var date1 = new Date(year1, month1 - 1, day1, +hours, +minutes);
  var date2 = new Date(year2, month2 - 1, day2, +hours1, +minutes1);
  let diff = 15;
  let Timearr = [];
  let b = new Date(date1.setMinutes(date1.getMinutes()));
  Timearr.push(b);
  let kl = new Date(date1.setMinutes(date1.getMinutes() + diff));
  Timearr.push(kl);
  while (true) {
    if (date2.getTime() > date1.getTime()) {
      date1 = new Date(date1.setMinutes(date1.getMinutes() + diff));
      let a = date1;
      Timearr.push(a);
    } else {
      break;
    }
  }
  var size = Timearr.length;
  var dateyr = [];
  getTemperature(size);
  let datecount = 0;
  PrintDateTime(Timearr);
  PrintSerialNumner(Timearr);
  let a = 0;
  PrintTemperature(Timearr);
  var dateyear = [];
  Timearr.map((obj) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    let dateString = obj.toLocaleDateString(undefined, options);
    dateyear.push(dateString);
  });
}
function PrintTemperature(Timearr){
  let a = 0;
  for (let b of Temperature) {
    let tempread = document.getElementById("templist");
    let li = document.createElement("li");
    a = a + 1;
    if (a < Timearr.length) {
      li.innerText = b;
      tempread.append(li);
      TempValues.push(b);
    }
    
  }
  callback();
}
const varies=[]
function callback(){
  for(let a of SerialValues){
    varies.push(a);
  }
  for(let c of DateValues){
    varies.push(c);
  }
  for(let d of TimeValues){
    varies.push(d)
  }
  for(let k of TempValues){
    varies.push(k)
  }
  for(let i = 0 ; i < SerialValues.length;i++){
    let obj={
      "Serial":varies[i],
      "date":varies[SerialValues.length+i],
      "Time":varies[SerialValues.length*2+i],
      "Temp":varies[SerialValues.length*3+i]
    }
    MergeValues.push(obj);
  }
  PrintValues(MergeValues);
}
function PrintValues(MergeValues){
  let a  = document.getElementById("testDatas");
  //page size 34, 47
  for (let n of MergeValues){
    if(n.Serial==35 || n.Serial==82 || n.Serial==129 || n.Serial==176 || n.Serial==223 || n.Serial==270 || n.Serial==317||n.Serial==364 || n.Serial==411 || n.Serial==458 || n.Serial==505 ||n.Serial==552||n.Serial==599){
      let b = document.createElement("div");  
      b.classList.add('html2pdf__page-break');
      a.append(b);
      console.log("True");
    }
    let div = document.createElement("div");  
    div.classList.add('newClass');
    let s = document.createElement("span");  
    s.classList.add('serialwidth');
    s.innerText=n.Serial;
    let d = document.createElement("span");    
    d.classList.add('datetime');
    d.innerText=n.date;
    let t = document.createElement("span");   
    t.innerText=n.Time; 
    let temp = document.createElement("span"); 
    temp.classList.add('tempreading');
    temp.innerText=n.Temp  
    a.append(div);
    div.append(s);
    div.append(d);
    div.append(t);
    div.append(temp);
  }
}
function PrintSerialNumner(Timearr){
      for (let i = 1; i < Timearr.length; i++) {
        let srno = document.getElementById("srno");
        var li = document.createElement("li");
        li.innerText = i;
        srno.append(li);
        SerialValues.push(i);
      }
}
function DateFormating(date) {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; 
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return `${dd}/${mm}/${yyyy}`;
}
function PrintDateTime(Timearr){
  let datecount = 0;
  for (let a of Timearr) {
    if (datecount < Timearr.length - 1) {
      let list = document.getElementById("UnList");
      var li = document.createElement("li");
      let datespan = document.createElement("span");
      let readingspan = document.createElement("span");
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      };
      let dateString = DateFormating(a);
      readingspan.innerText = dateString;
      DateValues.push(dateString);
      datespan.innerText = a.toLocaleTimeString("it-IT");
      TimeValues.push(a.toLocaleTimeString("it-IT"));
      li.append(readingspan);
      li.append(datespan);
      list.append(li);
      datecount = datecount + 1;

    }
  }

}
function getTemperature(size) {
  while(k < size){
    // let randomreading=reading;
    const myArray = [12, 13, 14, 15];
    const randomIndex = Math.floor(Math.random() * myArray.length);
    let t = myArray[randomIndex] + Math.random();
    Temperature.push(t.toFixed(2));
    k=k+1;
  }
  // while (k < size) {
  //   if (m % 2 == 0) {
  //     orderFirst();
  //   } else {
  //     Reverseorder();
  //   }
  // }
}
function Reverseorder() {
  for (let i = reading.length - 1; i >= 0; i--) {
    let r = reading[i];
    let randomitem =
      readingSize[Math.floor(Math.random() * readingSize.length)];
    for (let j = 0; j < randomitem; j++) {
      let t = r + Math.random();
      Temperature.push(t.toFixed(2));
      k = k + 1;
    }
  }
  m = m + 1;
}
function orderFirst() {
  for (let i = 0; i < reading.length; i++) {
    let r = reading[i];
    let randomitem =
      readingSize[Math.floor(Math.random() * readingSize.length)];
    for (let j = 0; j < randomitem; j++) {
      let t = r + Math.random();
      Temperature.push(t.toFixed(2));
      k = k + 1;
    }
  }
  m = m + 1;
}

function pdfnumber(startDate, vehiclenumber, fleetId) {
  let lastFourWords = vehicleNumber.slice(-4);
  let vehicleid = fleetId.slice(-4);
  let [year, month, datdd] = startDate.split("-");
  return (
    "SLD" +
    lastFourWords +
    "_" +
    datdd +
    "-" +
    month +
    "-" +
    year +
    "_" +
    "F" +
    vehicleid
  );
}

function getpdf() {
  var element = document.getElementById("tempsheet");
  let vehnoo = pdfnumber(startDate, vehicleNumber, fleetId);
  console.log(vehnoo);
  var opt = {
    margin: [0.74,0.8,0.7,0.8],
    padding: 0.5,
    filename: `${vehnoo}.pdf`,
    html2canvas: { scale: 2 },
    pagebreak: {
      mode: "avoid-all",
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  // html2pdf(element);
  html2pdf(element, opt);
}
