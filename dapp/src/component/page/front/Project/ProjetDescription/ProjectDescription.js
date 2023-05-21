import React from 'react';

const ProjectDescription = ({ data }) => {
    return (
        <div>
            {data.map((item) => {
                if (item.type === 'paragraph') {
                    return <p className={"mt-1 text-justify"} key={item.id}>{item.data.text}</p>;
                } else if (item.type === 'list') {
                    return (
                        <ul key={item.id}>
                            {item.data.items.map((listItem, index) => (
                                <li key={index}>{listItem}</li>
                            ))}
                        </ul>
                    );
                } else if (item.type === 'header') {
                    if (item.data.level === 2)
                    return (
                        <h2 className={"text-5xl my-2"} key={item.id}>{item.data.text}</h2>
                    ); else if (item.data.level === 3)
                    return (
                        <h3 className={"text-4xl my-2"} key={item.id}>{item.data.text}</h3>
                    ); else if (item.data.level === 4)
                    return (
                        <h4 className={"text-3xl my-2"} key={item.id}>{item.data.text}</h4>
                    ); else if (item.data.level === 5)
                    return (
                        <h5 className={"text-3xl my-2"} key={item.id}>{item.data.text}</h5>
                    ); else if (item.data.level === 6)
                    return (
                        <h6 className={"text-2xl my-2"} key={item.id}>{item.data.text}</h6>
                    )
                }
                else {
                    return null; // Ignorer les autres types non pris en charge
                }
            })}
        </div>
    );
};

export default ProjectDescription;
