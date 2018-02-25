function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var websiteString;
websiteString = httpGet('https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyBNkHIUhVlCMVe5ljh68mIJLfk_m4TgFOk');

parsedWebsite = JSON.parse(websiteString);
arrayWebsite = Object.values(parsedWebsite);
firstElement = arrayWebsite[1];
firstElement[1].name;
len = firstElement.length-1;
var ids = new Array(len);
var names = new Array(len);
var days = new Array(len);
var temp = new Array(len);
var state = new Array(len);

for (i = 1; i <= len; i++) {
    console.log(i);
    element = firstElement[i];
    ids[i-1] = element.id;
    names[i-1] = element.name;
    days[i-1] = element.electionDay;
    temp[i-1] = element.ocdDivisionId;
    var n = temp[i-1].indexOf("state:")+6;
    console.log(n);
    state[i-1] = temp[i-1].substring(n,n+2);

}
console.log(state);


function abbrState(input, to){

    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }
    }
}
console.log(state.length);
for (j = 0; j < state.length; j++)
{
    temp = state[j];
    console.log(temp);
    state[j] = abbrState(temp, "name");
}
var ul = document.getElementById("election_list");
var myarr = new Array(len);


for (k=0; k<len; k++)
{
  var li = document.createElement("li");
  var append = " <a href=\"#\">" + names[k] + " </a>";
  li.innerHTML = append;
  var lid = "li_id"+k.toString();
  li.setAttribute("id", lid);
  ul.appendChild(li);
}

console.log(ul);

function searchFunction()
{
    var input, filter, ul, li, a, i;
    input = document.getElementById('query');
    filter = input.value.toUpperCase();
    ul = document.getElementById("election_list");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



var list;
for (var t = 0; t < len; t++){
    list = document.getElementById('li_id'+t);
    if (typeof window.addEventListener === 'function'){
        (function (list) {
            list.addEventListener('click', function(){
                console.log(list);
                g = list.id
                sub = g.substring(5,)
                console.log(sub);
                clicked(sub)
            });
        })(list);
    }
}

function clicked(num)
{
    new_text = "<strong> Name of Election: </strong> " + names[num] + "</br>" + "<strong> Date: </strong>" + days[num] + "</br>" + "<strong> State: </strong>" + state[num];
    var body = document.getElementById("text_update");
    var map = document.getElementById("map");
    body.innerHTML = new_text;
    map.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBNkHIUhVlCMVe5ljh68mIJLfk_m4TgFOk&q=voting+centers+" + state[num];
}


