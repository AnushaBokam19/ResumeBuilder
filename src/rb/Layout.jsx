import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import ContextHeader from "../components/ContextHeader";
import BuildPanel from "../components/BuildPanel";
import ProofFooter from "../components/ProofFooter";

const STEP_PATHS = [
  "/rb/01-problem",
  "/rb/02-market",
  "/rb/03-architecture",
  "/rb/04-hld",
  "/rb/05-lld",
  "/rb/06-build",
  "/rb/07-test",
  "/rb/08-ship"
];

function getStepIndex(pathname) {
  return STEP_PATHS.indexOf(pathname);
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const idx = getStepIndex(location.pathname);
  const stepNumber = idx >= 0 ? idx + 1 : null;

  return (
    <div>
      <div className="topbar">
        <div>AI Resume Builder</div>
        <div>{stepNumber ? `Project 3 — Step ${stepNumber} of 8` : "Project 3"}</div>
        <div className="status-badge">In Progress</div>
      </div>

      <div className="layout">
        <div className="context-header">
          <ContextHeader step={stepNumber} pathname={location.pathname} />
        </div>

        <div className="workspace-wrap">
          <main className="main">
            <Outlet />
          </main>
          <aside className="build-panel">
            <BuildPanel step={stepNumber} navigate={navigate} />
          </aside>
        </div>

        <div className="proof-footer">
          <ProofFooter />
        </div>
      </div>
    </div>
  );
}
