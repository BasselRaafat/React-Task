import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function ProductForm(props) {
	const baseUrl = "http://localhost:3000";
	const { items, categories, updateItemHandler, addNewItemHandler } = props;
	const navigate = useNavigate();
	const param = useParams();
	const MODE = param.id === "new" ? "Add" : "Edit";

	const [form, setForm] = useState({
		name: "",
		price: "",
		categoryId: "1",
	});

	useEffect(() => {
		if (MODE === "Edit") {
			const item = items.find((it) => param.id === it.id);
			if (item) setForm(item);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param.id, items]);

	const addNewItem = async (item) => {
		const { data } = await axios.post(`${baseUrl}/products/`, item);
		addNewItemHandler(data);
		navigate("/admin");
		toast.success("Item Added successfully");
	};
	const updateItem = async (item) => {
		await axios.put(`${baseUrl}/products/${param.id}`, item);
		updateItemHandler({ ...item, id: param.id });
		navigate("/admin");
		toast.success("Item udpated successfully");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newItem = {
			name: form.name,
			price: +form.price,
			categoryId: +form.categoryId,
			isInCart: form.isInCart ?? false,
			count: form.count ?? 0,
		};

		try {
			if (MODE === "Edit") await updateItem(newItem);
			else if (MODE === "Add") await addNewItem(newItem);
		} catch {
			toast.error("somthing went wrong pleas try again later");
		}
	};

	const handleForm = (e) => {
		const { target } = e;
		setForm({ ...form, [target.name]: target.value });
	};

	return (
		<div>
			<form className="form m-auto w-100 h-100 pt-20" onSubmit={handleSubmit}>
				<div className="">
					<label htmlFor="name" className="pb-1 block">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="input "
						onChange={handleForm}
						value={form.name}
					/>
				</div>
				<div className="">
					<label htmlFor="price" className="pb-1 block">
						Price
					</label>
					<input
						type="text"
						id="price"
						name="price"
						className="input"
						onChange={handleForm}
						value={form.price}
					/>
				</div>
				<div>
					<label htmlFor="categoryId" className="pb-1 block">
						Category
					</label>
					<select
						name="categoryId"
						id="categoryId"
						className="select"
						onChange={handleForm}
						value={form.categoryId}
					>
						{categories.map((ca) => (
							<option key={ca.id} name="category" value={ca.id} className="">
								{ca.name}
							</option>
						))}
					</select>
				</div>
				<button type="submit" className="btn btn-accent mt-4 ">
					{MODE === "Edit" ? "Update Product" : "Add Product"}
				</button>
			</form>
		</div>
	);
}
