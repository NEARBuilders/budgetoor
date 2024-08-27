"use client";

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { DollarCircleOutlined } from '@ant-design/icons'
import { Card, Col, Row, Spin, Typography } from 'antd'
import dayjs from 'dayjs'
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
      <Title level={1}>Welcome to Your Budget Overview</Title>
      <Paragraph>
        Optimize your budget with intelligent recommendations.
      </Paragraph>

      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Card
            title="Budget Overview"
            bordered={false}
            extra={<DollarCircleOutlined />}
          >
            {projectsLoading ? (
              <Spin />
            ) : (
              projects?.map((project) => (
                <div key={project.id}>
                  <Title level={4}>{project.name}</Title>
                  <Text>Description: {project.description}</Text>
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
                  <br />
                  <Text>
                    Date Updated:{" "}
                    {dayjs(project.dateUpdated).format("MMMM D, YYYY")}
                  </Text>
                  <br />
                </div>
              ))
            )}
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
}
