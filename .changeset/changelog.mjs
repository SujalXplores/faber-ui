import { execFileSync } from "node:child_process";

const SQUASHED_PULL_REQUEST = /\(#(\d+)\)$/;
const MERGED_PULL_REQUEST = /^Merge pull request #(\d+)/;

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function pullRequestOf(commit) {
  try {
    const squashed = SQUASHED_PULL_REQUEST.exec(
      git("log", "-1", "--format=%s", commit),
    );
    if (squashed) return squashed[1];

    const mergeSubjects = git(
      "log",
      "--ancestry-path",
      "--merges",
      "--reverse",
      "--format=%s",
      `${commit}..HEAD`,
    ).split("\n");

    for (const subject of mergeSubjects) {
      const merged = MERGED_PULL_REQUEST.exec(subject);
      if (merged) return merged[1];
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function referenceOf(commit) {
  if (!commit) return "";
  const pullRequest = pullRequestOf(commit);
  const shortCommit = commit.slice(0, 7);
  return pullRequest
    ? `${shortCommit} (#${pullRequest}): `
    : `${shortCommit}: `;
}

async function getReleaseLine(changeset) {
  const [firstLine, ...futureLines] = changeset.summary
    .split("\n")
    .map((line) => line.trimEnd());

  const head = `- ${referenceOf(changeset.commit)}${firstLine}`;
  if (futureLines.length === 0) return head;
  return `${head}\n${futureLines.map((line) => `  ${line}`).join("\n")}`;
}

async function getDependencyReleaseLine(changesets, dependenciesUpdated) {
  if (dependenciesUpdated.length === 0) return "";

  const commits = changesets
    .map((changeset) => changeset.commit?.slice(0, 7))
    .filter(Boolean);
  const head = `- Updated dependencies${commits.length ? ` [${commits.join(", ")}]` : ""}`;
  const packages = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
  );

  return [head, ...packages].join("\n");
}

export default { getReleaseLine, getDependencyReleaseLine };
