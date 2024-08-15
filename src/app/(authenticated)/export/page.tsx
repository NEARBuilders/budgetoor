'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { FileExcelOutlined } from '@ant-design/icons'
import { Button, Col, Row, Spin, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography

export default function ExportPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isExporting, setIsExporting] = useState(false)

  const {
    data: projects,
    isLoading,
    refetch,
  } = Api.project.findMany.useQuery({
    where: { userId: user?.id },
  })

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Assuming there's an API endpoint to handle export
      const response = await fetch('/api/export-budget-overview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id }),
      })
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `budget-overview-${dayjs().format('YYYY-MM-DD')}.xlsx`
      document.body.appendChild(a)
      a.click()
      a.remove()
      enqueueSnackbar('Budget overview exported successfully!', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to export budget overview.', { variant: 'error' })
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" align="middle" style={{ textAlign: 'center' }}>
        <Col span={24}>
          <Title level={2}>Export Budget Overview</Title>
          <Paragraph>
            As a user, you can export the budget overview to a spreadsheet so
            that you can share or analyze it further.
          </Paragraph>
          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            onClick={handleExport}
            loading={isExporting}
          >
            Export to Spreadsheet
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}
