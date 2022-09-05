import { url } from "./app.js";
import { post_data } from "./app.js";
import { render_data } from "./app.js";

window.onload = ()=> {
    //get_data();
    render_data();
    post_data(url);
};