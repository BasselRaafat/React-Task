import React, { useState } from "react";

function Countries() {
	const [countries, setCountries] = useState([
		["Egypt", "Cairo"],
		["UK", "London"],
	]);
	let [selected, setSelected] = useState("");
	function handleClick(x) {
		if (selected === "") setSelected(newSelected);

		// x.target.style.backgroVundColor = "black";
		// const countriesElement = document.getElementsByClassName("place");
		// for (let i = 0; i < countriesElement.length; i++) {
		// 	const element = countriesElement[i];
		// 	console.log(element);
		// }
	}
	return (
		<div className="flex gap-3 p-5" id="container">
			{countries
				.flat()
				.sort(() => Math.random() - 0.5)
				.map((x) => (
					<div
						key={x}
						onClick={() => handleClick(x)}
						className={`${selected === x ? "bg-amber-200" : "bg-blue-300"}`}
					>
						{x}
					</div>
				))}
		</div>
	);
}

export default Countries;
