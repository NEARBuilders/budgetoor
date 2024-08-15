'use client'

import { Typography, Row, Col, Card, Spin } from 'antd'
import { DollarCircleOutlined, BulbOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: projects, isLoading: projectsLoading } =
    Api.project.findMany.useQuery({
      where: { userId: user?.id },
      include: { tasks: true, roles: true, staffs: true },
    })

  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  const [recommendations, setRecommendations] = useState<string>('')

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await generateText({
          prompt: 'Provide budgeting recommendations',
        })
        setRecommendations(response.answer)
      } catch (error) {
        enqueueSnackbar('Failed to fetch recommendations', { variant: 'error' })
      }
    }

    fetchRecommendations()
  }, [generateText])

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Welcome to Your Budget Overview</Title>
      <Paragraph>
        Learn about our product and optimize your budget with intelligent
        recommendations.
      </Paragraph>

      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={12}>
          <Card
            title="Budget Overview"
            bordered={false}
            extra={<DollarCircleOutlined />}
          >
            {projectsLoading ? (
              <Spin />
            ) : (
              projects?.map(project => (
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
                    Date Created:{' '}
                    {dayjs(project.dateCreated).format('MMMM D, YYYY')}
                  </Text>
                  <br />
                  <Text>
                    Date Updated:{' '}
                    {dayjs(project.dateUpdated).format('MMMM D, YYYY')}
                  </Text>
                  <br />
                </div>
              ))
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Predictive Budgeting & Recommendations"
            bordered={false}
            extra={<BulbOutlined />}
          >
            {recommendations ? (
              <Paragraph>{recommendations}</Paragraph>
            ) : (
              <Spin />
            )}
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
