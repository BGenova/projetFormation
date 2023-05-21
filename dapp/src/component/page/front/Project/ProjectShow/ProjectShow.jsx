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
import ProjectDescription from "../ProjetDescription/ProjectDescription";
import Countdown from "react-countdown";
import ConversionForm from "../../../../form/ContributionForm/ContributionForm";

const reviews = {href: '#', average: 4, totalCount: 117}

const ArrayTex = [
    {
        "id": "3t9oHRvtTi",
        "type": "paragraph",
        "data": {
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis finibus erat, eget vehicula tortor dignissim bibendum. Vestibulum ac nisl id ante efficitur lacinia. Integer porta facilisis blandit. In sodales rutrum dolor quis ultrices. Phasellus in ultrices quam, ac consequat arcu. Sed et convallis sapien. Quisque rhoncus consectetur metus vel tristique. Nullam lacinia vestibulum leo, non facilisis lectus consectetur vitae. In hac habitasse platea dictumst. Pellentesque viverra risus nec ipsum finibus tempus. Phasellus porttitor erat tellus, eget maximus metus feugiat et. Cras sed fermentum risus."
        }
    },
    {
        "id": "PNLJmDn0oE",
        "type": "paragraph",
        "data": {
            "text": "Sed blandit ante mi, et fringilla libero imperdiet quis. Fusce sed justo sit amet velit laoreet finibus. Quisque eget malesuada tortor. Aenean varius vestibulum sem sit amet tincidunt. Phasellus ut vulputate risus, ac imperdiet dui. Vestibulum est lectus, tempus quis tortor quis, dignissim tempor ex. Sed eleifend massa sed dolor pulvinar, nec finibus ipsum venenatis. Ut dignissim pretium molestie. Fusce eu ante fringilla, sodales nisi vitae, pretium mi. Aenean ultrices nec tellus a mollis. Morbi ac ligula egestas elit euismod varius. Proin ullamcorper nisi ut ante fringilla, at congue massa hendrerit. Duis nec semper ipsum, sit amet mattis felis. Aenean sollicitudin mauris turpis, scelerisque pharetra magna dictum ac. Donec imperdiet scelerisque elit, ut ullamcorper nunc."
        }
    },
    {
        "id": "UP7VjFi5gJ",
        "type": "paragraph",
        "data": {
            "text": "In condimentum arcu sit amet tempus pretium. Curabitur suscipit iaculis porta. Aliquam nibh libero, vestibulum placerat eros eu, egestas venenatis massa. Cras mauris lorem, mattis et nulla in, convallis gravida justo. Phasellus metus felis, egestas quis pulvinar ut, faucibus at magna. Maecenas pharetra sapien eget sem bibendum fermentum. Fusce efficitur metus sit amet magna fermentum, sit amet ullamcorper quam congue. Nunc faucibus sem ante, vitae efficitur sem malesuada ac. Sed hendrerit ut diam in rhoncus. Etiam vel convallis nunc, at egestas mauris. Sed vehicula neque ac rutrum iaculis."
        }
    },
    {
        "id": "RxNvJLZDgQ",
        "type": "list",
        "data": {
            "style": "ordered",
            "items": [
                "15151515151",
                "1515",
                "1515"
            ]
        }
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function ProjectShow() {

    const {isMetamaskConnected, setMetamaskConnected} = useContext(MetamaskContext);
    const [contractManager, setContractManager] = useState(new ContractManager());
    const {id} = useParams();
    const [project, setProject] = useState([]);
    const [description, setDescription] = useState([]);

    const [fundingGoal, setFundingGoal] = useState(0);
    const [fundsRaised, setFundsRaised] = useState(0);

    const [endTime, setIsEndTime] = useState(new Date().getTime() + 10000000);

    // Transform the project's end time into a human-readable format.


    useEffect(() => {
        async function init() {
            await getById()
        }
        init().then(r => console.log("init"));
    }, [])


    useEffect(() => {
        // convert BigNumber to Number
        if (project && project['fundingGoal']) {
            const bigNumber = new BigNumber(project['fundingGoal']._hex);
            console.log(bigNumber); // "150"
            setFundingGoal(bigNumber["c"][0]);
        }
        if (project && project['fundsRaised']) {
            const bigNumber = new BigNumber(project['fundsRaised']._hex);
            console.log(bigNumber); // "150"
            setFundsRaised(bigNumber["c"][0]);
        }
        if (project && project['endTime']) {
            const bigNumber = new BigNumber(project['endTime']._hex);
            console.log(bigNumber); // "150"
            setIsEndTime(bigNumber["c"][0]);
        }
    }, [project])


    async function getById() {
        let response = await contractManager.getProject(id);
        setProject(response)
        console.log(response);
        console.log(response['description']);
        let response1 = JSON.parse(response['description']);
        console.log(response1);
        setDescription(response1);
    }

    async function buyProduct(id) {
        let response = await contractManager.contribute(id, 800)
            .then(async (response) => {
                toast.success("Product bought !");
                await new Promise(r => setTimeout(r, 5000));
                window.location.reload();
            })
            .catch((error) => {
                    toast.error("Error buying project !");
                }
            );
        setProject(response)
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
                                      className="font-medium">Products</Link>
                            </li>
                            <li className="text-sm">
                                <Link to={"/project/" + id} aria-current="page"
                                      className="font-medium"> {project ? project['name'] : null}</Link>
                            </li>
                        </ol>
                    </nav>


                    {/* Product info */}
                    <div
                        className="bg-stone-200 text-stone-900 dark:bg-stone-900 dark:text-stone-200 mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-stone-900 lg-dark:border-stone-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight  sm:text-3xl">{project ? project['name'] : null}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <h3 className="text-xl font-bold sm:text-xl">Owner :
                            </h3>
                            <p className="text-3xl tracking-tight ">
                                {project && project['owner']
                                    ? <a className={"text-sm text-indigo-600 hover:text-indigo-500 mb-10"} target={"_blank"}
                                           href={"https://sepolia.etherscan.io/address/" + project['owner']}>{project['owner']}</a>
                                    : "Not owned yet"
                                }
                            </p>

                            <p className="text-3xl tracking-tight mt-6">
                                {fundsRaised}/{fundingGoal} WEI -- {Math.round((fundsRaised / fundingGoal) * 100)}%
                            </p>

                            {fundsRaised < fundingGoal
                                ? <div className="relative w-full h-4 bg-gray-200 rounded-md mt-6">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-md"
                                        style={{width: `${(fundsRaised / fundingGoal) * 100}%`}}
                                    ></div>
                                </div>
                                : <div className="relative w-full h-4 bg-gray-200 rounded-md mt-6">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-md"
                                        style={{width: `100%`}}
                                    ></div>
                                </div>
                            }


                            <Countdown
                                date={endTime}
                                renderer={({ days, hours, minutes, seconds, completed }) => {
                                    if (completed) {
                                        return <span className="text-red-500">Ended</span>;
                                    } else {
                                        return (
                                            <div className="grid grid-cols-4 gap-4 text-center">
                                                <div>
                                                    <div className="text-3xl font-bold">{days}</div>
                                                    <div className="">Days</div>
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-bold">{hours}</div>
                                                    <div className="">Hours</div>
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-bold">{minutes}</div>
                                                    <div className="">Minutes</div>
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-bold">{seconds}</div>
                                                    <div className="">Seconds</div>
                                                </div>
                                            </div>
                                        );
                                    }
                                }}
                            />


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
                            {project && !project[0]
                                ? null
                                : <button
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => {
                                        buyProduct(id).then(r => {
                                            console.log(r)
                                        });
                                    }}
                                >Buy</button>
                            }

                            <ConversionForm/>
                        </div>

                        <div
                            className="py-4 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-stone-900 lg-dark:border-stone-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <ProjectDescription data={description}/>
                            <div className="my-2 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <img className={"w-full"}
                                     src={project['imageUrl']}
                                     alt="ui/ux review check"
                                />
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}


