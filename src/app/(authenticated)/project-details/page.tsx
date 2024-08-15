'use client'

import dayjs from 'dayjs'
import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { Button, Form, Input, Typography, Card, Spin } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
const { Title, Paragraph, Text } = Typography

export default function ProjectDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()

  const { mutateAsync: createProject } = Api.project.create.useMutation()
  const { mutateAsync: updateProject } = Api.project.update.useMutation()
  const { mutateAsync: handleCurlRequest, isLoading: isLoadingWordWare } =
    Api.wordware.handleCurlRequest.useMutation()

  const { data: project, isLoading: projectLoading } = Api.project.findUnique.useQuery({
    where: { id: params.id },
    include: { user: true },
  })

  const handleFormSubmit = async (values: any) => {
    try {
      const projectCreated = await createProject({
        data: {
          name: values.name,
          description: values.description,
          timeEstimate: values.timeEstimate,
          budgetBuffer: values.budgetBuffer,
          location: values.location,
          profitMargin: values.profitMargin,
          userId: user.id,
        },
      })
      enqueueSnackbar('Project created successfully', { variant: 'success' })

      // Call the wordware router to handle the cURL request
      const response = await handleCurlRequest({
        body: values,
      })

      await updateProject({
        where: { id: projectCreated.id },
        data: { overview: response?.overview },
      })

      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to create project', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Project Details</Title>
      <Paragraph>
        Please fill out the form below to provide necessary information for
        budget estimation.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="name"
          label="Project Name"
          rules={[{ required: true, message: 'Please enter the project name' }]}
        >
          <Input.TextArea placeholder="Enter project name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Project Details"
          rules={[
            { required: true, message: 'Please enter the project details' },
          ]}
        >
          <Input.TextArea placeholder="Enter project details" />
        </Form.Item>
        <Form.Item
          name="timeEstimate"
          label="Time Estimates"
          rules={[
            { required: true, message: 'Please enter the time estimates' },
          ]}
        >
          <Input.TextArea placeholder="Enter time estimates" />
        </Form.Item>
        <Form.Item
          name="budgetBuffer"
          label="Budget Buffers"
          rules={[
            { required: true, message: 'Please enter the budget buffers' },
          ]}
        >
          <Input.TextArea placeholder="Enter budget buffers" />
        </Form.Item>
        <Form.Item
          name="task_breakdown"
          label="Task Breakdown"
          rules={[
            { required: true, message: 'Please enter the task breakdown' },
          ]}
        >
          <Input.TextArea placeholder="Enter task breakdown" />
        </Form.Item>
        <Form.Item
          name="roles_seniority"
          label="Roles Seniority"
          rules={[
            { required: true, message: 'Please enter the roles seniority' },
          ]}
        >
          <Input.TextArea placeholder="Enter roles seniority" />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter the location' }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>
        <Form.Item
          name="payroll"
          label="Payroll"
          rules={[{ required: true, message: 'Please enter the payroll' }]}
        >
          <Input.TextArea placeholder="Enter payroll" />
        </Form.Item>
        <Form.Item
          name="profitMargin"
          label="Profit Margins"
          rules={[
            { required: true, message: 'Please enter the profit margins' },
          ]}
        >
          <Input.TextArea placeholder="Enter profit margins" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoadingWordWare}
            type="primary"
            htmlType="submit"
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {projectLoading ? (
        <Spin />
      ) : (
        project && (
          <Card title="Project Overview">
            <Title level={4}>{project.name}</Title>
            <Text>Description: {project.description}</Text>
            <br />
            <Text>Overview: {project.overview}</Text>
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
              Date Created: {dayjs(project.dateCreated).format('MMMM D, YYYY')}
            </Text>
            <br />
            <Text>
              Date Updated: {dayjs(project.dateUpdated).format('MMMM D, YYYY')}
            </Text>
            <br />
          </Card>
        )
      )}
    </PageLayout>
  )
}
