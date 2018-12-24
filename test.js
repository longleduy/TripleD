function getNgayHTai(){
    var d = new Date();
    var day = d.getDate() <10? "0"+d.getDate():d.getDate();
    var month = d.getMonth() +1 < 10?"0"+d.getMonth().toString():d.getMonth() +1;
	var year = d.getFullYear();
	return day.toString() +"/"+ month.toString() +"/"+ year.toString();
}
getNgayHTai(2018,5,13);
