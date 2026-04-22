import CartItem from "../components/CartItem";

function Cart(props) {
	return (
		<div className="">
			<div>
				{props.items.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						increaseHandler={props.increaseHandler}
						decreaseHandler={props.decreseHandler}
						deleteHandler={props.deleteHandler}
					/>
				))}
			</div>
			<div>
				<button className="btn" onClick={props.clearAllHandler}>
					Clear All
				</button>
			</div>
		</div>
	);
}

export default Cart;
