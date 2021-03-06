<head>
<style>
body{
margin: 0 auto;
width:768;
}
.header{
height:199px;
}
.headermenu{
height: 34px;
}
form{
    margin-bottom: 0px;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-bottom: 1px solid #e7e7e7;
    background-color: #f3f3f3;
}

li {
    float: left;
}

li a {
    display: block;
    color: #666;
    text-align: center;
    padding: 7px 8px;
    text-decoration: none;
}

li a:hover:not(.active) {
    background-color: #ddd;
}

li a.active {
    color: white;
    background-color: #4CAF50;
}
li.right {
    float: right !important;
    border-right: none;
}
.headercontainer{
width:100%;
height: 166px;
background-image: url("/assets/images/logo.png");
}
li.loginbutton{
    background-color: #4CAF50;
}
li.loginbutton a{
    color: #fff;
}
li.loginbutton{
    background-color: #4CAF50;
}
li.loginbutton a:hover{
   #color: #000;
}
li.loginbutton a:hover:not(.active){
   background-color: #000;
}
.bodycontainer{
min-height:300px;
    border-left: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
	border-right: 1px solid #e7e7e7;
    background-color: #f3f3f3;
}
.footer .additionalinfo{
color:gray;
}
* {
    box-sizing: border-box;
}

input[type=text], select, textarea{
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: vertical;
}
input[type=password], select, textarea{
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: vertical;
}
label {
    padding: 12px 12px 12px 0;
    display: inline-block;
}

input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
}

input[type=submit]:hover {
    background-color: #45a049;
}

.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}



/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
    .col-25, .col-75, input[type=submit] {
        width: 100%;
        margin-top: 0;
    }
}
.bodycontainer .internal{
    width: 95%;
    margin: 0 auto;
}
.footer{
    padding-top:8px;
	padding-bottom:16px;
}

.lastbtn{
padding-top:8px;
padding-bottom:16px;
}
/* Cначала обозначаем стили для IE8 и более старых версий
т.е. здесь мы немного облагораживаем стандартный чекбокс. */
.checkbox {
  vertical-align: top;
  width: 17px;
  height: 17px;
  margin: 0 3px 0 0;
}
/* Это для всех браузеров, кроме совсем старых, которые не поддерживают
селекторы с плюсом. Показываем, что label кликабелен. */
.checkbox + label {
  cursor: pointer;
}

/* Далее идет оформление чекбокса в современных браузерах, а также IE9 и выше.
Благодаря тому, что старые браузеры не поддерживают селекторы :not и :checked,
в них все нижеследующие стили не сработают. В данном случае checked указывается
без двоеточия впереди, почему-то это срабатывает именно так. */

.checkbox:not(checked) {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 20px;
}
.checkbox:not(checked) + label {
  position: relative;
  padding: 0 0 0 60px;
}
.checkbox:not(checked) + label:before {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background: #CDD1DA;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.2);
  transition: .2s;
}
.checkbox:not(checked) + label:after {
  content: '';
  position: absolute;
  top: -2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 0 2px 5px rgba(0,0,0,.3);
  transition: .2s;
}
.checkbox:checked + label:before {
  background: #9FD468;
}
.checkbox:checked + label:after {
  left: 26px;
}
.checkbox:focus + label:before {
  box-shadow: inset 0 2px 3px rgba(0,0,0,.2), 0 0 0 3px rgba(255,255,0,.7);
}
/* The alert message box */
.alert {
    padding: 20px;
    background-color: #f44336; /* Red */
    color: white;
    margin-bottom: 15px;
}

/* The close button */
.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: black;
}
.alert {
    opacity: 1;
    transition: opacity 0.6s; /* 600ms to fade out */
}

</style>

<script>
// Get all elements with class="closebtn"
var close = document.getElementsByClassName("closebtn");
var i;

// Loop through all close buttons
for (i = 0; i < close.length; i++) {
    // When someone clicks on a close button
    close[i].onclick = function(){

        // Get the parent of <span class="closebtn"> (<div class="alert">)
        var div = this.parentElement;

        // Set the opacity of div to 0 (transparent)
        div.style.opacity = "0";

        // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
}
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="/assets/js/jquery-ui-timepicker-addon.js"></script>
<link rel="stylesheet" type="text/css" href="/assets/css/jquery-ui-timepicker-addon.css">
<link rel="shortcut icon" type="image/png" href="/favicon.png"/>
</head>
<body>
<div class="header">
<div class="headercontainer">
</div>
<div class="headermenu">
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/htu">Create Giveaway</a></li>
  <li><a href="/htu">Information</a></li>
  <li><a href="/faq">API</a></li>
  <li><a href="/faq">Offline Version (GitHub)</a></li>
  <li class="right loginbutton"><a href="/login">Login</a></li>
  <li class="right"><a href="/register">Register</a></li>
</ul>
</div>
</div>