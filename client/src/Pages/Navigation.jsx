import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../Components/Contexts/AuthContext";

import UserContext from "../Components/Contexts/UserContext";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
	const { user, setUser } = useContext(UserContext);
	const { setIsLoggedIn } = useContext(AuthContext);

	const navigate = useNavigate();

	function handleSignout() {
		fetch(`/logout`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					setIsLoggedIn(false);
					setUser(null);
					response.json().then((response) => navigate("/signin"));
				} else {
					throw new Error("\n\nNAVIGATION COMPONENT: logout issue detected");
				}
			})
			.catch((error) => console.log("\n\nNAVIGATION COMPONENT: ", error));
	}

	return (
		<Disclosure as="nav" className="shadow-md">
			{({ open }) => (
				<>
					<div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50">
						<div className="flex h-16 justify-between">
							<div className="flex">
								<div className="flex flex-shrink-0 items-center" />
								<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link
										to="/explore"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-gray-300">
										Explore
									</Link>
									<Link
										to="/matches"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-gray-300">
										Matches
									</Link>
									<Link
										to="/about"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-gray-300">
										About
									</Link>
								</div>
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								<button
									type="button"
									className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
									<span className="sr-only">View notifications</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>

								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
											<span className="sr-only">Open user menu</span>
											<img
												className="h-8 w-8 rounded-full object-cover"
												src={user.profile_picture_url}
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95">
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<Link
														to="/profile"
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}>
														Your Profile
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<Link
														to="/settings"
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}>
														Settings
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<span
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700 cursor-pointer"
														)}
														onClick={handleSignout}>
														Sign out
													</span>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 pt-2 pb-3">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
							<Disclosure.Button className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700">
								<Link to="/explore">Explore</Link>
							</Disclosure.Button>
							<Disclosure.Button className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
								<Link to="/matches">Matches</Link>
							</Disclosure.Button>
							<Disclosure.Button className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
								<Link to="/about">About</Link>
							</Disclosure.Button>
						</div>
						<div className="border-t border-gray-200 pt-4 pb-3">
							<div className="flex items-center px-4">
								<div className="flex-shrink-0">
									<img
										className="h-10 w-10 rounded-full object-cover"
										src={user.profile_picture_url}
										alt="userimage"
									/>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-gray-800">
										Tom Cook
									</div>
									<div className="text-sm font-medium text-gray-500">
										tom@example.com
									</div>
								</div>
								<button
									type="button"
									className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
									<span className="sr-only">View notifications</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
							<div className="mt-3 space-y-1">
								<Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
									<Link to="/profile">Your Profile</Link>
								</Disclosure.Button>
								<Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
									<Link to="/settings">Settings</Link>
								</Disclosure.Button>
								<Disclosure.Button
									href="https://google.com/"
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
									<span onClick={handleSignout}>Sign out</span>
								</Disclosure.Button>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
export default Navigation;
