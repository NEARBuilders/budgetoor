'use client'

import { useUserContext } from '@/core/context'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { SyncOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography

export default function IntegrationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [integrations, setIntegrations] = useState([])
  /*const {
    data: integrations,
    isLoading,
    refetch,
  } = Api.integration.findMany.useQuery({})*/

  const handleIntegration = async (integrationId: string) => {
    try {
      //const { mutateAsync: integrate } = Api.integration.create.useMutation()
      //await integrate({ data: { userId: user.id, integrationId } })
      //enqueueSnackbar('Integration successful!', { variant: 'success' })
      //refetch()
    } catch (error) {
      enqueueSnackbar('Integration failed. Please try again.', {
        variant: 'error',
      })
    }
  }

  /*if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }*/

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Integrate with Other Web Apps</Title>
      <Paragraph>
        Use the Swagger API to integrate this app with other web applications
        and streamline your workflow.
      </Paragraph>
      <Row gutter={[16, 16]}>
        {integrations?.map(integration => (
          <Col key={integration.id} xs={24} sm={12} md={8} lg={6}>
            <div
              style={{
                border: '1px solid #f0f0f0',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <Text strong>{integration.name}</Text>
              <Paragraph>{integration.description}</Paragraph>
              <Button
                type="primary"
                icon={<SyncOutlined />}
                onClick={() => handleIntegration(integration.id)}
              >
                Integrate
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
