import { BrowserRouter, Route, Routes } from "react-router";
import Countries from "./components/Countries";
import Company from "./components/Company";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import User from "./components/User";
import About from "./pages/About";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import "./App.css";
import ProductForm from "./pages/ProductForm";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function App() {
	const baseUrl = "http://localhost:3000";
	const categories = [
		{ id: 1, name: "Pizze", isSelected: false },
		{ id: 2, name: "Chees Cake", isSelected: false },
		{ id: 3, name: "White Cake", isSelected: false },
		{ id: 4, name: "Cinappon", isSelected: true },
	];
	const [items, setItems] = useState([]);
	const [selectedCategory, setSelectCategory] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(true);
	const [dataError, setDataError] = useState(null);

	const increaseHandler = (item) => {
		//clone
		//edit
		let newItem = items.map((itm) =>
			itm.id === item.id ? { ...itm, count: itm.count + 1 } : itm,
		);
		//set state
		setItems(newItem);
	};
	const decreseHandler = (item) => {
		//clone
		//edit
		let newItem = items.map((itm) =>
			itm.id === item.id
				? { ...itm, count: itm.count ? item.count - 1 : item.count }
				: itm,
		);
		//set state
		setItems(newItem);
	};
	const deleteHandler = (id) => {
		const newItems = items.filter((it) => it.id !== id);
		setItems(newItems);
	};
	const clearAllHandler = () => {
		// setItems([]);
		const newItems = items.map((it) => ({
			...it,
			isInCart: !it.isInCart,
			count: 0,
		}));
		setItems(newItems);
	};
	const addToCartHandler = (item) => {
		const newItems = items.map((it) =>
			it.id === item.id ? { ...it, isInCart: !it.isInCart } : it,
		);
		setItems(newItems);
	};
	const paginationHandler = (page) => {
		setPageNumber(page);
	};

	const addNewItemHandler = (item) => setItems([...items, item]);
	const updateItemHandler = (item) => {
		const newItems = items.map((it) => (it.id === item.id ? item : it));
		setItems(newItems);
	};
	//------------------------------filters----------------------
	const categoryFilterHandler = (categoryId) => {
		setPageNumber(1);
		setSelectCategory(categoryId);
	};
	const itemsRestorHandler = (items) => {
		setItems(items);
	};
	useEffect(() => {
		console.log("From Use Eeffect from App.jsx");

		const fetchData = async () => {
			try {
				const { data } = await axios.get(`${baseUrl}/products/`);
				console.log("Data Fetech", data);

				setItems(data);
			} catch (e) {
				setDataError("Something went wrong please try again", e);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const pageSize = 3;
	const filteredItems = selectedCategory
		? items.filter((it) => it.categoryId == selectedCategory)
		: items;

	const pagesCount = Math.ceil(filteredItems.length / pageSize);

	const paginatedItems = filteredItems.slice(
		(pageNumber - 1) * pageSize,
		pageNumber * pageSize,
	);

	return (
		<>
			<ToastContainer />
			<Navbar
				cartCount={items?.reduce((acc, current) => acc + current.count, 0)}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							items={paginatedItems}
							addToCartHandler={addToCartHandler}
							categories={categories}
							selectedCategory={selectedCategory}
							categoryFilterHandler={categoryFilterHandler}
							paginationHandler={paginationHandler}
							pageNumber={pageNumber}
							pagesCount={pagesCount}
							loading={loading}
							dataError={dataError}
						/>
					}
				/>
				<Route path="/about" element={<About />}>
					<Route path="" element={<Company />} />
					<Route path="users" element={<User />} />
				</Route>
				<Route
					path="/Cart"
					element={
						<Cart
							items={items.filter((it) => it.isInCart)}
							increaseHandler={increaseHandler}
							decreseHandler={decreseHandler}
							deleteHandler={deleteHandler}
							clearAllHandler={clearAllHandler}
						/>
					}
				/>
				<Route
					path="/admin"
					element={
						<Admin
							items={items}
							categories={categories}
							loading={loading}
							dataError={dataError}
							deleteHandler={deleteHandler}
							itemsRestorHandler={itemsRestorHandler}
						/>
					}
				></Route>
				<Route
					path="/products/:id"
					element={
						<ProductForm
							categories={categories}
							items={items}
							updateItemHandler={updateItemHandler}
							addNewItemHandler={addNewItemHandler}
						/>
					}
				></Route>
				<Route path="/countries" element={<Countries />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</>
	);
	// return <Countries />;
	// return <Cart />;
}

export default App;
