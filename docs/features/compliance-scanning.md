---
id: compliance-scanning
title: Compliance Scanning
sidebar_label: Compliance Scanning
description: 'Comprehensive compliance scanning across multiple regulations and standards'
keywords: [compliance scanning, regulations, GDPR, SOC2, OWASP, automated scanning]
---

# Compliance Scanning

Juro v2.0.0 provides comprehensive compliance scanning across multiple regulations and standards with enterprise-grade performance optimization and real-time IDE integration.

## Current Implementation Status

### ✅ **Fully Implemented (8 Rules)**
- **GDPR**: 4 comprehensive rules (Personal Data Detection, Consent Management, Data Retention, Export Rights)
- **DORA**: 4 comprehensive rules (Security Controls, Incident Response, Risk Assessment, Monitoring & Logging)

### 📋 **Database Ready (24 Rules)**
- **SOC 2**: Security, availability, processing integrity, confidentiality, and privacy controls
- **ISO 27001**: Information Security Management System standards
- **OWASP Top 10**: Web application security risks and vulnerabilities
- **WCAG**: Web Content Accessibility Guidelines
- **CSP**: Content Security Policy

## Advanced Scanning Features

### **Real-Time Scanning (VS Code Extension)**
- **Instant Feedback**: Get compliance violations as you type
- **Inline Highlighting**: Visual indicators for violation severity
- **Hover Tooltips**: Rich information with fix suggestions
- **Compliance Scoring**: Real-time compliance score updates
- **Zero Configuration**: Works out of the box

### **Performance Optimization**
- **Intelligent Caching**: 90%+ cache hit rate for repeated scans
- **Parallel Processing**: Multi-threaded file scanning with configurable worker pools
- **Memory Management**: Efficient handling of large files with chunked processing
- **Incremental Scanning**: Only scan changed files for faster subsequent runs

### **Enterprise-Grade Features**
- **Auto-Detection Engine**: Automatically detects project types and relevant regulations
- **Smart Configuration**: Auto-generates compliance configurations
- **Context-Aware Analysis**: Advanced pattern matching for actual data vs. configuration
- **False Positive Reduction**: Intelligent filtering to avoid false alarms

## Performance Benchmarks

### **Scanning Speed**
- **Small Projects** (< 100 files): < 1 second
- **Medium Projects** (100-1000 files): < 10 seconds  
- **Large Projects** (1000+ files): < 60 seconds
- **Cache Hit Rate**: 90%+ for repeated scans

### **Resource Optimization**
- **Worker Pool**: Configurable 1-8 workers for optimal performance
- **Memory Management**: 10MB chunk size for large file processing
- **Parallel Processing**: Up to 4x faster than sequential scanning
- **File Size Support**: Up to 50MB files with memory-optimized streaming

## Scanning Examples

### **GDPR Compliance Scanning**
```bash
# Scan for GDPR violations
juro scan --path ./src --rules gdpr --format json

# Real-time VS Code scanning
# Violations appear instantly as you type
```

### **DORA Financial Compliance**
```bash
# Scan for DORA compliance
juro scan --path ./src --rules dora --severity-threshold HIGH

# Check security controls and incident response
```

### **Multi-Regulation Scanning**
```bash
# Scan for multiple regulations
juro scan --path ./src --rules gdpr,dora,soc2 --format sarif
```

## Integration Options

### **VS Code Extension**
- Real-time compliance scanning
- Inline violation highlighting
- Compliance score visualization
- Zero configuration required

### **GitHub Actions**
- Automated CI/CD compliance checks
- PR comment integration
- Team notifications
- Custom workflow generation

### **CLI Tools**
- Command-line scanning
- Custom rule support
- Batch processing
- Report generation

## Getting Started

- [First Scan](/docs/getting-started/first-scan) - Run your first scan
- [VS Code Extension](/docs/integrations/ide-setup) - Real-time IDE integration
- [GitHub Actions](/docs/integrations/github-actions) - CI/CD automation
- [Configuration](/docs/getting-started/configuration) - Configure scanning
- [Tutorials](/docs/tutorials/basic-scanning) - Learn scanning techniques
