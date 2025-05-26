<div align="center">
  <img src="https://res.cloudinary.com/dcu6gtw2y/image/upload/v1748301026/ai-risk-tool_mkopfj.png" alt="AI Risk Assessment Tool Screenshot" width="800"/>
</div>

A web-based tool for assessing security risks in generative AI deployments, based on the AWS Generative AI Security Scoping Matrix. This tool helps organizations identify and address security considerations across different AI implementation approaches.

## Features

- **5 AI Implementation Scopes**: From consumer apps to self-trained models
- **5 Security Disciplines**: Coverage of governance, legal, risk, controls, and resilience
- **Detailed Recommendations**: Specific guidance tailored to each scope-discipline combination
- **Implementation Checklists**: Step-by-step guidance for securing your AI deployment
- **Clean, Responsive UI**: Professional interface that works on desktop and mobile
- **No External Dependencies**: Self-contained solution with no third-party integrations required

## Technology Stack

- **Frontend**: React.js with custom CSS (Tailwind-inspired utilities)
- **Backend**: FastAPI (Python)
- **Deployment**: Render

## Project Structure

```
ai-risk-assessment-tool/
├── backend/
│   ├── app.py                      # FastAPI application
│   ├── requirements.txt            # Python dependencies
│   └── venv/                       # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RiskAssessmentTool.jsx  # Main React component
│   │   ├── App.js                  # App entry point
│   │   └── index.css               # Styling
│   ├── public/
│   └── package.json
└── README.md
```

## How It Works

### AI Implementation Scopes

1. **Consumer App** - Using public third-party generative AI services
2. **Enterprise App** - Using enterprise applications with generative AI features  
3. **Pre-trained Models** - Building applications with existing foundation models
4. **Fine-tuned Models** - Refining existing models with your business data
5. **Self-trained Models** - Building and training models from scratch

### Security Disciplines

1. **Governance & Compliance** - Policies and procedures for managing AI risk
2. **Legal & Privacy** - Regulatory requirements and privacy considerations
3. **Risk Management** - Threat identification and mitigation strategies
4. **Controls** - Security control implementation and monitoring
5. **Resilience** - System availability and business continuity planning

### Assessment Process

1. **Select AI Scope** - Choose your AI implementation approach
2. **Explore Security Disciplines** - Review relevant security areas
3. **Get Recommendations** - Receive tailored security guidance
4. **Implementation Checklist** - Follow step-by-step implementation guidance



## Framework Background

This tool is based on the **AWS Generative AI Security Scoping Matrix**, a framework developed by AWS security experts to help organizations assess and secure their AI implementations. The matrix provides:

- Structured approach to AI security assessment
- Risk-based categorization of AI implementations
- Specific security controls for each implementation type
- Industry best practices and compliance guidance

## Resources

- [AWS Security Blog: Securing Generative AI](https://aws.amazon.com/blogs/security/securing-generative-ai-an-introduction-to-the-generative-ai-security-scoping-matrix/)
- [MITRE ATLAS Framework](https://atlas.mitre.org/)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements
- [ ] PDF export of recommendations
- [ ] Integration with security tools and frameworks
- [ ] Advanced risk scoring and analytics
- [ ] Compliance mapping for specific regulations
