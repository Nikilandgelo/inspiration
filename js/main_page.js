var season_indicators = document.getElementById("season_indicators");
var list_text_seasons = document.getElementsByClassName("text_season");
var angle_rotate = 0;
var while_iteration_count = 0;
while (angle_rotate < 360)
{
    created_line = document.createElementNS("http://www.w3.org/2000/svg","line");
    created_line.setAttribute("x1", "50%"); created_line.setAttribute("y1", "0");
    created_line.setAttribute("x2", "50%"); created_line.setAttribute("y2", "5%");
    created_line.setAttribute("stroke", "var(--main_color)");
    created_line.setAttribute("stroke-width", "calc((0.2vw + 0.2vh)/2)");
    created_line.style.transformOrigin = "center";
    created_line.style.transform = "rotate(" + angle_rotate + "deg)";
    season_indicators.appendChild(created_line);

    list_text_seasons[while_iteration_count].style.transform = "rotate(" +
    angle_rotate + "deg)";

    angle_rotate += 30;
    while_iteration_count += 1;
}

var last_title = document.getElementById("last_title");
last_title.addEventListener("animationend", showing_prompt, {once: true});
function showing_prompt(event)
{
    var main_page_content = document.getElementById("main_page_content");

    var prompt_scroll = document.createElement("div");
    prompt_scroll.className = "main_page_prompt"

    var image_scroll = document.createElement("img");
    image_scroll.src = "./images/icon_scroll.svg";
    image_scroll.style.width = "10%";
    image_scroll.style.height = "40%";
    prompt_scroll.appendChild(image_scroll);

    var text_scroll = document.createElement("p");
    text_scroll.textContent = "Пролистайте вниз, чтобы увидеть больше";
    text_scroll.style.fontSize = "calc((1.75vw + 1.75vh)/2)";
    prompt_scroll.appendChild(text_scroll);

    main_page_content.appendChild(prompt_scroll);
}