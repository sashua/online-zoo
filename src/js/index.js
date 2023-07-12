import { Menu } from "./modules/menu";
import { Animals } from "./modules/animals";
import { Feedbacks } from "./modules/feedbacks";
import "../sass/index.scss";

const menu = new Menu();
const animals = new Animals(".js-animals-slider");
const feedbacks = new Feedbacks(".js-feedbacks-slider");
