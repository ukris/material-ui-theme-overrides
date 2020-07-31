import React from 'react'
import ProjectContext from 'context/project-context'
import { ProjectBar } from 'components'
import { useLocation, useHistory } from 'react-router-dom'

export interface ProjectProps {
    id?: string
}

const Project: React.FC<ProjectProps> = () => {
    const { currentProject, projects, setCurrentProject } = React.useContext(ProjectContext)
    const location = useLocation();
    const history = useHistory();
    const findProject = (projectId: string, projects: Array<any>) => {
        for (const project of projects) {
            if (project.id === projectId) {
                return project
            }
            else if (project.projects) {
                for (const nestedProject of project.projects) {
                    if (nestedProject.id === projectId) {
                        return nestedProject
                    }
                }
            }
        }
        return false
    }

    React.useEffect(() => {
        if (location.pathname.includes("projects")) {
            const projectId = location.pathname.split("/").slice(-1)[0]
            let project = findProject(projectId, projects || [])
            project ? setCurrentProject(project) : history.replace("/")
        }
        else {
            history.replace("/")
        }
    }, [])

    return (
        <>
            {
                currentProject ?
                    <ProjectBar
                        project={currentProject}
                    />
                    :
                    undefined
            }
        </>
    );
};

export default Project;