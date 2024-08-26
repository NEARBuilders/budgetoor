"use client";

import dayjs from "dayjs";
import { useUserContext } from "@/core/context";
import { Api } from "@/core/trpc";
import { PageLayout } from "@/designSystem/layouts/Page.layout";
import { Button, Form, Input, Typography, Card, Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import ProjectDetailsComponent from "./details";
import { useState } from "react";
const { Title, Paragraph, Text } = Typography;

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams<any>();
  const { user } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const [form] = Form.useForm();

  const { mutateAsync: createProject } = Api.project.create.useMutation();
  const { mutateAsync: updateProject } = Api.project.update.useMutation();
  const { mutateAsync: handleCurlRequest, isLoading: isLoadingWordWare } =
    Api.wordware.handleCurlRequest.useMutation();
  const [projectId, setProjectId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values: any) => {
    try {
      setLoading(true);
      const projectCreated = await createProject({
        data: {
          name: values.name,
          description: values.description,
          timeEstimate: values.timeEstimate,
          budgetBuffer: values.budgetBuffer,
          task_breakdown: values.task_breakdown,
          roles_seniority: values.roles_seniority,
          location: values.location,
          payroll: values.payroll,
          profitMargin: values.profitMargin,
          userId: user.id,
        },
      });
      enqueueSnackbar("Project created successfully", { variant: "success" });

      // Call the wordware router to handle the cURL request
      const response = await handleCurlRequest({
        body: values,
      });

      await updateProject({
        where: { id: projectCreated.id },
        data: { overview: response?.overview, csv: response.csv },
      });
      setProjectId(projectCreated.id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Failed to create project", { variant: "error" });
    }
  };

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
          rules={[{ required: true, message: "Please enter the project name" }]}
        >
          <Input.TextArea placeholder="Enter the name of your project (e.g., 'Marketing Campaign Revamp')" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Project Details"
          rules={[
            { required: true, message: "Please enter the project details" },
          ]}
        >
          <Input.TextArea placeholder="Describe the project objectives and scope (e.g., 'Redesign the company's website to improve user experience and conversion rates')" />
        </Form.Item>
        <Form.Item
          name="timeEstimate"
          label="Time Estimates"
          rules={[
            { required: true, message: "Please enter the time estimates" },
          ]}
        >
          <Input.TextArea placeholder="Estimate the total time needed for the project (e.g., '80 hours over 4 weeks')" />
        </Form.Item>
        <Form.Item
          name="budgetBuffer"
          label="Budget Buffers"
          rules={[
            { required: true, message: "Please enter the budget buffers" },
          ]}
        >
          <Input.TextArea placeholder="Specify any additional budget for unforeseen expenses (e.g., '10% of total project cost')" />
        </Form.Item>
        <Form.Item
          name="task_breakdown"
          label="Task Breakdown"
          rules={[
            { required: true, message: "Please enter the task breakdown" },
          ]}
        >
          <Input.TextArea placeholder="List the key tasks required to complete the project (e.g., 'Research, Design, Development, Testing')" />
        </Form.Item>
        <Form.Item
          name="roles_seniority"
          label="Roles Seniority"
          rules={[
            { required: true, message: "Please enter the roles seniority" },
          ]}
        >
          <Input.TextArea placeholder="Detail the roles and experience levels required (e.g., 'Senior Developer, Junior Designer')" />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter the location" }]}
        >
          <Input placeholder="Specify the location of the team members (e.g., 'Remote, US-based')" />
        </Form.Item>
        <Form.Item
          name="payroll"
          label="Payroll"
          rules={[{ required: true, message: "Please enter the payroll" }]}
        >
          <Input.TextArea placeholder="Provide the payroll details, including rates and benefits (e.g., 'Hourly rate: $50, Total: $4,000')" />
        </Form.Item>
        <Form.Item
          name="profitMargin"
          label="Profit Margins"
          rules={[
            { required: true, message: "Please enter the profit margins" },
          ]}
        >
          <Input.TextArea placeholder="Enter your desired profit margin (e.g., '15% of total project cost')" />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {projectId && <ProjectDetailsComponent projectId={projectId} />}
    </PageLayout>
  );
}
