import React from "react";
import Product from "../components/Product";

function Home(props) {
	const {
		items,
		categories,
		addToCartHandler,
		selectedCategory,
		categoryFilterHandler,
		paginationHandler,
		pageNumber,
		pagesCount,
		loading,
		dataError,
	} = props;

	return (
		<div className="grid grid-cols-4 justify-evenly items-baseline">
			<table className="table">
				<thead>
					<tr>
						<th>Filter By Category</th>
					</tr>
				</thead>
				<tbody>
					{[{ id: 0, name: "All" }, ...categories].map((c) => (
						<tr onClick={() => categoryFilterHandler(c.id)} key={c.id}>
							<td className={selectedCategory === c.id ? "bg-gray-300" : ""}>
								{c.name}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<table className="table col-span-3">
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{items.map((it) => (
							<Product
								item={it}
								key={it.id}
								addToCartHandler={addToCartHandler}
							/>
						))}
					</tbody>
				</table>
				<div className="join">
					{pagesCount > 1 &&
						Array.from({ length: pagesCount }, (_, i) => i + 1).map((x) => (
							<button
								key={x}
								onClick={() => paginationHandler(x)}
								className={`join-item btn  ${pageNumber === x ? "btn-active" : ""}`}
							>
								{x}
							</button>
						))}
				</div>
			</div>
		</div>
	);
}

export default Home;
