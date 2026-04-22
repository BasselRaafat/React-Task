import React from "react";
import { Link, Outlet } from "react-router";

function About() {
	return (
		<div className="flex min-h-screen">
			<aside className="w-80 bg-base-200 p-4">
				<ul className="menu">
					<li>
						<Link to="/about/">Company</Link>
					</li>
					<li>
						<Link to="/about/users">Users</Link>
					</li>
				</ul>
			</aside>

			<main className="flex-1 flex items-center justify-center">
				<Outlet></Outlet>
			</main>
		</div>
	);
}

export default About;
