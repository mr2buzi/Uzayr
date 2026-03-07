import { startTransition, useEffect, useState } from "react";
import type { AudienceMode, ProjectTag } from "../types";

const validModes: AudienceMode[] = ["plain", "balanced", "technical"];
const validTags: Array<ProjectTag | "all"> = [
  "all",
  "systems",
  "ai-data",
  "full-stack",
  "embedded",
  "security",
  "automation",
];

function readStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const tag = params.get("tag");
  const project = params.get("project");

  return {
    mode: validModes.includes(mode as AudienceMode)
      ? (mode as AudienceMode)
      : "plain",
    tag: validTags.includes(tag as ProjectTag | "all")
      ? (tag as ProjectTag | "all")
      : "all",
    project: project ?? null,
  };
}

export function usePortfolioState() {
  const [state, setState] = useState(readStateFromUrl);

  useEffect(() => {
    const onPopState = () => {
      startTransition(() => {
        setState(readStateFromUrl());
      });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (state.mode !== "plain") {
      params.set("mode", state.mode);
    }
    if (state.tag !== "all") {
      params.set("tag", state.tag);
    }
    if (state.project) {
      params.set("project", state.project);
    }

    const next = params.toString();
    const target = `${window.location.pathname}${next ? `?${next}` : ""}`;
    const current = `${window.location.pathname}${window.location.search}`;

    if (current !== target) {
      window.history.replaceState({}, "", target);
    }
  }, [state]);

  return {
    ...state,
    setMode: (mode: AudienceMode) => setState((current) => ({ ...current, mode })),
    setTag: (tag: ProjectTag | "all") => setState((current) => ({ ...current, tag })),
    setProject: (project: string | null) =>
      setState((current) => ({ ...current, project })),
  };
}
