---
id: cli-tools
title: CLI Tools Integration
sidebar_label: CLI Tools
---

# CLI Tools Integration

Learn how to use Juro's command-line interface for local development and automation.

## Installation

```bash
npm install -g @juro/cli
```

## Basic Usage

### Scan a Project

```bash
juro scan --project ./my-project
```

### Get AI Insights

```bash
juro ask "Check my code for GDPR compliance issues"
```

## Configuration

### Project Configuration

Create a `juro.config.js` file in your project root:

```javascript
module.exports = {
  rules: {
    gdpr: true,
    soc2: true,
    owasp: true
  },
  ignore: [
    'node_modules/**',
    'dist/**'
  ]
};
```

### Global Configuration

```bash
juro config set api-key YOUR_API_KEY
juro config set default-rules gdpr,soc2
```

## Examples

### Basic Scan

```bash
juro scan
```

### Scan with Specific Rules

```bash
juro scan --rules gdpr,owasp
```

### Generate Report

```bash
juro scan --output report.json --format json
```

## Troubleshooting

### Common Issues

1. **API Key Not Set**
   - Run `juro config set api-key YOUR_API_KEY`
   - Or set `JURO_API_KEY` environment variable

2. **Project Not Found**
   - Ensure you're in the correct directory
   - Check the project structure

3. **Scan Failures**
   - Check the error messages
   - Verify your API key is valid
