function GetData() {
    console.log("hi adarsh")
    let vehicleNumber = document.getElementById("vehile").value;
    let fleetId = document.getElementById("fleet").value;
    let startDate = document.getElementById("start").value;
    let enddate = document.getElementById('enedate').value;
    let starttrip = document.getElementById("starttime").value;
    let endtrip = document.getElementById("endtime").value;
    let dest = document.getElementById("myTextarea").value;
    var startlocation = document.getElementById("mySelect").value;
  

    sessionStorage.setItem('vehicle', vehicleNumber);
    sessionStorage.setItem('fleet', fleetId);
    sessionStorage.setItem('startdate', startDate);
    sessionStorage.setItem('endDate', enddate);
    sessionStorage.setItem('starttrip', starttrip);
    sessionStorage.setItem('endtrip', endtrip);
    sessionStorage.setItem('startlocation', startlocation);
    sessionStorage.setItem('dest', dest);
    let error = document.getElementById("error");
    if (vehicleNumber.length > 0 && fleetId.length > 0 && startDate.length > 0 && enddate.length > 0 && starttrip.length > 0 && endtrip.length > 0 && dest.length > 0) {
        error.style.display = "none";
        window.location.href = 'temp.html';
    }
    else {
        error.style.display = "block";
    }

}
