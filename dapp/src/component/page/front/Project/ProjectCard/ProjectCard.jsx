import React, {useEffect, useState} from 'react';
import Countdown from 'react-countdown';
import {Link} from "react-router-dom";

export function ProjectCard({project}) {

    console.log(project);
    // Transform the project's end time into a human-readable format.
    const endTime = new Date(project.endTime).toLocaleString();
    console.log(project.id);
    console.log(endTime);
    return (
        <div className="max-w-md mx-auto shadow-md rounded-md overflow-hidden">
            <img src={project.imageUrl} alt={project.name} className="w-full h-64 object-cover"/>
                <Countdown
                    date={endTime}
                    renderer={({days, hours, minutes, seconds, completed}) => {
                        if (completed) {
                            return <span>Ended</span>;
                        } else {
                            return (
                                <span>
                                    {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
                                </span>
                            );
                        }
                    }
                    }
                />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <p className="text-gray-600 mb-2">Funding Goal:{project.fundingGoal}</p>
                <p className="text-gray-600 mb-2">End Time: {project.endTime}</p>
                <p className="text-gray-600 mb-2">Total Supply: {project.totalSupply}</p>
                <p className="text-gray-600 mb-2">Total Supply: {project.id}</p>
                <Link to={`/project/${project.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Project
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
