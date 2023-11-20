var accept_language_icons = document.getElementsByClassName("language_accept");
var accept_age_icons = document.getElementsByClassName("age_accept");

function select_language_course(index)
{
    Array.from(accept_language_icons).forEach(element => element.classList.remove("visible_accept_icon"));
    accept_language_icons[index].classList.add("visible_accept_icon");
}

function select_age_course(index)
{
    Array.from(accept_age_icons).forEach(element => element.classList.remove("visible_accept_icon"));
    accept_age_icons[index].classList.add("visible_accept_icon");
}