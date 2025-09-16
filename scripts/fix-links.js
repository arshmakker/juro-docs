const fs = require('fs');
const path = require('path');

// Define the broken links and their fixes
const linkFixes = {
  // Documentation overview pages
  '/docs/getting-started': '/docs/getting-started/installation',
  '/docs/features': '/docs/features/compliance-scanning',
  '/docs/tutorials': '/docs/getting-started/quick-setup',
  
  // Integration links
  '/integrations/github-actions': '/docs/integrations/github-actions',
  '/integrations/cli-tools': '/docs/integrations/cli-tools',
  '/integrations/ide-setup': '/docs/integrations/ide-setup',
  
  // Regulation links
  '/regulations/gdpr-compliance': '/docs/regulations/gdpr-compliance',
  '/regulations/soc2-compliance': '/docs/regulations/soc2-compliance',
  '/regulations/owasp-security': '/docs/regulations/owasp-security',
};

// Function to update links in a file
function updateLinksInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let updated = false;
  
  for (const [oldLink, newLink] of Object.entries(linkFixes)) {
    const regex = new RegExp(oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (content.includes(oldLink)) {
      content = content.replace(regex, newLink);
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated links in ${filePath}`);
  }
}

// Function to create missing documentation pages
function createMissingPages() {
  const pagesToCreate = [
    {
      path: 'docs/integrations/github-actions.md',
      content: `---
id: github-actions
title: GitHub Actions Integration
sidebar_label: GitHub Actions
---

# GitHub Actions Integration

Learn how to integrate Juro with GitHub Actions for automated compliance scanning in your CI/CD pipeline.

## Quick Start

\`\`\`yaml
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
          api-key: \${{ secrets.JURO_API_KEY }}
\`\`\`

## Configuration

### Required Secrets

- \`JURO_API_KEY\`: Your Juro API key

### Optional Parameters

- \`scan-path\`: Directory to scan (default: .)
- \`fail-on-violations\`: Fail the build on violations (default: true)
- \`output-format\`: Output format (json, sarif, text)

## Examples

### Basic Usage

\`\`\`yaml
- name: Basic Compliance Scan
  uses: juro/compliance-action@v1
  with:
    api-key: \${{ secrets.JURO_API_KEY }}
\`\`\`

### Advanced Configuration

\`\`\`yaml
- name: Advanced Compliance Scan
  uses: juro/compliance-action@v1
  with:
    api-key: \${{ secrets.JURO_API_KEY }}
    scan-path: ./src
    fail-on-violations: false
    output-format: sarif
\`\`\`

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
   - Adjust \`fail-on-violations\` if needed
`
    },
    {
      path: 'docs/integrations/cli-tools.md',
      content: `---
id: cli-tools
title: CLI Tools Integration
sidebar_label: CLI Tools
---

# CLI Tools Integration

Learn how to use Juro's command-line interface for local development and automation.

## Installation

\`\`\`bash
npm install -g @juro/cli
\`\`\`

## Basic Usage

### Scan a Project

\`\`\`bash
juro scan --project ./my-project
\`\`\`

### Get AI Insights

\`\`\`bash
juro ask "Check my code for GDPR compliance issues"
\`\`\`

## Configuration

### Project Configuration

Create a \`juro.config.js\` file in your project root:

\`\`\`javascript
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
\`\`\`

### Global Configuration

\`\`\`bash
juro config set api-key YOUR_API_KEY
juro config set default-rules gdpr,soc2
\`\`\`

## Examples

### Basic Scan

\`\`\`bash
juro scan
\`\`\`

### Scan with Specific Rules

\`\`\`bash
juro scan --rules gdpr,owasp
\`\`\`

### Generate Report

\`\`\`bash
juro scan --output report.json --format json
\`\`\`

## Troubleshooting

### Common Issues

1. **API Key Not Set**
   - Run \`juro config set api-key YOUR_API_KEY\`
   - Or set \`JURO_API_KEY\` environment variable

2. **Project Not Found**
   - Ensure you're in the correct directory
   - Check the project structure

3. **Scan Failures**
   - Check the error messages
   - Verify your API key is valid
`
    },
    {
      path: 'docs/integrations/ide-setup.md',
      content: `---
id: ide-setup
title: IDE Setup
sidebar_label: IDE Setup
---

# IDE Setup

Learn how to set up Juro in your favorite IDE for real-time compliance feedback.

## Supported IDEs

- Visual Studio Code
- IntelliJ IDEA
- Sublime Text
- Vim/Neovim

## Visual Studio Code

### Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Juro Compliance"
4. Click Install

### Configuration

1. Open Command Palette (Ctrl+Shift+P)
2. Type "Juro: Configure"
3. Enter your API key
4. Select your compliance rules

### Usage

- Real-time violation highlighting
- Quick fixes for common issues
- Inline documentation
- Command palette integration

## IntelliJ IDEA

### Installation

1. Open IntelliJ IDEA
2. Go to File > Settings > Plugins
3. Search for "Juro Compliance"
4. Click Install

### Configuration

1. Go to File > Settings > Tools > Juro
2. Enter your API key
3. Configure compliance rules
4. Set up project-specific settings

## Sublime Text

### Installation

1. Open Package Control (Ctrl+Shift+P)
2. Type "Package Control: Install Package"
3. Search for "Juro Compliance"
4. Click Install

### Configuration

1. Open Command Palette (Ctrl+Shift+P)
2. Type "Juro: Configure"
3. Enter your API key
4. Configure compliance rules

## Troubleshooting

### Common Issues

1. **Extension Not Loading**
   - Restart your IDE
   - Check the extension is properly installed
   - Verify API key is set

2. **No Violations Showing**
   - Check your compliance rules
   - Verify the file is being scanned
   - Check the extension logs

3. **Performance Issues**
   - Adjust scan frequency
   - Exclude large directories
   - Check system resources
`
    },
    {
      path: 'docs/regulations/gdpr-compliance.md',
      content: `---
id: gdpr-compliance
title: GDPR Compliance
sidebar_label: GDPR Compliance
---

# GDPR Compliance

Learn how to ensure your code meets GDPR (General Data Protection Regulation) requirements.

## Key Principles

### Lawfulness, Fairness, and Transparency

- Ensure data processing is lawful
- Be transparent about data collection
- Provide clear privacy notices

### Purpose Limitation

- Collect data only for specific purposes
- Don't use data for unrelated purposes
- Document data processing purposes

### Data Minimization

- Collect only necessary data
- Avoid excessive data collection
- Regular data audits

## Common Violations

### Data Collection

- Collecting unnecessary personal data
- Missing consent mechanisms
- Inadequate privacy notices

### Data Processing

- Processing data without legal basis
- Inadequate data security measures
- Missing data retention policies

### Data Subject Rights

- Inadequate data subject access
- Missing data portability features
- Inadequate data deletion mechanisms

## Best Practices

### Code Implementation

\`\`\`javascript
// Good: Explicit consent
const consent = await getExplicitConsent(userId, purpose);

// Bad: Implicit consent
const data = collectUserData(); // No consent check
\`\`\`

### Data Security

\`\`\`javascript
// Good: Encrypted data storage
const encryptedData = await encrypt(personalData);

// Bad: Plain text storage
localStorage.setItem('personalData', personalData);
\`\`\`

### Privacy by Design

\`\`\`javascript
// Good: Privacy-focused design
class UserData {
  constructor(data) {
    this.encryptedData = this.encrypt(data);
    this.retentionDate = this.calculateRetentionDate();
  }
}
\`\`\`

## Compliance Checklist

- [ ] Data processing is lawful
- [ ] Privacy notices are clear
- [ ] Consent mechanisms are in place
- [ ] Data security measures are adequate
- [ ] Data subject rights are supported
- [ ] Data retention policies are implemented
- [ ] Regular compliance audits are conducted

## Resources

- [GDPR Official Text](https://gdpr-info.eu/)
- [ICO GDPR Guidance](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/)
- [Juro GDPR Scanner](https://juro.dev/docs/features/compliance-scanning)
`
    },
    {
      path: 'docs/regulations/soc2-compliance.md',
      content: `---
id: soc2-compliance
title: SOC 2 Compliance
sidebar_label: SOC 2 Compliance
---

# SOC 2 Compliance

Learn how to ensure your code meets SOC 2 (Service Organization Control 2) requirements.

## Trust Service Criteria

### Security

- Access controls
- System monitoring
- Incident response
- Data encryption

### Availability

- System uptime
- Performance monitoring
- Disaster recovery
- Business continuity

### Processing Integrity

- Data accuracy
- Processing completeness
- System reliability
- Error handling

### Confidentiality

- Data protection
- Access restrictions
- Encryption
- Secure transmission

### Privacy

- Data collection
- Data use
- Data retention
- Data disposal

## Common Violations

### Security

- Weak authentication
- Inadequate access controls
- Missing encryption
- Poor incident response

### Availability

- Single points of failure
- Inadequate monitoring
- Missing disaster recovery
- Poor performance

### Processing Integrity

- Data validation issues
- Incomplete processing
- System errors
- Poor error handling

## Best Practices

### Security Implementation

\`\`\`javascript
// Good: Strong authentication
const auth = await authenticate(user, {
  multiFactor: true,
  sessionTimeout: 3600000
});

// Bad: Weak authentication
const auth = await authenticate(user); // No additional security
\`\`\`

### Access Controls

\`\`\`javascript
// Good: Role-based access
const hasAccess = await checkAccess(user, resource, 'read');

// Bad: No access control
const data = await getData(); // No access check
\`\`\`

### Data Encryption

\`\`\`javascript
// Good: Encrypted data
const encryptedData = await encrypt(data, {
  algorithm: 'aes-256-gcm',
  key: process.env.ENCRYPTION_KEY
});

// Bad: Unencrypted data
const data = await getData(); // No encryption
\`\`\`

## Compliance Checklist

- [ ] Security controls are implemented
- [ ] Access controls are adequate
- [ ] System monitoring is in place
- [ ] Incident response procedures exist
- [ ] Data encryption is implemented
- [ ] Disaster recovery plans exist
- [ ] Regular security audits are conducted

## Resources

- [SOC 2 Official Guidance](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html)
- [SOC 2 Compliance Guide](https://www.trustradius.com/soc-2-compliance)
- [Juro SOC 2 Scanner](https://juro.dev/docs/features/compliance-scanning)
`
    },
    {
      path: 'docs/regulations/owasp-security.md',
      content: `---
id: owasp-security
title: OWASP Security
sidebar_label: OWASP Security
---

# OWASP Security

Learn how to ensure your code meets OWASP (Open Web Application Security Project) security standards.

## OWASP Top 10

### A01: Broken Access Control

- Inadequate access controls
- Privilege escalation
- Insecure direct object references

### A02: Cryptographic Failures

- Weak encryption
- Insecure data transmission
- Inadequate key management

### A03: Injection

- SQL injection
- NoSQL injection
- Command injection

### A04: Insecure Design

- Security by design
- Threat modeling
- Secure architecture

### A05: Security Misconfiguration

- Default configurations
- Insecure headers
- Unnecessary features

### A06: Vulnerable Components

- Outdated dependencies
- Known vulnerabilities
- Insecure libraries

### A07: Authentication Failures

- Weak authentication
- Session management
- Multi-factor authentication

### A08: Software and Data Integrity

- Supply chain security
- Code integrity
- Data validation

### A09: Security Logging

- Insufficient logging
- Log tampering
- Monitoring gaps

### A10: Server-Side Request Forgery

- SSRF vulnerabilities
- Insecure requests
- Input validation

## Common Violations

### Access Control

\`\`\`javascript
// Bad: No access control
app.get('/admin', (req, res) => {
  res.send(adminData); // No authentication check
});

// Good: Proper access control
app.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.send(adminData);
});
\`\`\`

### Input Validation

\`\`\`javascript
// Bad: No input validation
app.post('/user', (req, res) => {
  const user = req.body; // No validation
  createUser(user);
});

// Good: Input validation
app.post('/user', validateUser, (req, res) => {
  const user = req.body; // Validated
  createUser(user);
});
\`\`\`

### Data Encryption

\`\`\`javascript
// Bad: No encryption
const data = await getData(); // No encryption
localStorage.setItem('data', data);

// Good: Encrypted data
const encryptedData = await encrypt(data);
localStorage.setItem('data', encryptedData);
\`\`\`

## Best Practices

### Security Headers

\`\`\`javascript
// Good: Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
\`\`\`

### Input Sanitization

\`\`\`javascript
// Good: Input sanitization
const sanitizeInput = (input) => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
};
\`\`\`

### Secure Authentication

\`\`\`javascript
// Good: Secure authentication
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
\`\`\`

## Compliance Checklist

- [ ] Access controls are implemented
- [ ] Input validation is in place
- [ ] Data encryption is used
- [ ] Security headers are set
- [ ] Dependencies are up to date
- [ ] Authentication is secure
- [ ] Logging is adequate
- [ ] Regular security audits are conducted

## Resources

- [OWASP Official Site](https://owasp.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Juro OWASP Scanner](https://juro.dev/docs/features/compliance-scanning)
`
    }
  ];

  pagesToCreate.forEach(page => {
    const fullPath = path.join(__dirname, '..', page.path);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, page.content);
      console.log(`Created ${page.path}`);
    }
  });
}

// Main execution
console.log('Fixing broken links...');

// Update configuration files
updateLinksInFile('docusaurus.config.js');
updateLinksInFile('sidebars.js');

// Create missing pages
createMissingPages();

console.log('Link fixes completed!');
