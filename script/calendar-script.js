// 'use strict';
const currentDateObj = new Date();
const monthNameArr = ["Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь"];
const nameDays = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
const ccurrentMonth = currentDateObj.getMonth();
const ccurrentYear = currentDateObj.getFullYear();
const ccurrentDate = currentDateObj.getDate();
let localKey = "";//year + monthNumber
let monthObj = "";
let dayId ="";
let elementId = "";

class Day{
	constructor(num,eventName,eventDate,usersName,description){
		this.num = num;
		this.eventName = eventName;
		this.eventDate = eventDate;
		this.usersName = usersName;
		this.description = description;
		this.message =""
	};
	createEventSmall(){//быстрое добавление события
		this.message ="";
		let newEvent = document.getElementsByName("even")[0].value;
		let arr = newEvent.split(/[^[а-яёa-z0-9]|\S]/gi);
		let local = "";
		let monthObj = "";
		let year = "";
		let month = "";
		let dayNumber = "";
		if(!arr[0].search(/[0-3]\d[0-1]\d\d{4}/g)){
			year = arr[0].slice(4);
			month = Number(arr[0].slice(2,4))-1;
			dayNumber = Number(arr[0].slice(0,2));

			if(`${month}`.length == 1){
				local = `${year}0${month}`;
			}else{
				local = `${year}${month}`;
			};

			for(let i = 1; arr[i];i++){
				this.message += `${arr[i]} `;
			};
		} else if(!arr[0].search(/[0-3]\d/g) && !arr[1].search(/[0-1]\d/g) && !arr[2].search(/\d{4}/g)){
			year = arr[2];
			month = Number(arr[1])-1;
			dayNumber = Number(arr[0]);
			if(`${month}`.length == 1){
				local = `${year}0${month}`;
			}else{
				local = `${year}${month}`;
			};
			for(let i = 3; arr[i];i++){
				this.message += `${arr[i]} `;
			};
		} else{
			alert("Неверная дата. введите дату в формате ДД.ММ.ГГГГ")
		};
		if(JSON.parse(localStorage.getItem(local))==null){
			alert("Выбранная вами дата не найдена. Пожайлуста дерейдите к месяцу в который хотите добавить событие");
		}else{
			monthObj = JSON.parse(localStorage.getItem(local));
		};
		for(let key in monthObj){
			if(monthObj[key].num == dayNumber){
				monthObj[key].eventName = this.message;
				break;
			};
		};
		localStorage.setItem(local, JSON.stringify(monthObj));
		day.renderDay();
		hideForm();
	}
	createEvent(id){
		if(document.getElementsByName("events")[0].value != ""){
			monthObj[dayId].eventName = document.getElementsByName("events")[0].value;
		};
		if(document.getElementsByName("date")[0].value != ""){
			monthObj[dayId].eventDate = document.getElementsByName("date")[0].value;
		};
		if(document.getElementsByName("names")[0].value != ""){
			monthObj[dayId].usersName = document.getElementsByName("names")[0].value;
		};
		if(document.getElementsByName("textarea")[0].value != ""){
			monthObj[dayId].description = document.getElementsByName("textarea")[0].value;
		};
		localStorage.setItem(localKey, JSON.stringify(monthObj));
		day.renderDay();
		hideForm();
	}
	deleteEvent(id){
		monthObj[dayId].eventName = "";
		monthObj[dayId].eventDate = "";
		monthObj[dayId].usersName = "";
		monthObj[dayId].description = "";
		localStorage.setItem(localKey, JSON.stringify(monthObj));
		clearForm();
		day.createEvent(id);
	}
	renderDay(){
		let table = '<div class="day-line">' ;
		let counter = 0;
		let style = "";
		let monthObj = JSON.parse(localStorage.getItem(localKey))
		for(let key in monthObj){
			if(key == "date" + counter){
				if(monthObj[key].num == ccurrentDate && monthObj.currentMonth == ccurrentMonth && monthObj.currentYear == ccurrentYear){
					style = `style = "background-color:#e6e6e6; color:black !important;"`;
				} else if(monthObj[key].eventName != ""){
					style = `style = "background-color:#05fffd3b;"`;
				} else{
					style = "";
				};
				if(counter < 7){
					table += `<div class = "day" id =${localKey}${key} ${style} onclick = "setEvents(id)">
					<p class="day-date">${nameDays[counter]}, ${monthObj[key].num}</p>`;
				} else{
					table += `<div class = "day" id =${localKey}${key} ${style} onclick = "setEvents(id)">
					<p class="day-date">${monthObj[key].num}</p>`;
				};
				table += `<p class="name-event">${monthObj[key].eventName}</p>
				<p>${monthObj[key].eventDate}</p>
				<p>${monthObj[key].usersName}</p>
				<p class="day-description">${monthObj[key].description}</p></div>`;
				counter++;
				if(counter % 7  == 0 && counter != 0){ 
					table += '</div><div class="day-line">';
				};
			};
		};
		table += '</div>';// закрываем таблицу
		document.getElementById("calendar").innerHTML = table;
	}
};
class Month{
	constructor(currentDate, currentMonth, monthName, currentYear){
		this.currentDate = currentDate;
		this.currentMonth = currentMonth; 
		this.monthName = monthName;
		this.currentYear = currentYear;
	}

