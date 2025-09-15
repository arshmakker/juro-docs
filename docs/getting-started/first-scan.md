---
id: first-scan
title: First Scan
sidebar_label: First Scan
description: 'Run your first compliance scan with Juro'
keywords: [first scan, compliance scan, getting started, tutorial]
---

# Your First Scan

Learn how to run your first compliance scan with Juro.

## Basic Scan

```bash
# Scan current directory
juro scan

# Scan specific directory
juro scan --path ./my-project

# Scan with specific regulations
juro scan --regulations GDPR,SOC2
```

## Understanding Results

After running a scan, you'll see:

- **Violations Found**: Number of compliance issues
- **Severity Levels**: HIGH, MEDIUM, LOW
- **File Locations**: Where violations were found
- **Suggestions**: How to fix the issues

## Next Steps

- [Configuration](/docs/getting-started/configuration) - Customize your scanning
- [Features](/docs/features/compliance-scanning) - Learn about all features
- [Tutorials](/docs/tutorials/basic-scanning) - Advanced scanning techniques
