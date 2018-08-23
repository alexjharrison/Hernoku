import React from "react"

const ProjListItem = ({ project, deployed, username }) => (
    <span>
        {deployed.map(depProj=>depProj.repoName).includes(project.name) ? (
            <a href={"/settings/"+project.name} className="collection-item">
            <strong>{project.name}</strong>
            {console.log(project,deployed,username)}
        </a>
        ):""}
    </span>
)

export default ProjListItem;