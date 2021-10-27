function daysAndHours(milliseconds) {
    let Days = Math.floor(milliseconds / 86400000);
    let Hours = Math.floor( (milliseconds - Days * 86400000) / 3600000);
    return Days + "d " + Hours + "h";
  }

  export default daysAndHours;