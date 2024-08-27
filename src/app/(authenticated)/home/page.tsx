"use client";

import { useUserContext } from "@/core/context";
import { Api } from "@/core/trpc";
import { PageLayout } from "@/designSystem/layouts/Page.layout";
import { DollarCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row, Spin, Typography, Button, Flex } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
  const { user } = useUserContext();

  const { data: projects, isLoading: projectsLoading } =
    Api.project.findMany.useQuery({
      where: { userId: user?.id },
      include: { tasks: true, roles: true, staffs: true },
    });

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Welcome to Budgetoor!</Title>
      <Paragraph>
        Manage your projects and optimize your budget with intelligent
        recommendations.
      </Paragraph>

      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Card
            title="Past Projects"
            bordered={false}
            extra={<DollarCircleOutlined />}
          >
            {projectsLoading ? (
              <Spin />
            ) : projects?.length ? (
              <Flex gap="large" vertical>
                {projects.map((project) => (
                  <Link href={`/project/${project.id}`} key={project.id}>
                    <Card title={project.name} bordered={true}>
                      <Text>{project.description}</Text>
                      <br />
                      <Text>
                        Time Estimate: {project.timeEstimate?.toString()} hours
                      </Text>
                      <br />
                      <Text>
                        Budget Buffer: ${project.budgetBuffer?.toString()}
                      </Text>
                      <br />
                      <Text>
                        Profit Margin: {project.profitMargin?.toString()}%
                      </Text>
                      <br />
                      <Text>
                        Date Created:{" "}
                        {dayjs(project.dateCreated).format("MMMM D, YYYY")}
                      </Text>
                    </Card>
                  </Link>
                ))}
              </Flex>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    display: "block",
                    marginBottom: "20px",
                  }}
                >
                  It doesn't seem you have any projects made.
                </Text>
                <Link href="/new">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    style={{
                      width: "100%",
                      height: "150px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                  >
                    Go create a new project
                  </Button>
                </Link>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
}