	createDay(){
		let previousDate = "";
		let currentMonthDateConstructor = new Date(this.currentYear, this.currentMonth, 1);//дата для определения первого дня
		let newDate = currentMonthDateConstructor.getDate();
		let firstDay = currentMonthDateConstructor.getDay(); //номер дня для первого числа let currentMonthDayConstructor
		let counter = 0;
		let i = 1;
		//цикл вставки дней предыдущего месяца
		for(counter; firstDay != 1; counter++){
			if (firstDay == 0){
				firstDay = 7;
			};
			previousDate = new Date(this.currentYear,this.currentMonth,2-firstDay);
			storage.month["date" + counter] = new Day(previousDate.getDate(),"","","","");
			firstDay--;	
		};
		//цикл вставки дней текущего месяца
		for (counter; counter < 42; counter++){
			currentMonthDateConstructor = new Date(this.currentYear,this.currentMonth, i++ );
			newDate = currentMonthDateConstructor.getDate();
			if(firstDay == 0){
				firstDay = 7;
			};
			// окончание месяца
			if(this.currentMonth != currentMonthDateConstructor.getMonth() && counter %7 == 0){
				break;
			};
			storage.month["date" + counter] = new Day(newDate,"","","","");
		};
	}
};

class Storage{
	constructor(){
		this.currentYear = ccurrentYear;
		this.currentMonth = ccurrentMonth;
		this.currentDate = ccurrentDate;
		this.month = "";
		this.monthName = "";
	}
	createMonth(arg){
		this.monthName = monthNameArr[this.currentMonth];
		this.month = new Month(this.currentDate, this.currentMonth, this.monthName, this.currentYear); // create next or previous month object 
		this.month.createDay();
		//set object to local storage
		monthObj = this.month;
		localStorage.setItem(localKey, JSON.stringify(this.month));
		storage.renderMonth();
		 
	}
	displayMonth(arg = 0){
		localKey = Number(localKey) + arg; // localKey is global
		if(arg == 0){
			this.currentYear = ccurrentYear;
			this.currentMonth = ccurrentMonth;
			//create lokalKey for serch in local storage
			localKey = `${this.currentYear}${this.currentMonth}`;
			//check monthKey length
			if(this.currentMonth.toString().length ==1){
				localKey = `${this.currentYear}0${this.currentMonth}`;
			};
		};
		//check localKey
		if (Number(localKey.toString().slice(-2)) == 99){
			localKey -= 88; 
		} else if(Number(localKey.toString().slice(-2)) == 12){
			localKey += 88;
		};
		//2 блока if -переход по крайним месяцам
		if(this.currentMonth == 0 && arg == -1){
			this.currentMonth = 12;
			this.currentYear  +=arg;
		};
		if(this.currentMonth == 11 && arg == 1){
			this.currentMonth = -1;
			this.currentYear  +=arg;
		};
		this.currentMonth += arg;
		// check object in locale storage
		// if object == null, create object
		if(JSON.parse(localStorage.getItem(localKey)) == null){
			storage.createMonth(arg);
		//if object != null get object and render
		} else{ 
			monthObj = JSON.parse(localStorage.getItem(localKey));
			this.currentMonth = monthObj.currentMonth;
			this.currentYear = monthObj.currentYear;
			this.currentDate = monthObj.currentDate;
			storage.renderMonth();
		};
	}
	renderMonth(){
		document.getElementById("month").innerHTML = `${JSON.parse(localStorage.getItem(localKey)).monthName} ${JSON.parse(localStorage.getItem(localKey)).currentYear}`;
		day.renderDay();
	}
};
let day = new Day();
let storage = new Storage();
storage.displayMonth();

