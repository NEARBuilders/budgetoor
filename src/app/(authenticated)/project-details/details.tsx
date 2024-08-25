"use client";

import dayjs from "dayjs";
import { Api } from "@/core/trpc";
import { PageLayout } from "@/designSystem/layouts/Page.layout";
import { Typography, Card } from "antd";
const { Title, Paragraph, Text } = Typography;

export default function ProjectDetailsComponent({ projectId }) {
  const { data: project } = Api.project.findUnique.useQuery({
    where: { id: projectId },
    include: { user: true },
  });

  return (
    <PageLayout layout="narrow">
      {project && (
        <Card title="Project Overview">
          <Title level={4}>{project.name}</Title>
          <Text>Description: {project.description}</Text>
          <br />
          <Text>Overview: {project.overview}</Text>
          <br />
          <Text>Time Estimate: {project.timeEstimate?.toString()} hours</Text>
          <br />
          <Text>Budget Buffer: ${project.budgetBuffer?.toString()}</Text>
          <br />
          <Text>Profit Margin: {project.profitMargin?.toString()}%</Text>
          <br />
          <Text>
            Date Created: {dayjs(project.dateCreated).format("MMMM D, YYYY")}
          </Text>
          <br />
          <Text>
            Date Updated: {dayjs(project.dateUpdated).format("MMMM D, YYYY")}
          </Text>
          <br />
        </Card>
      )}
    </PageLayout>
  );
}
