from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional

app = FastAPI(title="AI Risk Assessment API", description="API for the AI Risk Assessment Tool")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class AIScope(BaseModel):
    id: int
    name: str
    description: str
    example: str

class SecurityDiscipline(BaseModel):
    id: str
    name: str
    description: str
    considerations: Dict[str, str]

# AI Scopes data
AI_SCOPES = [
    {
        "id": 1,
        "name": "Consumer App",
        "description": "Your business consumes a public third-party generative AI service, either at no-cost or paid. You don't own or see the training data or the model.",
        "example": "An employee interacts with a generative AI chat application to generate ideas for an upcoming marketing campaign."
    },
    {
        "id": 2,
        "name": "Enterprise App",
        "description": "Your business uses a third-party enterprise application that has generative AI features embedded within, with a business relationship established.",
        "example": "You use a third-party enterprise scheduling application that has a generative AI capability to help draft meeting agendas."
    },
    {
        "id": 3,
        "name": "Pre-trained Models",
        "description": "Your business builds its own application using an existing third-party generative AI foundation model through an API.",
        "example": "You build a customer support chatbot that uses the Anthropic Claude foundation model through Amazon Bedrock APIs."
    },
    {
        "id": 4,
        "name": "Fine-tuned Models",
        "description": "Your business refines an existing foundation model by fine-tuning it with data specific to your business.",
        "example": "You build an application for marketing teams that creates materials specific to your products using a fine-tuned model."
    },
    {
        "id": 5,
        "name": "Self-trained Models",
        "description": "Your business builds and trains a generative AI model from scratch using data that you own or acquire.",
        "example": "You create a model trained exclusively on deep, industry-specific data to license to companies in that industry."
    }
]

# Security Disciplines data
SECURITY_DISCIPLINES = [
    {
        "id": "governance",
        "name": "Governance & Compliance",
        "description": "The policies, procedures, and reporting needed to empower the business while minimizing risk.",
        "considerations": {
            "1": "Review terms of service and licensing agreements. Create policies prohibiting use of PII or confidential data. Implement user training on appropriate AI usage.",
            "2": "Review enterprise agreements and data handling practices. Understand service provider's compliance posture. Monitor for changes in licensing terms.",
            "3": "Establish data governance for prompt inputs and outputs. Implement logging for model inputs/outputs. Define acceptable use policies for your application.",
            "4": "Classify the model according to the data used for fine-tuning. Implement strong data governance for training data. Document data lineage and model versioning.",
            "5": "Comprehensive model governance program required. Data lineage tracking for all training data. Model versioning and rigorous testing throughout the lifecycle."
        }
    },
    {
        "id": "legal",
        "name": "Legal & Privacy",
        "description": "The specific regulatory, legal, and privacy requirements for using or creating generative AI solutions.",
        "considerations": {
            "1": "Understand provider's terms of service. Consider potential exposure of sensitive data in prompts. Treat all input and output as public information.",
            "2": "Review enterprise agreements and data processing terms. Understand if your data is used to train models and how to opt out. Consider data residency requirements.",
            "3": "Review both service provider and model provider legal terms. Consider indemnification policies for copyright content. Implement feedback mechanisms that protect sensitive data.",
            "4": "Address GDPR 'right to erasure' challenges - deleting data requires model retraining. Consider copyright and IP implications of fine-tuning data.",
            "5": "Develop your own terms of service for model usage. Address IP ownership questions for training data and outputs. Prepare for regulatory classification of your AI system."
        }
    },
    {
        "id": "risk",
        "name": "Risk Management",
        "description": "Identification of potential threats to generative AI solutions and recommended mitigations.",
        "considerations": {
            "1": "Assess third-party provider risks. Train users on generative AI threats. Monitor for sensitive data disclosure through prompts or outputs.",
            "2": "Evaluate vendor security practices and SLAs. Protect API keys from unauthorized use. Assess risks around data reuse by providers.",
            "3": "Implement threat modeling for your application. Protect against prompt injection attacks. Monitor for model abuse. Apply security mitigations from frameworks like MITRE ATLAS.",
            "4": "Manage risks of data leakage from fine-tuned models. Consider model poisoning threats during fine-tuning. Careful selection of fine-tuning data.",
            "5": "Complete threat modeling required. Data poisoning risks during training. Model security during development lifecycle. Implement content filtering and monitoring."
        }
    },
    {
        "id": "controls",
        "name": "Controls",
        "description": "The implementation of security controls that are used to mitigate risk.",
        "considerations": {
            "1": "Implement network-based controls (web proxies, firewalls, DLP). Deploy host-based controls (endpoint detection). Provide security awareness training.",
            "2": "Configure identity integration with enterprise app. Review vendor security controls. Implement DLP to prevent upload of highly sensitive data.",
            "3": "Implement IAM policies to restrict access to model endpoints. Build application layer authorization. Apply input validation, output filtering, and guardrails.",
            "4": "Secure the fine-tuning pipeline. Control access to training data. Encrypt model artifacts. Implement input/output sanitization.",
            "5": "Comprehensive model security controls. Secure MLOps pipeline. Content filtering during training and inference. Vulnerability scanning and testing."
        }
    },
    {
        "id": "resilience",
        "name": "Resilience",
        "description": "How to architect generative AI solutions to maintain availability and meet business SLAs.",
        "considerations": {
            "1": "Assess provider's availability SLAs. Have backup plans for service outages. Consider usage quotas and billing impacts.",
            "2": "Understand vendor's availability and resilience posture. Establish contingency processes. Monitor API usage and costs.",
            "3": "Configure appropriate timeouts for complex prompts. Implement retry logic and circuit breaker patterns. Consider multi-region deployments for critical workloads.",
            "4": "High availability for inference endpoints. Backup access to training data. Rollback mechanisms for model updates.",
            "5": "Resilient training infrastructure. Model checkpointing during training. Disaster recovery for model artifacts and training data."
        }
    }
]

# API Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Risk Assessment API"}

@app.get("/scopes", response_model=List[AIScope])
def get_scopes():
    return AI_SCOPES

@app.get("/scopes/{scope_id}", response_model=AIScope)
def get_scope(scope_id: int):
    for scope in AI_SCOPES:
        if scope["id"] == scope_id:
            return scope
    raise HTTPException(status_code=404, detail="Scope not found")

@app.get("/disciplines", response_model=List[SecurityDiscipline])
def get_disciplines():
    return SECURITY_DISCIPLINES

@app.get("/disciplines/{discipline_id}", response_model=SecurityDiscipline)
def get_discipline(discipline_id: str):
    for discipline in SECURITY_DISCIPLINES:
        if discipline["id"] == discipline_id:
            return discipline
    raise HTTPException(status_code=404, detail="Discipline not found")

@app.get("/recommendations/{scope_id}/{discipline_id}")
def get_recommendation(scope_id: int, discipline_id: str):
    # Find the scope
    scope = None
    for s in AI_SCOPES:
        if s["id"] == scope_id:
            scope = s
            break
    
    if not scope:
        raise HTTPException(status_code=404, detail="Scope not found")
    
    # Find the discipline
    discipline = None
    for d in SECURITY_DISCIPLINES:
        if d["id"] == discipline_id:
            discipline = d
            break
    
    if not discipline:
        raise HTTPException(status_code=404, detail="Discipline not found")
    
    # Get the consideration for this scope
    consideration = discipline["considerations"].get(str(scope_id), "No specific recommendation available for this combination.")
    
    return {
        "scope": scope,
        "discipline": discipline,
        "recommendation": consideration
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)