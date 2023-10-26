var is_loaded = false;
window.addEventListener("load", function()
{
    is_loaded = true;
}, {once: true});

var loader = document.getElementById("loader");
var loader_logo = document.getElementById("loader_logo");
loader_logo.children[0].addEventListener("animationiteration", hiding_loader);
function hiding_loader()
{
    if (is_loaded == true)
    {  
        loader.style.animation = "hide_loader 3s forwards";
        loader.addEventListener("animationend", function()
        {
            loader.remove();
            can_scroll = true;
        }, {once: true});

        loader_logo.children[0].style.animation = "hiding_loader_global 3s forwards";
        loader_logo.children[1].style.animation = "hiding_loader_wings 3s forwards";
        loader_logo.children[2].style.animation = "hiding_loader_bottom 3s forwards";
        loader_logo.children[0].removeEventListener("animationiteration", hiding_loader);

        document.documentElement.style.setProperty("--current_playing_state", "running");
    }
};


var pages = document.getElementsByClassName("pages");
var can_scroll = false;
document.body.addEventListener("wheel", change_page);
function change_page(event)
{
    for (current_page in pages)
    {
        if (pages[current_page].hasAttribute("position_page"))
        {
            if (event.deltaY > 0 && can_scroll == true)
            {
                if (Number(current_page) + 1 != pages.length)
                {               
                    pages[current_page].removeAttribute("position_page");
                    pages[Number(current_page) + 1].scrollIntoView();
                    pages[Number(current_page) + 1].setAttribute("position_page", "current");
                }
            }
            else if (event.deltaY < 0 && can_scroll == true)
            {
                if (Number(current_page) != 0)
                {
                    pages[current_page].removeAttribute("position_page");
                    pages[Number(current_page) - 1].scrollIntoView();
                    pages[Number(current_page) - 1].setAttribute("position_page", "current");
                }
            }
            break;
        }
    }
}
function click_change_page(index)
{
    for (current_page in pages)
    {
        if (pages[current_page].hasAttribute("position_page"))
        {
            pages[current_page].removeAttribute("position_page");
            pages[index].scrollIntoView();
            pages[index].setAttribute("position_page", "current");
            break;
        }
    }
}


var roadmap = document.getElementById("roadmap");
var list_roadmap_divs = roadmap.getElementsByClassName("roadmap_div");
var list_bulbs = roadmap.getElementsByClassName("roadmap_bulb");
var list_spaces_lines = roadmap.getElementsByClassName("space_for_lines");
for (current_bulb in list_bulbs)
{
    bulb_left = list_bulbs[current_bulb].offsetLeft
    / list_roadmap_divs[current_bulb].offsetWidth * 100 + "%";

    bulb_left_width = (list_bulbs[current_bulb].offsetLeft +
    list_bulbs[current_bulb].offsetWidth)
    / list_roadmap_divs[current_bulb].offsetWidth * 100 + "%";
           
    if (Number(current_bulb) == 0)
    {
        list_spaces_lines[current_bulb].style.clipPath = "polygon(0 0, " +
        bulb_left + " 0, " + bulb_left + " 100%, 0 100%)";
    }
    else if (Number(current_bulb) == list_bulbs.length - 1)
    {
        list_spaces_lines[current_bulb].style.clipPath = "polygon(" +
        bulb_left_width + " 0, 100% 0, 100% 100%, " + bulb_left_width + " 100%)";
    }
    else
    {
        list_spaces_lines[current_bulb].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, "
        + bulb_left_width + " 100%, " + bulb_left_width + " 0, " + bulb_left + " 0, "
        + bulb_left + " 100%, 0 100%)";
    }
}