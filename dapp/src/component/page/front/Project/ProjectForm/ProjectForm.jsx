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
import ProjectDescription from "../ProjetDescription/ProjectDescription";
// import Code from '@editorjs/code'
// import LinkTool from '@editorjs/link'
// import Image from '@editorjs/image'
// import Raw from '@editorjs/raw'
// import Quote from '@editorjs/quote'
// import Marker from '@editorjs/marker'
// import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter'
// import InlineCode from '@editorjs/inline-code'
// import SimpleImage from '@editorjs/simple-image'


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
        const [loading, setLoading] = useState(false);
        const [editorData, setEditorData] = useState(null);
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
                            backgroundColor: '#f5f1cc',
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
                            onChange: async (api, newData) => {
                                console.log('data changed: ', newData);
                                let data = await editorRef.current.save()
                                setEditorData(data);
                                console.log('Article data: ', data);
                            },
                            renderActions() {
                                editorRef.current.colorPicker = document.createElement('input');
                                editorRef.current.colorPicker.type = 'color';
                                editorRef.current.colorPicker.value = '#f5f1cc';
                                editorRef.current.colorPicker.hidden = true;

                                return this.colorPicker;
                            }
                            // Add configuration options for the editor if needed
                        }
                    )
                    ;
                }
                return () => {
                    editorRef.destroy();
                };
            }, []
        )
        ;


        const onSubmit = async (data) => {
            setLoading(true);
            let editorData = await editorRef.current.save();
            let json = JSON.stringify(editorData.blocks);

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
                    <div className="container-fluid  p-5 bg-stone-200 text-stone-900 dark:bg-stone-900 dark:text-stone-200">
                        <div className="sm:grid sm:grid-cols-2 gap-8 container mx-auto">
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
                                    {errors.endTime &&
                                        <p className="mt-2 text-sm text-red-600">{errors.endTime.message}</p>}
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
                            {/* Second Column */}
                            <div>
                                <div className="mb-4">
                                    {/* Rendered Content */}
                                    <h3 className="text-lg font-medium mb-2">Rendered Content:</h3>
                                    {editorData && (
                                        <>

                                        <ProjectDescription data={editorData.blocks}/>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Spinner/>
                )}
                <Footer/>
            </>
        );
    }
;

export default ProjectForm;
