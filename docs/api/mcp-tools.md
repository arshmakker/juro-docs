---
id: mcp-tools
title: MCP Tools
sidebar_label: MCP Tools
---

# MCP Tools

Learn how to use Juro's Model Context Protocol (MCP) tools for AI-powered compliance analysis.

## Overview

Juro provides a comprehensive set of MCP tools that allow AI assistants to interact with your codebase and perform compliance analysis. These tools enable natural language queries about your code's compliance status.

## Available Tools

### `scan_codebase`

Scans your entire codebase for compliance violations.

```json
{
  "name": "scan_codebase",
  "description": "Scan codebase for compliance violations",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Path to the codebase to scan"
      },
      "rules": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Compliance rules to check (e.g., 'gdpr', 'soc2', 'owasp')"
      },
      "format": {
        "type": "string",
        "enum": ["json", "sarif", "text"],
        "description": "Output format for scan results"
      }
    },
    "required": ["path"]
  }
}
```

**Example Usage:**
```bash
# Scan for GDPR compliance
juro scan --path ./my-project --rules gdpr --format json

# Scan for multiple compliance standards
juro scan --path ./my-project --rules gdpr,soc2,owasp --format sarif
```

### `analyze_file`

Analyzes a specific file for compliance issues.

```json
{
  "name": "analyze_file",
  "description": "Analyze a specific file for compliance violations",
  "parameters": {
    "type": "object",
    "properties": {
      "file_path": {
        "type": "string",
        "description": "Path to the file to analyze"
      },
      "rules": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Compliance rules to check"
      }
    },
    "required": ["file_path"]
  }
}
```

**Example Usage:**
```bash
# Analyze a specific file
juro analyze --file ./src/auth.js --rules gdpr,owasp
```

### `ask_question`

Ask natural language questions about your code's compliance.

```json
{
  "name": "ask_question",
  "description": "Ask questions about code compliance in natural language",
  "parameters": {
    "type": "object",
    "properties": {
      "question": {
        "type": "string",
        "description": "Natural language question about compliance"
      },
      "context": {
        "type": "string",
        "description": "Additional context or file paths to consider"
      }
    },
    "required": ["question"]
  }
}
```

**Example Usage:**
```bash
# Ask about GDPR compliance
juro ask "Does my authentication system comply with GDPR requirements?"

# Ask about specific code patterns
juro ask "Are there any SQL injection vulnerabilities in my database queries?"
```

## Integration Examples

### With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "juro": {
      "command": "npx",
      "args": ["@juro/mcp-server"],
      "env": {
        "JURO_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### With Cursor

Add to your Cursor settings:

```json
{
  "mcp": {
    "servers": {
      "juro": {
        "command": "npx",
        "args": ["@juro/mcp-server"],
        "env": {
          "JURO_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

## Error Handling

All MCP tools return structured error responses:

```json
{
  "error": {
    "code": "INVALID_PATH",
    "message": "The specified path does not exist",
    "details": {
      "path": "/nonexistent/path"
    }
  }
}
```

### Common Error Codes

- `INVALID_PATH` - The specified path does not exist
- `INVALID_RULES` - One or more specified rules are not supported
- `API_KEY_MISSING` - API key is not configured
- `RATE_LIMIT_EXCEEDED` - Too many requests in a short time
- `SCAN_FAILED` - The scan operation failed

## Best Practices

### 1. Use Specific Rules
Instead of scanning for all rules, specify only the ones you need:

```bash
# Good: Specific rules
juro scan --rules gdpr,owasp

# Avoid: All rules (slower)
juro scan --rules all
```

### 2. Batch Operations
For multiple files, use the codebase scan instead of individual file analysis:

```bash
# Good: Scan entire directory
juro scan --path ./src

# Avoid: Multiple individual scans
juro analyze --file ./src/auth.js
juro analyze --file ./src/user.js
juro analyze --file ./src/payment.js
```

### 3. Use Appropriate Output Formats
Choose the right format for your use case:

- `json` - For programmatic processing
- `sarif` - For security tools integration
- `text` - For human-readable output

## Troubleshooting

### Common Issues

1. **Tool Not Found**
   - Ensure Juro MCP server is properly installed
   - Check your AI assistant's MCP configuration

2. **Permission Denied**
   - Verify API key is correct
   - Check file system permissions

3. **Scan Timeout**
   - Reduce the scope of your scan
   - Use more specific rules

### Getting Help

- Check the [FAQ](/docs/support/faq) for common questions
- Review [Error Codes](/docs/api/error-codes) for detailed error information
- Contact support for additional assistance
