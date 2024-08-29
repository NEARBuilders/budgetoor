"use client";

import { Api } from "@/core/trpc";
import { DownloadOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
import Markdown from "react-markdown";
const { Title, Text } = Typography;

export default function ProjectDetailsComponent({ projectId }) {
  const { data: project } = Api.project.findUnique.useQuery({
    where: { id: projectId },
    include: { user: true },
  });

  // Function to handle CSV download
  const handleDownload = () => {
    const csvContent = project.csv;
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
    <div style={{ marginTop: 20 }}>
      {project && (
        <Card title="Project Overview">
          <Flex gap="middle" justify="space-between" align="center">
            <Title level={4}>{project.name}</Title>
            <DownloadOutlined
              style={{ fontSize: 20 }}
              onClick={handleDownload}
            />
          </Flex>
          <br />
          <Text>
            <Markdown>{project.overview}</Markdown>
          </Text>
        </Card>
      )}
    </div>
  );
}
