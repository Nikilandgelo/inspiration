var season_indicators = document.getElementById("season_indicators");
var list_text_seasons = document.getElementsByClassName("text_season");
var angle_rotate = -30;
var while_iteration_count = -1;
while (angle_rotate < 330)
{
    while_iteration_count += 1;

    created_line = document.createElementNS("http://www.w3.org/2000/svg","line");
    created_line.setAttribute("x1", "50%"); created_line.setAttribute("y1", "0"); created_line.setAttribute("x2", "50%"); created_line.setAttribute("y2", "5%");
    created_line.setAttribute("stroke", "white"); created_line.setAttribute("stroke-width", "calc((0.2vw + 0.2vh)/2)");

    angle_rotate += 30;
    created_line.style.transformOrigin = "center";
    created_line.style.transform = "rotate(" + angle_rotate + "deg)";

    list_text_seasons[while_iteration_count].style.transform = "rotate(" + angle_rotate + "deg)";

    season_indicators.appendChild(created_line);
}


var last_title = document.getElementById("last_title");
last_title.addEventListener("animationend", showing_prompt, {once: true});

var roadmap = document.getElementById("roadmap_for_js");
var list_roadmap_divs = roadmap.getElementsByClassName("roadmap_div");
var list_bulbs = roadmap.getElementsByClassName("roadmap_bulb");
var list_spaces_lines = roadmap.getElementsByClassName("space_for_lines");
for (current_bulb in list_bulbs)
{
    bulb_left = list_bulbs[current_bulb].offsetLeft / list_roadmap_divs[current_bulb].offsetWidth * 100 + "%";
    bulb_left_width = (list_bulbs[current_bulb].offsetLeft + list_bulbs[current_bulb].offsetWidth) / list_roadmap_divs[current_bulb].offsetWidth * 100 + "%";
           
    if (Number(current_bulb) == 0)
    {
        list_spaces_lines[current_bulb].style.clipPath = "polygon(0 0, " + bulb_left + " 0, " + bulb_left + " 100%, 0 100%)";
    }
    else if (Number(current_bulb) == list_bulbs.length - 1)
    {
        list_spaces_lines[current_bulb].style.clipPath = "polygon(" + bulb_left_width + " 0, 100% 0, 100% 100%, " + bulb_left_width + " 100%)";
    }
    else
    {
        list_spaces_lines[current_bulb].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, " + bulb_left_width + " 100%, " + bulb_left_width + " 0, " + bulb_left + " 0, " + bulb_left + " 100%, 0 100%)";
    }
}


function showing_prompt(event)
{
    var main_overlap = document.getElementById("main_overlap");

    var prompt_scroll = document.createElement("div");
    prompt_scroll.style.width = "35%";
    prompt_scroll.style.height = "15%";
    prompt_scroll.style.position = "absolute";
    prompt_scroll.style.bottom = "0";
    prompt_scroll.style.display = "flex";
    prompt_scroll.style.justifyContent = "space-evenly";
    prompt_scroll.style.alignItems = "center";
    prompt_scroll.style.animation = "appear_prompt_scroll 3s forwards";

    var image_scroll = document.createElement("img");
    image_scroll.src = "/images/icon_scroll.svg";
    image_scroll.style.minWidth = "10%";
    image_scroll.style.minHeight = "10%";
    prompt_scroll.appendChild(image_scroll);

    var text_scroll = document.createElement("p");
    text_scroll.textContent = "Пролистайте вниз, чтобы увидеть больше";
    prompt_scroll.appendChild(text_scroll);


    main_overlap.appendChild(prompt_scroll);
}