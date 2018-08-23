import React from "react"

const ProjListItem = ({ remove, project, deployed, username }) => (
    <span>
        {deployed.map(depProj=>depProj.repoName).includes(project.name) ? (
            <li /*href={"/settings/"+project.name}*/ className="collection-item">
                <strong>{project.name}</strong>
                <a onClick={remove} data-repoName={project.name} className="waves-effect waves-light btn right"><i class="material-icons left">remove_circle</i>remove</a>
                {console.log(project,deployed,username)}
            </li>
        ):""}
    </span>
)

export default ProjListItem;