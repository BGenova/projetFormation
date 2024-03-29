import React, {Fragment, useContext, useEffect, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {Button, Switch} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {ButtonMetamask} from "../../service/Metamask/Metamask";

function toogleTheme() {
    const htmlTag = document.getElementsByTagName("html")[0];
    if (htmlTag.classList.contains("dark")) {
        htmlTag.classList.remove("dark");
    } else {
        htmlTag.classList.add("dark");
    }
}

export function NavBar() {

    const [isDashBoard, setIsDashBoard] = useState(true);
    const [isTeam, setIsTeam] = useState(false);
    const [isProjects, setIsProjects] = useState(false);
    const [isProducts, setIsProducts] = useState(false);

    useEffect(() => {
            if (window.location.pathname === "/team") {
                setIsDashBoard(false);
                setIsTeam(true);
                setIsProjects(false);
                setIsProducts(false);
            } else if (window.location.pathname === "/project") {
                setIsDashBoard(false);
                setIsTeam(false);
                setIsProjects(true);
                setIsProducts(false);
            } else if (window.location.pathname === "/calendar") {
                setIsDashBoard(false);
                setIsTeam(false);
                setIsProducts(false);
                setIsProjects(false);
            } else if (window.location.pathname === "/products") {
                setIsDashBoard(false);
                setIsTeam(false);
                setIsProjects(false);
                setIsProducts(true);
            } else {
                setIsDashBoard(true);
                setIsTeam(false);
                setIsProjects(false);;
                setIsProducts(false);
            }
        }, []);



    const navigation = [
        {name: 'Dashboard', href: '#', current: isDashBoard},
        {name: 'Team', href: '/team', current: isTeam},
        {name: 'Products', href: '/products', current: isProducts},
        {name: 'Projects', href: '/project', current: isProjects},
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="bg-stone-200 dark:bg-stone-950">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/">
                                        <img
                                            className="block h-8 w-auto lg:hidden"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </Link>
                                    <Link to="/">
                                        <img
                                            className="hidden h-8 w-auto lg:block"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </Link>
                                    <Switch id="amber" color="amber" defaultChecked onChange={toogleTheme}/>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">

                                        {navigation.map((item) => (

                                            <Link to={item.href}
                                                  key={item.name}
                                                  className={classNames(
                                                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                      'rounded-md px-3 py-2 text-sm font-medium'
                                                  )}
                                                  aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}

                                    </div>
                                </div>
                            </div>


                            <div
                                className="absolute hidden sm:ml-6 sm:block inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <ButtonMetamask></ButtonMetamask>
                                {/*{isAuthenticated*/}
                                {/*    ? <Menu as="div" className="relative ml-3">*/}
                                {/*        <div>*/}
                                {/*            <Menu.Button*/}
                                {/*                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">*/}
                                {/*                <span className="sr-only">{isAuthenticated ? user.name : ""}</span>*/}
                                {/*                <img*/}
                                {/*                    className="h-8 w-8 rounded-full"*/}
                                {/*                    src={isAuthenticated ? user.picture : "https://www.gravatar.com/avatar/"}*/}
                                {/*                    alt=""*/}
                                {/*                />*/}
                                {/*            </Menu.Button>*/}
                                {/*        </div>*/}
                                {/*        <Transition*/}
                                {/*            as={Fragment}*/}
                                {/*            enter="transition ease-out duration-100"*/}
                                {/*            enterFrom="transform opacity-0 scale-95"*/}
                                {/*            enterTo="transform opacity-100 scale-100"*/}
                                {/*            leave="transition ease-in duration-75"*/}
                                {/*            leaveFrom="transform opacity-100 scale-100"*/}
                                {/*            leaveTo="transform opacity-0 scale-95"*/}
                                {/*        >*/}
                                {/*            <Menu.Items*/}
                                {/*                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">*/}
                                {/*                <Menu.Item>*/}
                                {/*                    {({active}) => (*/}
                                {/*                        <a*/}
                                {/*                            href="#"*/}
                                {/*                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                                {/*                        >*/}
                                {/*                            <Profile/>*/}
                                {/*                        </a>*/}
                                {/*                    )}*/}
                                {/*                </Menu.Item>*/}
                                {/*                <Menu.Item>*/}
                                {/*                    {({active}) => (*/}
                                {/*                        <LoginButton>kjhhbhj</LoginButton>*/}
                                {/*                    )}*/}
                                {/*                </Menu.Item>*/}
                                {/*                <Menu.Item>*/}
                                {/*                    {({active}) => (*/}
                                {/*                        <LogoutButton/>*/}
                                {/*                    )}*/}
                                {/*                </Menu.Item>*/}
                                {/*            </Menu.Items>*/}
                                {/*        </Transition>*/}
                                {/*    </Menu>*/}
                                {/*    : <GoogleConnectButton/>*/}
                                {/*}*/}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (

                                <Link to={item.href}
                                      key={item.name}
                                      as="a"
                                      href={item.href}
                                      className={classNames(
                                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                          'block rounded-md px-3 py-2 text-base font-medium'
                                      )}
                                      aria-current={item.current ? 'page' : undefined}

                                >  {item.name}
                                </Link>

                            ))}
                            <ButtonMetamask></ButtonMetamask>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
