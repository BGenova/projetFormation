import React, {useState} from "react";

import {Link, useParams} from "react-router-dom";
import {StarIcon} from '@heroicons/react/20/solid'
import {useEffect} from "react";
import {toast} from "react-toastify";
import BigNumber from "bignumber.js";
import {useContext} from "react";
import {MetamaskContext} from "../../../../../App";
import {ContractManager} from "../../../../../service/ContractManager/ContractManager";
import {NavBar} from "../../../../partial/Navbar/NavBar";

const reviews = {href: '#', average: 4, totalCount: 117}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function ProjectShow() {

    const {isMetamaskConnected, setMetamaskConnected} = useContext(MetamaskContext);
    const [contractManager, setContractManager] = useState(new ContractManager());
    const {id} = useParams();
    const [product, setProduct] = useState([]);

    const [price, setPrice] = useState(0);
    const [price1, setPrice1] = useState(0);

    useEffect(() => {
        async function init() {await getById()}
        init().then(r => console.log("init"));
    }, [])


    useEffect(() => {
        // convert BigNumber to Number
        if (product && product['fundingGoal']) {
            const bigNumber = new BigNumber(product['fundingGoal']._hex);
            console.log(bigNumber); // "150"
            setPrice(bigNumber["c"][0]);
        }
        if (product && product['fundsRaised']) {
            const bigNumber = new BigNumber(product['fundsRaised']._hex);
            console.log(bigNumber); // "150"
            setPrice1(bigNumber["c"][0]);
        }
    }, [product])


    async function getById() {
        let response = await contractManager.getProject(id);
        setProduct(response)
        console.log(response);
        console.log(response);
        console.log(response);
        console.log(response);
        console.log(response);

    }

    async function buyProduct(id) {
        let response = await contractManager.contribute(id,800)
            .then(async (response) => {
                toast.success("Product bought !");
                await new Promise(r => setTimeout(r, 5000));
                window.location.reload();
            })
            .catch((error) => {
                    toast.error("Error buying product !");
                }
            );
        setProduct(response)
        console.log(response);
    }


    return (
        <>
            <NavBar/>
            <div className="bg-stone-200 text-stone-900 dark:bg-stone-900 dark:text-stone-200">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list"
                            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li className="text-sm">
                                <Link to={"/products/"} aria-current="page"
                                      className="font-medium text-gray-500 hover:text-gray-600">Products</Link>
                            </li>
                            <li className="text-sm">
                                <Link to={"/product/" + id} aria-current="page"
                                      className="font-medium text-gray-500 hover:text-gray-600"> {product ? product['name'] : null}</Link>
                            </li>
                        </ol>
                    </nav>


                    {/* Product info */}
                    <div
                        className="bg-stone-200 text-stone-900 dark:bg-stone-900 dark:text-stone-200 mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight  sm:text-3xl">{product ? product[1] : null}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <h3 className="text-xl font-bold sm:text-xl">Owner :
                            </h3>
                            <p className="text-3xl tracking-tight ">
                                {product && !product[0]
                                    ?
                                    <>
                                        <a className={"text-sm text-indigo-600 hover:text-indigo-500"} target={"_blank"}
                                           href={"https://sepolia.etherscan.io/address/" + product[5]}>{product[5]}</a>
                                    </>
                                    : "Not owned yet"
                                }
                            </p>

                            {

                            }
                            <div className="relative w-full h-4 bg-gray-200 rounded-md">
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-md"
                                    style={{ width: `${(price1 / price) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-3xl tracking-tight">
                                {price1}/{price} ETH -- {Math.round((price1 / price) * 100)}%
                            </p>


                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating ? '' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>

                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href}
                                       className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>
                            {product && !product[0]
                                ? null
                                : <button
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => {
                                        buyProduct(id).then(r => {
                                            console.log(r)
                                        });
                                    }}
                                >
                                    Buy
                                </button>
                            }
                        </div>

                        <div
                            className="py-4 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                                <div className="mt-6 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <img className={"w-full"}
                                        src={product['imageUrl']}
                                        alt="ui/ux review check"
                                    />
                                </div>
                            <div>
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6 mt-10">
                                    <p className="text-base ">{product ? product[2] : null}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium ">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {/*{product1.highlights.map((highlight) => (*/}
                                        {/*    <li key={highlight} className="text-gray-400">*/}
                                        {/*        <span className="text-gray-600">{highlight}</span>*/}
                                        {/*    </li>*/}
                                        {/*))}*/}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium ">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product ?product[2] : null}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <img
                            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="ui/ux review check"
                        />
                    </div>
                </div>
            </div>
        </>
    )
        ;
}


