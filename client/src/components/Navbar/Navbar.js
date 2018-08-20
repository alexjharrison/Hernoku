import React from 'react';

const Navbar = () => (
    <nav className="nav-extended">
        <div className="nav-wrapper purple darken-1">
            <a href="/" className="brand-logo center">HerNoku</a>
        </div>
        <div className="nav-content purple accent-2">
            <ul className="tabs tabs-transparent">
                <li className="tab"><a className={window.location.pathname === "/" ? "active" : ""} href="/">All Projects</a></li>
                <li className="tab"><a className={window.location.pathname === "/MyProjects" ? "active" : ""} href="/MyProjects">My Projects</a></li>
                <li className="tab"><a className={window.location.pathname === "/AddProject" ? "active" : ""} href="/AddProject">Add Project</a></li>
            </ul>
        </div>
    </nav>
)


export default Navbar;

// <Route exact path="/" component={Home} />
// <Route exact path="/AddProject" component={AddProj} />
// <Route exact path="/MyProjects" component={MyProjx} />
// <Route path="/Settings" component={Settings} />