import React, {useEffect, useState} from "react";
import {useContext} from "react";
import {ContractManager} from "../../../../../service/ContractManager/ContractManager";
import {NavBar} from "../../../../partial/Navbar/NavBar";
import {Hero} from "../../../../partial/Hero/Hero";
import {MetamaskContext} from "../../../../../App";
import {Project} from "../../../../../model/projectModel";
import ProjectCard from "../ProjectCard/ProjectCard";
import Typed from "typed.js";
import {useRef} from "react";

export function Projects() {

    const {isMetamaskConnected, setMetamaskConnected} = useContext(MetamaskContext);
    const [contractManager, setContractManager] = useState(new ContractManager());
    const [products, setProducts] = useState([]);
    const textRef = useRef(null);

    useEffect(() => {
        console.log("useEffect");

        async function init() {
            await getProducts().then((response) => {
                console.log(response);
            });
        }

        init().then(r => console.log("init"));
    }, [])

    const getProducts = async () => {
        let response = await contractManager.getProjects();
        setProducts(response);
    }

    useEffect(() => {
        const options = {
            strings: ['Découvrez les projets de la communauté'],
            typeSpeed: 50,
            loop: false,
            cursorChar: '', // Ajoute un curseur invisible
        };

        const typed = new Typed(textRef.current, options);

        return () => {
            typed.destroy(); // Nettoie l'instance de Typed.js lors du démontage du composant
        };
    }, []);


    return (
        <>
            <NavBar/>
            <div
                className="container-fluid mx-auto p-5 bg-stone-200 text-stone-900 dark:bg-stone-900 dark:text-stone-200">
                <div className="mx-auto max-w-2xl py-22 md:py-36 lg:py-36">
                    <div className="text-center">
                        <h1 ref={textRef} className="text-4xl font-bold tracking-tight  sm:text-6xl">
                            Une DApp de financement participatif.
                        </h1>
                    </div>
                </div>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg: xl 2xl gap-4 mt-5">

                    {products ? products.map((item, index) => {
                            console.log(index);
                            /** @type {Project} */
                            let project = new Project(index,item['owner'], item['name'], item['description'], item['imageUrl'], item['fundingGoal'], item['totalSupply'], item['endTime']);
                            console.log(project);
                            console.log(project.totalSupply);
                            return <>
                                <ProjectCard project={project}/>
                            </>
                        }
                    ) : (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold">No products found</h1>
                        </div>

                    )}
                </div>
            </div>
        </>
    );
}