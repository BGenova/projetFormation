import React from "react";
import {NavBar} from "../../../partial/Navbar/NavBar";
import {Hero} from "../../../partial/Hero/Hero";
import {useContext} from "react";
import {MetamaskContext} from "../../../../App";
import ProjectForm from "../Project/ProjectForm/ProjectForm";


export function Home() {
    const {isMetamaskConnected, setMetamaskConnected} = useContext(MetamaskContext);
    return (
        <>
            <NavBar/>
            <div
                className="container-fluid mx-auto p-5 bg-stone-200 text-stone-900 dark:bg-stone-900 dark:text-stone-200">
                <Hero/>
                {/* Crée 3 colonne avec tailwindcss */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-48">
                    <div className="col-span-1">
                        <div className="bg-stone-100 dark:bg-stone-800 p-5 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">Colonne 1</h2>
                            <p>Notre plateforme met en relation des porteurs de projets engagés dans des domaines tels
                                que l'éducation, la santé, l'environnement et les initiatives communautaires avec une
                                communauté de donateurs passionnés. Vous pouvez découvrir une variété de projets
                                inspirants et choisir ceux auxquels vous souhaitez contribuer financièrement. Chaque don
                                compte et vous pouvez être sûr que votre soutien direct contribuera à faire une réelle
                                différence dans la réalisation de ces initiatives sociales.</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-stone-100 dark:bg-stone-800 p-5 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">Colonne 2</h2>
                            <p>Nous croyons en l'innovation et soutenons les entrepreneurs qui repoussent les limites.
                                Sur notre plateforme, vous pouvez explorer les idées et les projets de startups
                                prometteuses et investir dans celles qui vous enthousiasment. Que vous soyez un
                                investisseur chevronné ou simplement intéressé par l'entrepreneuriat, notre marché de
                                financement vous offre une opportunité unique de soutenir des entreprises novatrices et
                                de participer à leur croissance. Ensemble, nous construisons l'avenir.</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-stone-100 dark:bg-stone-800 p-5 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">Colonne 3</h2>
                            <p>En cas de situations d'urgence, de catastrophes naturelles ou de besoins spécifiques au
                                sein de la société, notre plateforme permet de collecter rapidement des fonds pour des
                                causes d'intérêt public. Vous pouvez contribuer à la reconstruction après une
                                catastrophe, à des initiatives caritatives ou à des organisations à but non lucratif qui
                                œuvrent pour le bien commun. Chaque donateur peut avoir un impact positif en soutenant
                                ces causes vitales et en faisant une différence concrète dans la vie des personnes
                                touchées.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}