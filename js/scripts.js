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

        content_reveal[0].classList.add("first_reveal");
    }
};




var list_roadmap_divs = document.getElementsByClassName("roadmap_div");
var list_bulbs = document.getElementsByClassName("roadmap_bulb");
var list_spaces_lines = document.getElementsByClassName("space_for_lines");
var bulb_counter = 0;
for (current_bulb of list_bulbs)
{
    bulb_left = (current_bulb.getBoundingClientRect().left - list_roadmap_divs[bulb_counter].getBoundingClientRect().left)
    / list_roadmap_divs[bulb_counter].offsetWidth * 100 + "%";

    bulb_left_width = ((current_bulb.getBoundingClientRect().left + current_bulb.getBoundingClientRect().width)
    - list_roadmap_divs[bulb_counter].getBoundingClientRect().left)
    / list_roadmap_divs[bulb_counter].offsetWidth * 100 + "%";
           
    if (bulb_counter == 0)
    {
        list_spaces_lines[bulb_counter].style.clipPath = "polygon(0 0, " +
        bulb_left + " 0, " + bulb_left + " 100%, 0 100%)";
    }
    else if (bulb_counter == list_bulbs.length - 1)
    {
        list_spaces_lines[bulb_counter].style.clipPath = "polygon(" +
        bulb_left_width + " 0, 100% 0, 100% 100%, " + bulb_left_width + " 100%)";
    }
    else
    {
        list_spaces_lines[bulb_counter].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, "
        + bulb_left_width + " 100%, " + bulb_left_width + " 0, " + bulb_left + " 0, "
        + bulb_left + " 100%, 0 100%)";
    }
    bulb_counter += 1;
}
var bulbs_fillers = document.getElementsByClassName("bulb_filler");
var bulbs_lines = document.getElementsByClassName("lines_inner_bulb");
var roadmap_lines = document.getElementsByClassName("roadmap_lines");




var scrollable_divs = document.getElementsByClassName("scrollable_div");
var in_scrollable_area = false;
Array.from(scrollable_divs).forEach(element => element.addEventListener("mouseenter", function()
{
    in_scrollable_area = true;
}));
Array.from(scrollable_divs).forEach(element => element.addEventListener("mouseleave", function()
{
    in_scrollable_area = false;
}));




var pages = document.getElementsByClassName("pages");
var content_reveal = document.getElementsByClassName("pages_content");
var can_scroll = false;
document.body.addEventListener("wheel", change_page);
function change_page(event)
{
    if (can_scroll == true && in_scrollable_area == false)
    {
        for (current_page in pages)
        {
            if (pages[current_page].hasAttribute("position_page"))
            {
                if (event.deltaY > 0)
                {
                    if (Number(current_page) + 1 != pages.length)
                    {               
                        pages[current_page].removeAttribute("position_page");
                        bulbs_fillers[current_page].classList.remove("current_fill");
                        bulbs_lines[current_page].classList.remove("current_lines");  

                        bulbs_fillers[Number(current_page) + 1].classList.add("current_fill");
                        bulbs_lines[Number(current_page) + 1].classList.add("current_lines");
                        roadmap_lines[Number(current_page) + 1].classList.add("roadmap_passed_lines");
                        pages[Number(current_page) + 1].scrollIntoView();
                        pages[Number(current_page) + 1].setAttribute("position_page", "current");
                        if (content_reveal[Number(current_page) + 1].classList.contains("reveal_content"))
                        {}
                        else
                        {
                            content_reveal[Number(current_page) + 1].classList.add("reveal_content");
                        }
                    }
                }
                else if (event.deltaY < 0)
                {
                    if (Number(current_page) != 0)
                    {
                        pages[current_page].removeAttribute("position_page");
                        bulbs_fillers[current_page].classList.remove("current_fill");
                        bulbs_lines[current_page].classList.remove("current_lines");
                        roadmap_lines[current_page].classList.remove("roadmap_passed_lines");

                        bulbs_fillers[Number(current_page) - 1].classList.add("current_fill");
                        bulbs_lines[Number(current_page) - 1].classList.add("current_lines");
                        pages[Number(current_page) - 1].scrollIntoView();
                        pages[Number(current_page) - 1].setAttribute("position_page", "current");
                    }
                }
                break;
            }
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
            bulbs_fillers[current_page].classList.remove("current_fill");
            bulbs_lines[current_page].classList.remove("current_lines");

            Array.from(roadmap_lines).forEach(element => element.classList.remove("roadmap_passed_lines"));

            bulbs_fillers[index].classList.add("current_fill");
            bulbs_lines[index].classList.add("current_lines");
            for (passed_lines of Array.from(roadmap_lines).splice(0, index + 1))
            {
                passed_lines.classList.add("roadmap_passed_lines");
            }
            pages[index].scrollIntoView();
            pages[index].setAttribute("position_page", "current");
            if (content_reveal[index].classList.contains("reveal_content"))
            {}
            else
            {
                content_reveal[index].classList.add("reveal_content");
            }
            break;
        }
    }
}