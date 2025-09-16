---
id: basic-scanning
title: Basic Scanning Tutorial
sidebar_label: Basic Scanning
---

# Basic Scanning Tutorial

Learn how to perform basic compliance scanning with Juro. This tutorial covers the essential commands and workflows you'll use most often.

## Prerequisites

- Juro CLI installed (`npm install -g @juro/cli`)
- API key configured (`juro config set api-key YOUR_API_KEY`)
- A project to scan

## Quick Start

### 1. Basic Project Scan

The simplest way to scan your project:

```bash
juro scan --path ./my-project
```

This will:
- Scan all files in the specified directory
- Use default compliance rules (GDPR, SOC2, OWASP)
- Display results in the terminal
- Show a summary of violations found

### 2. Specify Compliance Rules

Scan for specific compliance standards:

```bash
# Scan for GDPR compliance only
juro scan --path ./my-project --rules gdpr

# Scan for multiple standards
juro scan --path ./my-project --rules gdpr,soc2,owasp

# Scan for all available rules
juro scan --path ./my-project --rules all
```

### 3. Choose Output Format

Select the format that works best for your workflow:

```bash
# JSON output (for programmatic processing)
juro scan --path ./my-project --format json

# SARIF output (for security tools integration)
juro scan --path ./my-project --format sarif

# Plain text output (for human reading)
juro scan --path ./my-project --format text
```

## Understanding Scan Results

### Sample Output

```bash
$ juro scan --path ./my-project --rules gdpr

🔍 Scanning /Users/john/my-project for GDPR compliance...

📊 Scan Results:
  Total files scanned: 45
  Violations found: 3
  Critical: 1
  High: 1
  Medium: 1
  Low: 0

🚨 Violations:

1. CRITICAL - Personal data stored without encryption
   File: src/auth.js:42
   Rule: gdpr-data-encryption
   Message: Personal data should be encrypted before storage
   Suggestion: Use encryption library to encrypt data before storage

2. HIGH - Missing consent mechanism
   File: src/analytics.js:15
   Rule: gdpr-consent
   Message: Data collection requires explicit user consent
   Suggestion: Implement consent mechanism before data collection

3. MEDIUM - Data retention not specified
   File: src/user.js:28
   Rule: gdpr-data-retention
   Message: Data retention period should be specified
   Suggestion: Add data retention policy to user data handling

✅ Scan completed in 2.3 seconds
```

### Understanding Violation Severity

- **CRITICAL**: Immediate action required, likely compliance violation
- **HIGH**: Important issue that should be addressed soon
- **MEDIUM**: Moderate issue that should be considered
- **LOW**: Minor issue or suggestion for improvement

## Advanced Scanning Options

### 1. Exclude Files and Directories

Skip files or directories you don't want to scan:

```bash
# Exclude specific directories
juro scan --path ./my-project --exclude "node_modules,dist,coverage"

# Exclude specific file patterns
juro scan --path ./my-project --exclude "*.test.js,*.spec.js"

# Use .gitignore patterns
juro scan --path ./my-project --use-gitignore
```

### 2. Scan Specific Files

Scan only specific files instead of entire directories:

```bash
# Scan specific files
juro scan --files "src/auth.js,src/user.js,src/payment.js"

# Scan files matching a pattern
juro scan --files "src/**/*.js" --rules gdpr
```

### 3. Save Results to File

Save scan results for later analysis:

```bash
# Save JSON results
juro scan --path ./my-project --format json --output results.json

# Save SARIF results
juro scan --path ./my-project --format sarif --output results.sarif

# Save text results
juro scan --path ./my-project --format text --output results.txt
```

### 4. Verbose Output

Get detailed information about the scanning process:

```bash
# Enable verbose output
juro scan --path ./my-project --verbose

# Enable debug output
juro scan --path ./my-project --debug
```

## Common Use Cases

### 1. Pre-commit Scanning

Scan your code before committing changes:

```bash
# Scan staged files
juro scan --files $(git diff --cached --name-only) --rules gdpr

# Scan modified files
juro scan --files $(git diff --name-only) --rules gdpr
```

### 2. CI/CD Integration

