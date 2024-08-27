"use client";

import { Api } from "@/core/trpc"; // Adjust according to your setup
import { PageLayout } from "@/designSystem/layouts/Page.layout";
import ProjectDetailsComponent from "../../new/details";

export default function ProjectPage({ params }) {
  const { id } = params;

  const { data: project, isLoading } = Api.project.findUnique.useQuery({
    where: { id: id },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!project) return <div>Project not found</div>;

  return (
    <PageLayout layout="narrow">
      <ProjectDetailsComponent projectId={id} />
    </PageLayout>
  );
}
