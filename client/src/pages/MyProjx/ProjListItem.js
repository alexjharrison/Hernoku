import React from "react"

const ProjListItem = ({ remove, project, deployed, username }) => (
    <span>
        {deployed.map(depProj=>depProj.repoName).includes(project.name) ? (
            <li /*href={"/settings/"+project.name}*/ className="collection-item center">
                <a onClick={remove} data-reponame={project.name} className="waves-effect waves-light btn"><i className="material-icons left">remove_circle</i>remove</a>{" "}
                <strong>{project.name}</strong>
                {console.log(project,deployed,username)}
            </li>
        ):""}
    </span>
)

export default ProjListItem;