//при нажатии на ячейку вызывает всплывающее окно
function setEvents(id){
	elementId =id;
	monthObj = JSON.parse(localStorage.getItem(localKey));
	dayId = id.slice(6);
	let calendarElement = document.getElementById(id);
	let positionTop = calendarElement.getBoundingClientRect().top; // координаты элемента по оси y 
	let positionLeft = calendarElement.getBoundingClientRect().left; // координаты элемента по оси x
	let left ="";// отступ слева
	let form = document.getElementById("form");
	let formWidth = Number(getComputedStyle(form).width.slice(0,-2));//ширина формы
	document.getElementById("form-back").style.display = "block";// отображает невидимый фон
	// проверка  была ли нажата кнопка "Добавить" или ячейка
	if(id == "insert"){//выполняется если нажата кнопка "Добавить"
		let top = positionTop + pageYOffset + calendarElement.offsetHeight +14;
		let left = positionLeft + pageXOffset;
		document.getElementById("smallForm").style.cssText = `display: block; position:absolute; top: ${top}px; left: ${left}px;`;
	} else{//работает с ячейкой
		calendarElement.style.cssText ="background-color: #05fffd3b;"; //фон активной ячейки
		//Логический блок, позиционирует всплывающее окно и отображает указатель
		if(positionLeft + calendarElement.offsetWidth + formWidth < document.body.clientWidth){
			 left = positionLeft + pageXOffset +calendarElement.offsetWidth +14;
			document.getElementById("left").style.display = "block";
		} else{
			 left = positionLeft + pageXOffset - formWidth -14;
			document.getElementById("right").style.display = "block";
		};
		
		//проверка содержит ли ячейка событие календаря и отображает содержимое
		if(monthObj[dayId].eventName != ""){
			document.getElementById("form-events").innerHTML =`${monthObj[dayId].eventName}`;
			document.getElementById("form-events").style.display ="block";
			document.getElementById("form-events-input").style.display ="none";
		} else{
			document.getElementById("form-events").style.display ="none";
			document.getElementById("form-events-input").style.display ="block";
		};
		if(monthObj[dayId].eventDate != ""){
			document.getElementById("form-date").innerHTML =`${monthObj[dayId].eventDate}`;
			document.getElementById("form-date").style.display ="block";
			document.getElementById("form-date-input").style.display ="none";
		} else{
			document.getElementById("form-date").style.display ="none";
			document.getElementById("form-date-input").style.display ="block";
		};
		if(monthObj[dayId].usersName != ""){
			document.getElementById("form-names").innerHTML =`Участники:<p>${monthObj[dayId].usersName}`;
			document.getElementById("form-names").style.display ="block";
			document.getElementById("form-names-input").style.display ="none";
		} else{
			document.getElementById("form-names").style.display ="none";
			document.getElementById("form-names-input").style.display ="block";
		};
		if(monthObj[dayId].description != ""){
			document.getElementById("form-textarea").innerHTML =`${monthObj[dayId].description}`;
			document.getElementById("form-textarea").style.display ="block";
			document.getElementById("form-textarea-input").style.display ="none";
		} else{
			document.getElementById("form-textarea").style.display ="none";
			document.getElementById("form-textarea-input").style.display ="block";
		};

		form.style.cssText = `display: block; position:absolute; top: ${positionTop + pageYOffset -20}px; left: ${left}px;`;
	};
};

//скрывает форму и вызывает функцию очистки
function hideForm(){
	let arrId = ["smallForm","form","form-back","left","right"];
	arrId.forEach(element => document.getElementById(element).style.display = "none");
	clearForm();
};

// функция очистки формы
function clearForm(){
	let clear = document.getElementsByTagName("input");
	document.getElementsByTagName("textarea")[0].value = "";
	for(let i = 0; i<clear.length; i++){
		clear[i].value = "";
	};
};
//функция очистки хранилища
function clearStorage(){
	localStorage.clear();
	storage.displayMonth();
}












