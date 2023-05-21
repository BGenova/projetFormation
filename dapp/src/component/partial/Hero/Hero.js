import {useEffect, useContext, useRef, useState} from 'react'
import {MetamaskContext} from "../../../App";
import Typed from 'typed.js';
import {ButtonMetamask} from "../../service/Metamask/Metamask";
import {Link} from "react-router-dom";


const navigation = [
    {name: 'Product', href: '#'},
    {name: 'Features', href: '#'},
    {name: 'Marketplace', href: '#'},
    {name: 'Company', href: '#'},
]

export function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {isMetamaskConnected, setMetamaskConnected} = useContext(MetamaskContext);
    const textRef = useRef(null);
    const [showParagraph, setShowParagraph] = useState(false);


    const [disabled, setDisabled] = useState(isMetamaskConnected ? true : false);

    useEffect(() => {
        setDisabled(isMetamaskConnected);
    }, [isMetamaskConnected]);

    useEffect(() => {
        const options = {
            strings: ['Une DApp de financement participatif.'],
            typeSpeed: 50,
            loop: false,
            cursorChar: '', // Ajoute un curseur
            onComplete: (self) => {
                const textElement = self.el;
                textElement.textContent = textElement.textContent.replace('|', '');
                setShowParagraph(true);
                new Promise((resolve) => setTimeout(resolve, 100))
                    .then(() => {

                            window.document.getElementById("test").classList.add("show");
                        }
                    )


            },
        };

        const typed = new Typed(textRef.current, options);

        return () => {
            typed.destroy(); // Nettoie l'instance de Typed.js lors du démontage du composant
        };
    }, []);

    return (
        <div className="mx-auto max-w-2xl py-22 md:py-36 lg:py-36 h-screen">
            <div className="text-center">
                <h1 ref={textRef} className="text-4xl font-bold tracking-tight  sm:text-6xl">
                    Une DApp de financement participatif.
                </h1>
                {showParagraph && (

                    <p id={"test"} className={`mt-6 text-lg leading-8 text-gray-600 fade-up`}>
                        Bienvenue sur notre plateforme de crowdfunding décentralisé, où vous pouvez participer à la
                        réalisation de projets porteurs de sens et d'impact. Nous vous proposons trois services
                        uniques pour
                        vous permettre de soutenir des causes qui vous tiennent à cœur.
                    </p>
                )}
                {isMetamaskConnected.isMetamaskConnected ? (
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={!isMetamaskConnected.isMetamaskConnected}>
                            <Link to="/project/create">Add project</Link>
                        </button>
                        <button
                            disabled={!isMetamaskConnected.isMetamaskConnected}
                                onClick={() => {
                                    console.log(isMetamaskConnected)
                                }}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <Link to="/projects">Add project</Link>
                        </button>
                    </div>
                ) : (
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <ButtonMetamask/>
                    </div>
                )}


            </div>
        </div>
    )
}
