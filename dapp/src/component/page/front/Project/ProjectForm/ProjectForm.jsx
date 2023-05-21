import React, {useContext, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Project} from '../../../../../model/projectModel';
import {MetamaskContext} from '../../../../../App';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {NavBar} from '../../../../partial/Navbar/NavBar';
import {Footer} from '../../../../partial/Footer/Footer';
import {Link} from 'react-router-dom';
import {ContractManager} from '../../../../../service/ContractManager/ContractManager';
import {Spinner} from '@material-tailwind/react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'


// Schema de validation avec Yup
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    // description: yup.string().required('Description is required'),
    imageUrl: yup.string().url('Invalid URL').required('Image URL is required'),
    fundingGoal: yup.number().required('Funding goal is required'),
    totalSupply: yup.number().required('Total Supply is required'),
    endTime: yup.date().required('End time is required'),
});

const ProjectForm = () => {
    const editorRef = useRef(null);
    const {isMetamaskConnected, setMetamaskConnected} = useContext(MetamaskContext);
    const [contractManager, setContractManager] = useState(new ContractManager());
    const [project, setProject] = useState(new Project('', '', '', '', 0, 0, 0));
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holderId: 'editor',
                defaultValue: {
                    time: 1635603431943,
                    blocks: [
                        {
                            id: "sheNwCUP5A",
                            type: "header",
                            data: {
                                text: "Editor.js",
                                level: 2
                            }
                        },
                        {
                            id: "12iM3lqzcm",
                            type: "paragraph",
                            data: {
                                text:
                                    "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                            }
                        },
                        {
                            id: "fvZGuFXHmK",
                            type: "header",
                            data: {
                                text: "Key features",
                                level: 3
                            }
                        },
                        {
                            id: "xnPuiC9Z8M",
                            type: "list",
                            data: {
                                style: "unordered",
                                items: [
                                    "It is a block-styled editor",
                                    "It returns clean data output in JSON",
                                    "Designed to be extendable and pluggable with a simple API"
                                ]
                            }
                        },
                        {
                            id: "-MhwnSs3Dw",
                            type: "header",
                            data: {
                                text: "What does it mean «block-styled editor»",
                                level: 3
                            }
                        },
                        {
                            id: "Ptb9oEioJn",
                            type: "paragraph",
                            data: {
                                text:
                                    'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
                            }
                        },
                        {
                            id: "-J7nt-Ksnw",
                            type: "paragraph",
                            data: {
                                text:
                                    'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
                            }
                        },
                        {
                            id: "SzwhuyoFq6",
                            type: "header",
                            data: {
                                text: "What does it mean clean data output",
                                level: 3
                            }
                        },
                        {
                            id: "x_p-xddPzV",
                            type: "paragraph",
                            data: {
                                text:
                                    "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
                            }
                        },
                        {
                            id: "6W5e6lkub-",
                            type: "paragraph",
                            data: {
                                text:
                                    'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
                            }
                        },
                        {
                            id: "eD2kuEfvgm",
                            type: "paragraph",
                            data: {
                                text:
                                    "Clean data is useful to sanitize, validate and process on the backend."
                            }
                        },
                        {
                            id: "N8bOHTfUCN",
                            type: "delimiter",
                            data: {}
                        },
                        {
                            id: "IpKh1dMyC6",
                            type: "paragraph",
                            data: {
                                text:
                                    "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
                            }
                        },
                        {
                            id: "FF1iyF3VwN",
                            type: "image",
                            data: {
                                file: {
                                    url: "https://codex.so/public/app/img/external/codex2x.png"
                                },
                                caption: "",
                                withBorder: false,
                                stretched: false,
                                withBackground: false
                            }
                        }
                    ]
                },
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                    },
                    embed: {
                        class: Embed,
                        inlineToolbar: true,
                    },
                    table: {
                        class: Table,
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                    warning: {
                        class: Warning,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+W',
                        config: {
                            titlePlaceholder: 'Title',
                            messagePlaceholder: 'Message'
                        }


                    },
                    // ...
                },
                // Add configuration options for the editor if needed
            });
        }
        return () => {
            //editor.destroy();
        };
    }, []);


    const onSubmit = async (data) => {
        setLoading(true);
        let editorData = await editorRef.current.save();
        console.log(editorData.blocks);
        // Convert editorData array to json

        let json = JSON.stringify(editorData.blocks);
        console.log(json);


        //editorData = editorData.blocks.map((block) => block.data.text).join('\n');

        await addProject(
            data.name,
            json,
            data.imageUrl,
            data.fundingGoal,
            data.endTime.getTime(),
            data.totalSupply
        ).then((response) => {
            console.log(response);
        });
    };

    const addProject = async (name, description, imageUrl, fundingGoal, endTime, totalSupply) => {

        await contractManager.createProject(name, description, imageUrl, fundingGoal, endTime, totalSupply)
            .then((result) => {
                console.log(result);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const selectedEndDate = watch('endTime');

    return (
        <>
            <NavBar/>
            {!loading ? (
                <div
                    className="container-fluid mx-auto p-5 bg-stone-200 text-stone-900 dark:bg-stone-900 dark:text-stone-200 h-screen">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name')}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium">
                                Description
                            </label>
                            <div id="editor" className="border-gray-300 rounded-md"></div>
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                            )}
                        </div>
                        {/*<div className="mb-4">*/}
                        {/*    <label htmlFor="description" className="block text-sm font-medium">*/}
                        {/*        Description*/}
                        {/*    </label>*/}
                        {/*    <textarea*/}
                        {/*        id="description"*/}
                        {/*        {...register('description')}*/}
                        {/*        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"*/}
                        {/*    ></textarea>*/}
                        {/*    {errors.description && (*/}
                        {/*        <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <div className="mb-4">
                            <label htmlFor="imageUrl" className="block text-sm font-medium">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="imageUrl"
                                {...register('imageUrl')}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors.imageUrl && (
                                <p className="mt-2 text-sm text-red-600">{errors.imageUrl.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fundingGoal" className="block text-sm font-medium">
                                Funding Goal
                            </label>
                            <input
                                type="number"
                                id="fundingGoal"
                                {...register('fundingGoal')}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors.fundingGoal && (
                                <p className="mt-2 text-sm text-red-600">{errors.fundingGoal.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalSupply" className="block text-sm font-medium">
                                Total supply
                            </label>
                            <input
                                type="number"
                                id="totalSupply"
                                {...register('totalSupply')}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors.totalSupply && (
                                <p className="mt-2 text-sm text-red-600">{errors.totalSupply.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endTime" className="block text-sm font-medium">
                                End Time
                            </label>
                            <DatePicker
                                id="endTime"
                                selected={selectedEndDate}
                                onChange={(date) => setValue('endTime', date)}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors.endTime && <p className="mt-2 text-sm text-red-600">{errors.endTime.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Submit
                        </button>
                        <Link id="test" to="/"
                              className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 m-2">
                            Create
                        </Link>
                    </form>
                </div>
            ) : (
                <Spinner/>
            )}
            <Footer/>
        </>
    );
};

export default ProjectForm;