Integrate scanning into your continuous integration:

```bash
# Scan and fail on critical violations
juro scan --path ./src --rules gdpr,soc2,owasp --fail-on-critical

# Scan and fail on any violations
juro scan --path ./src --rules gdpr,soc2,owasp --fail-on-violations
```

### 3. Regular Compliance Audits

Perform regular compliance audits:

```bash
# Full compliance audit
juro scan --path ./my-project --rules all --format json --output audit-$(date +%Y%m%d).json

# Generate compliance report
juro scan --path ./my-project --rules gdpr,soc2,owasp --format sarif --output compliance-report.sarif
```

## Configuration Files

### 1. Project Configuration

Create a `juro.config.js` file in your project root:

```javascript
module.exports = {
  rules: {
    gdpr: {
      enabled: true,
      severity: 'high'
    },
    soc2: {
      enabled: true,
      severity: 'high'
    },
    owasp: {
      enabled: true,
      severity: 'critical'
    }
  },
  exclude: [
    'node_modules/**',
    'dist/**',
    'coverage/**',
    '*.test.js',
    '*.spec.js'
  ],
  output: {
    format: 'json',
    file: 'compliance-results.json'
  }
};
```

### 2. Global Configuration

Set global defaults in your user configuration:

```bash
# Set default rules
juro config set default-rules "gdpr,soc2,owasp"

# Set default output format
juro config set default-format "json"

# Set default severity threshold
juro config set severity-threshold "medium"
```

## Troubleshooting

### Common Issues

1. **No violations found but you expect some**
   - Check if the rules are enabled
   - Verify the file paths are correct
   - Try with `--verbose` to see what's being scanned

2. **Too many violations**
   - Use more specific rules
   - Exclude test files and dependencies
   - Adjust severity threshold

3. **Scan is slow**
   - Exclude large directories
   - Use more specific file patterns
   - Check network connectivity

### Debug Mode

Enable debug mode to see detailed information:

```bash
juro scan --path ./my-project --debug
```

This will show:
- Files being scanned
- Rules being applied
- Processing steps
- Performance metrics

## Best Practices

### 1. **Start Simple**
Begin with basic scans and gradually add complexity:

```bash
# Start with basic scan
juro scan --path ./my-project

# Add specific rules
juro scan --path ./my-project --rules gdpr

# Add output formatting
juro scan --path ./my-project --rules gdpr --format json --output results.json
```

### 2. **Use Configuration Files**
Create project-specific configuration files for consistency:

```bash
# Create configuration file
juro config init

# Use project configuration
juro scan --path ./my-project --config juro.config.js
```

### 3. **Integrate with Your Workflow**
Make scanning part of your development process:

```bash
# Add to package.json scripts
{
  "scripts": {
    "compliance": "juro scan --path ./src --rules gdpr,soc2,owasp",
    "compliance:json": "juro scan --path ./src --rules gdpr,soc2,owasp --format json --output compliance-results.json"
  }
}
```

### 4. **Regular Monitoring**
Set up regular compliance monitoring:

```bash
# Daily compliance check
juro scan --path ./my-project --rules gdpr,soc2,owasp --format json --output daily-compliance-$(date +%Y%m%d).json

# Weekly full audit
juro scan --path ./my-project --rules all --format sarif --output weekly-audit-$(date +%Y%m%d).sarif
```

## Next Steps

Now that you understand basic scanning, you can:

1. **Learn about AI queries** - [AI Queries Tutorial](/docs/tutorials/ai-queries)
2. **Create custom rules** - [Custom Rules Tutorial](/docs/tutorials/custom-rules)
3. **Set up GitHub Actions** - [GitHub Setup Tutorial](/docs/tutorials/github-setup)
4. **Explore advanced features** - [API Examples](/docs/api/examples)

## Getting Help

If you need assistance:

- Check the [FAQ](/docs/support/faq) for common questions
- Review [Error Codes](/docs/api/error-codes) for troubleshooting
- Contact [Support](/docs/support/contact) for additional help

---

*Ready to start scanning? [Install Juro CLI](https://juro.dev/docs/getting-started/installation) and try your first scan!*
