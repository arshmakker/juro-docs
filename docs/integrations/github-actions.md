---
id: github-actions
title: GitHub Actions Integration
sidebar_label: GitHub Actions
---

# GitHub Actions Integration

Learn how to integrate Juro with GitHub Actions for automated compliance scanning in your CI/CD pipeline.

## Quick Start

```yaml
name: Compliance Scan
on: [push, pull_request]
jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Juro Compliance Scan
        uses: juro/compliance-action@v1
        with:
          api-key: ${{ secrets.JURO_API_KEY }}
```

## Configuration

### Required Secrets

- `JURO_API_KEY`: Your Juro API key

### Optional Parameters

- `scan-path`: Directory to scan (default: .)
- `fail-on-violations`: Fail the build on violations (default: true)
- `output-format`: Output format (json, sarif, text)

## Examples

### Basic Usage

```yaml
- name: Basic Compliance Scan
  uses: juro/compliance-action@v1
  with:
    api-key: ${{ secrets.JURO_API_KEY }}
```

### Advanced Configuration

```yaml
- name: Advanced Compliance Scan
  uses: juro/compliance-action@v1
  with:
    api-key: ${{ secrets.JURO_API_KEY }}
    scan-path: ./src
    fail-on-violations: false
    output-format: sarif
```

## Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure the secret is properly set in your repository settings
   - Check the secret name matches exactly

2. **Scan Path Not Found**
   - Verify the path exists in your repository
   - Use relative paths from the repository root

3. **Build Failures**
   - Check the scan results for violations
   - Adjust `fail-on-violations` if needed
