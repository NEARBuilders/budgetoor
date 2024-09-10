"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

// @ts-ignore
function ProjectDetailsComponent({ project }) {
  const handleDownload = () => {
    if (!project || !project.csv) return;
    const blob = new Blob([project.csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${project.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!project) return null;

  return (
    <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Project Overview
          </h3>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Download CSV
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          {project.name}
        </h4>
        <div className="prose max-w-none text-gray-600">
          <Markdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => <p className="my-2" {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside my-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside my-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="my-1" {...props} />,
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table
                    className="min-w-full divide-y divide-gray-200"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  {...props}
                />
              ),
              // @ts-ignore
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {project.overview}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to process with Wordware");

      const projectData = await response.json();
      console.log("success: ", projectData);
      setProjectData(projectData);
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          New Project
        </h2>
        <p className="text-gray-600 mb-8">
          Please fill out the form below to provide necessary information for
          budget estimation. If you don&apos;t have an answer, feel free to
          write &quot;figure it out&quot;.
        </p>
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6 bg-white shadow-md rounded-lg p-8"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the name of your project"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Project Details
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe the project objectives and scope"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="timeEstimate"
              className="block text-sm font-medium text-gray-700"
            >
              Time Estimates
            </label>
            <input
              type="text"
              name="timeEstimate"
              id="timeEstimate"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Estimate the total time needed for the project"
            />
          </div>
          <div>
            <label
              htmlFor="profitMargin"
              className="block text-sm font-medium text-gray-700"
            >
              Profit Margins
            </label>
            <input
              type="text"
              name="profitMargin"
              id="profitMargin"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your desired profit margin"
            />
          </div>
          <div>
            <label
              htmlFor="budgetBuffer"
              className="block text-sm font-medium text-gray-700"
            >
              Budget Buffers
            </label>
            <input
              type="text"
              name="budgetBuffer"
              id="budgetBuffer"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Specify any additional budget for unforeseen expenses"
            />
          </div>
          <div>
            <label
              htmlFor="task_breakdown"
              className="block text-sm font-medium text-gray-700"
            >
              Task Breakdown
            </label>
            <textarea
              name="task_breakdown"
              id="task_breakdown"
              required
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="List the key tasks required to complete the project"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="roles_seniority"
              className="block text-sm font-medium text-gray-700"
            >
              Roles Seniority
            </label>
            <input
              type="text"
              name="roles_seniority"
              id="roles_seniority"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Detail the roles and experience levels required"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Specify the location of the team members"
            />
          </div>
          <div>
            <label
              htmlFor="payroll"
              className="block text-sm font-medium text-gray-700"
            >
              Payroll
            </label>
            <input
              type="text"
              name="payroll"
              id="payroll"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Provide the payroll details, including rates and benefits"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {projectData && <ProjectDetailsComponent project={projectData} />}
      </div>
    </div>
  );
}
