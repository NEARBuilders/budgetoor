"use client";

import dayjs from "dayjs";
import { Api } from "@/core/trpc";
import { PageLayout } from "@/designSystem/layouts/Page.layout";
import { Typography, Card, Flex } from "antd";
const { Title, Paragraph, Text } = Typography;
import Markdown from "react-markdown";
import { DownloadOutlined } from "@ant-design/icons";

export default function ProjectDetailsComponent({ projectId }) {
  const { data: project } = Api.project.findUnique.useQuery({
    where: { id: projectId },
    include: { user: true },
  });

  // Function to handle CSV download
  const handleDownload = () => {
    const csvContent = project.csv ?? project.overview;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${project.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ marginTop: 10 }}>
      {project && (
        <Card title="Project Overview">
          <Flex gap="middle" justify="space-between" align="center">
            <Title level={4}>{project.name}</Title>
            <DownloadOutlined
              style={{ fontSize: 20 }}
              onClick={handleDownload}
            />
          </Flex>
          <Text>
            <b> Description:</b> {project.description}
          </Text>
          <br />
          <Text>
            <b> Overview:</b>
            <Markdown>{project.overview}</Markdown>
          </Text>
          <br />

          <Text>
            <b> Date Created: </b>
            {dayjs(project.dateCreated).format("MMMM D, YYYY")}
          </Text>
          <br />
          <Text>
            <b> Date Updated: </b>
            {dayjs(project.dateUpdated).format("MMMM D, YYYY")}
          </Text>
          <br />
        </Card>
      )}
    </div>
  );
}
