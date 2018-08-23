import React from "react"

const NewListItem = ({ project, deployed, username }) => (
    <div>
        {console.log(project,deployed,username)}
            
                {!deployed.map(depProj=>depProj.repoName).includes(project.name) ? (
                    <a href={"/settings/"+project.name} className="collection-item">
                        <strong>{project.name}</strong>
                    </a>
                ):""}
        
    </div>
)

export default NewListItem;