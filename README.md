<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD029 -->

<div align="center">

<h1 style="font-size: 2.5rem; font-weight: bold;">Budgetoor</h1>

  <p>
    <strong>Agent to calculate number of work hours to estimate project budget.</strong>
  </p>

</div>

Estimating costs and runway for projects is hard. `Budgetoor` is an AI agent that calculates number of work hours based on requirements, staffing needed, location, and current salories in order to estimate project budget.

This agent is part of [AI-PGF](https://www.aipgf.com/); AI that advances public goods funding. See [original idea](https://potlock.notion.site/Budgetoor-3bf58bc7ebfe4790a1dff1ff1c3ef376).

<details>
  <summary>Table of Contents</summary>

- [Getting Started](#getting-started)
  - [Installing dependencies](#installing-dependencies)
  - [Running the app](#running-the-app)
  - [Building for production](#building-for-production)
  - [Running tests](#running-tests)
- [Contributing](#contributing)

</details>

## Getting Started

<div style="color: red;">

> ⚠️ **Important**<br/>Make sure the following tools are installed.

<p align="center">

<a target="_blank" href="https://www.docker.com/get-started/">![Docker Desktop Version](https://img.shields.io/badge/Docker%20Desktop-4.19.0-black?logo=docker)</a>
<a target="_blank" href="https://nodejs.org/en">![Node.js version](https://img.shields.io/badge/Node.js-20.11.0-black?logo=nodedotjs)</a>
<a target="_blank" href="https://pnpm.io/">![pnpm Version](https://img.shields.io/badge/pnpm-9.7.1-black?logo=pnpm)</a>
</div>

### Installing dependencies

```bash
pnpm init
```

### Running the app

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for production

```bash
pnpm run build
```

### Running tests

```bash
pnpm run test
```

See the full [testing guide](./playwright-tests/README.md).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you're interested in contributing to this project, please read the [contribution guide](./CONTRIBUTING).

<div align="right">
  <a href="https://nearbuilders.org" target="_blank">
    <img
      src="https://builders.mypinata.cloud/ipfs/QmWt1Nm47rypXFEamgeuadkvZendaUvAkcgJ3vtYf1rBFj"
      alt="Near Builders"
      height="40"
    />
  </a>
</div>
