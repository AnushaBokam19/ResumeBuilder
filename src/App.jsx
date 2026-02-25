import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./rb/Layout";
import StepPage from "./rb/Step";
import Proof from "./rb/Proof";

// Premium app imports
import PremiumLayout from "./premium/Layout";
import Home from "./premium/Home";
import Builder from "./premium/Builder";
import Preview from "./premium/Preview";
import ProofMain from "./premium/ProofMain";

const STEP_ROUTES = [
  "/rb/01-problem",
  "/rb/02-market",
  "/rb/03-architecture",
  "/rb/04-hld",
  "/rb/05-lld",
  "/rb/06-build",
  "/rb/07-test",
  "/rb/08-ship"
];

function getStepIndexForPath(pathname) {
  return STEP_ROUTES.indexOf(pathname);
}

function ProtectedStep({ children }) {
  const location = useLocation();
  const idx = getStepIndexForPath(location.pathname);
  if (idx === -1) return children;

  // Check for previous artifacts
  for (let i = 0; i < idx; i++) {
    const key = `rb_step_${i + 1}_artifact`;
    if (!localStorage.getItem(key)) {
      // redirect to first incomplete step
      return <Navigate to={STEP_ROUTES[i]} replace />;
    }
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Premium app routes */}
      <Route path="/" element={<PremiumLayout />}>
        <Route index element={<Home />} />
        <Route path="builder" element={<Builder />} />
        <Route path="preview" element={<Preview />} />
        <Route path="proof" element={<ProofMain />} />
      </Route>

      <Route
        path="/rb/*"
        element={
          <ProtectedStep>
            <Layout />
          </ProtectedStep>
        }
      >
        <Route path="01-problem" element={<StepPage step={1} title="Problem" />} />
        <Route path="02-market" element={<StepPage step={2} title="Market" />} />
        <Route path="03-architecture" element={<StepPage step={3} title="Architecture" />} />
        <Route path="04-hld" element={<StepPage step={4} title="HLD" />} />
        <Route path="05-lld" element={<StepPage step={5} title="LLD" />} />
        <Route path="06-build" element={<StepPage step={6} title="Build" />} />
        <Route path="07-test" element={<StepPage step={7} title="Test" />} />
        <Route path="08-ship" element={<StepPage step={8} title="Ship" />} />
        <Route path="proof" element={<Proof />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
