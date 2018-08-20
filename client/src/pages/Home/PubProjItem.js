import React from "react";

const PubProjItem = ({project}) => (
    <div className="col s12 m6 l4 xl3">
        <div className="card grey lighten-4 z-depth-2">
            <div className="card-content">
            <span className="card-title">{project.repoName}</span>
            <p>{project.author}</p>
            <p>{project.description}</p>
            </div>
            <div className="card-action">
                <a href={`http://${project.username}-${project.projectName}.hernoku.us`}>Deployed Site</a>
                <a href={project.repoLink}>Source Code</a>
            </div>
        </div>
    </div>
);

export default PubProjItem;