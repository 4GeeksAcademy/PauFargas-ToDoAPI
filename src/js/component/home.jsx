import React from "react";
import { ToDosFetch } from "./ToDo";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<ToDosFetch/>
		</div>
	);
};

export default Home;
